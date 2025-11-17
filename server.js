import express from 'express';
import cors from 'cors'
import { fileURLToPath } from 'url';
import { dirname, join, basename } from 'path';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';
import util from 'util'
import AdmZip from "adm-zip";
import multer from "multer";
import ini from "ini";
import { exec } from "child_process";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors())
app.use(express.json());

const SCRIPT_VER = 1.3; // Latest version of the iframe. Used to track whether any changes were made to the templates/iframe/ files, which would require widgets to have those files copied into their dir in order to work again.
const upload = multer({ dest: "uploads/" });
const copyFilePromise = util.promisify(fs.copyFile);

// Helper functions

function generateDataFromFields(fields) {
    let fieldData = {};
    for (const [key, value] of Object.entries(fields)) {
        if (Object.keys(fields[key]).includes("value") === false && fields[key]["type"] === "number") {
            fieldData[key] = 0;
        } else if (Object.keys(fields[key]).includes("value") === false && fields[key]["type"] === "checkbox") {
            fieldData[key] = false;
        } else if (Object.keys(fields[key]).includes("value") === false) {
            fieldData[key] = "";
        } else {
            fieldData[key] = value["value"];
        }
    }
    return fieldData;
}

async function fetchDataFile(file) {
    const dataFile = join(__dirname, "data", file);
    const dataObject = await fs.readFile(dataFile, 'utf-8');
    return file.includes('.json') ? JSON.parse(dataObject) : dataObject;
}

async function fetchOverlayData(overlayID) {
    const instancePath = join(__dirname, "overlays", overlayID, "overlay-data.json");
    const data = await fs.readFile(instancePath, 'utf-8');
    const currOverlayData = JSON.parse(data);

    return currOverlayData;
}

function copyFiles(srcDir, destDir, files) {
    return Promise.all(files.map(f => {
        return copyFilePromise(join(srcDir, f), join(destDir, f));
    }));
}

// API

// Create overlay

app.post("/api/create-overlay/", async (req, res) => {
    const { name } = req.body;
    const instanceId = uuidv4();
    const id = name.toLowerCase().replaceAll(' - ', '-').replaceAll(' ', '-') + '-' + instanceId;
    const defaults = {
        name: name,
        id: id,
        widgets: []
    };

    const destinationPath = join(__dirname, "overlays", id);
    const overlayDataPath = join(__dirname, "overlays", id, 'overlay-data.json');

    try {
        console.log(`Creating overlay: ${name}, in ${destinationPath}`);
        fs.mkdirSync(destinationPath, { recursive: true });
        await fs.promises.writeFile(overlayDataPath, JSON.stringify(defaults, null, "\t"), "utf-8",);
        res.status(200).json(defaults);
    } catch (error) {
        console.error("Error creating overlay:", error);
        res.status(500).json({ error: "Failed to create overlay" });
    }
});

// Get overlays

app.get("/api/get-overlays", async (req, res) => {
    try {
        const dirents = await fs.readdir("./overlays/", { withFileTypes: true });

        const overlays = dirents
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);


        const overlaysArray = await Promise.all(
            overlays.map(async (overlay) => {
                return await fetchOverlayData(overlay);
            })
        );

        res.json(overlaysArray);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Failed to load overlays: ${err}` });
    }
});

// Get templates

app.get('/api/get-templates', async (req, res) => {
    const dirents = await fs.readdir('./templates/user/', { withFileTypes: true });
    const templates = dirents
        .filter((dirent) => dirent.isDirectory() && dirent.name !== '.git')
        .map((dirent) => dirent.name);
    res.json([templates])
})

// Get widgets
// This should check for widget files and delete entries from the JSON if not found.
// In the future overlay-data will also store deletion data in the form of a UNIX timestamp. This should check the current time and delete any references earlier than Date.now()

app.get('/api/get-overlay-data/:overlayID', async (req, res) => {
    const { overlayID } = req.params;
    let currWidgetsArray = await fetchOverlayData(overlayID);

    res.json(currWidgetsArray)
})

// Create Widget

app.post("/api/create-widget/", async (req, res) => {
    const { name, template, overlayID } = req.body;
    const normalizedName = name.toLowerCase().replaceAll(' - ', '-').replaceAll(' ', '-') + '-' + uuidv4();
    const widgetData = {
        name: name,
        id: normalizedName,
        src: `/overlays/${overlayID}/${normalizedName}/iframe.html`,
        template: template,
        scriptVersion: SCRIPT_VER,
        width: 500,
        height: 500,
        posX: 0,
        posY: 0,
        blur: true,
        pointerEvents: false,
        frameVisible: true,
        zIndex: 5
    };

    const iframeTemplate = join(__dirname, "templates", "iframe");
    const widgetTemplate = join(__dirname, "templates", "user", template);
    const destinationPath = join(__dirname, "overlays", overlayID, normalizedName);
    const widgetFilesPath = join(__dirname, "overlays", overlayID, normalizedName, "src");
    const instancePath = join(__dirname, "overlays", overlayID, "overlay-data.json");

    try {
        console.log(`Copying ${template} files to ${destinationPath}`);
        await fs.promises.cp(iframeTemplate, destinationPath, { recursive: true });
        await fs.promises.cp(widgetTemplate, widgetFilesPath, { recursive: true });

        let currWidgetsArray = await fetchOverlayData(overlayID);
        currWidgetsArray.widgets.push(widgetData);
        await fs.promises.writeFile(instancePath, JSON.stringify(currWidgetsArray, null, "\t"), "utf-8",);

        res.json(widgetData);
    } catch (error) {
        console.error("Error creating widget:", error);
        res.status(500).json({ error: "Failed to create widget" });
    }
});

// Duplicate Widget

app.post("/api/duplicate-widget/", async (req, res) => {
    const { overlayID, widgetID, name, template } = req.body;
    
    const normalizedName = name.toLowerCase().replaceAll(' - ', '-').replaceAll(' ', '-') + '-' + uuidv4();
    const widgetData = {
        name: name,
        id: normalizedName,
        src: `/overlays/${overlayID}/${normalizedName}/iframe.html`,
        template: template,
        scriptVersion: SCRIPT_VER,
        width: 500,
        height: 500,
        posX: 0,
        posY: 0,
        zIndex: 5
    };

    const iframeTemplate = join(__dirname, "templates", "iframe");
    const destinationPath = join(__dirname, "overlays", overlayID, normalizedName);
    const widgetFilesPath = join(__dirname, "overlays", overlayID, widgetID, "src");
    const newWidgetFilesPath = join(__dirname, "overlays", overlayID, normalizedName, "src");
    const instancePath = join(__dirname, "overlays", overlayID, "overlay-data.json");

    try {
        console.log(`Duplicating ${name} files in ${destinationPath}`);
        await fs.promises.cp(iframeTemplate, destinationPath, { recursive: true });
        await fs.promises.cp(widgetFilesPath, newWidgetFilesPath, { recursive: true });

        let currWidgetsArray = await fetchOverlayData(overlayID);
        currWidgetsArray.widgets.push(widgetData);
        await fs.promises.writeFile(instancePath, JSON.stringify(currWidgetsArray, null, "\t"), "utf-8",);

        res.json(widgetData);
    } catch (error) {
        console.error("Error duplicating widget:", error);
        res.status(500).json({ error: "Failed to create widget" });
    }
});

// Soft delete overlay / widget

app.put('/api/soft-delete/', async (req, res) => {
    const { overlayName, overlayID, widgetName, widgetID } = req.body;

    const deletionDataPath = join(__dirname, "data", "deletion-data.json");
    const overlayDataPath = join(__dirname, "overlays", overlayID, "overlay-data.json");

    try {
        let deletionData = JSON.parse(fs.readFileSync(deletionDataPath));
        if (!deletionData) deletionData = {};
        if (!deletionData[overlayID]) deletionData[overlayID] = {
            name: overlayName,
            id: overlayID,
            widgets: []
        };
        let overlayData = await fetchOverlayData(overlayID);
        const deletionDate = Date.now() + 2592000000;
        if (widgetName && widgetID) {
            deletionData[overlayID]['widgets'].push({ name: widgetName, id: widgetID, deleteAfter: deletionDate });
            overlayData.widgets = overlayData.widgets.map(widget => widget.id === widgetID ? { ...widget, deleteAfter: deletionDate } : widget)
        } else if (!widgetName && !widgetID) {
            deletionData[overlayID].name = overlayName;
            deletionData[overlayID].deleteAfter = deletionDate;
            overlayData.deleteAfter = deletionDate;
        }

        fs.writeFileSync(overlayDataPath, JSON.stringify(overlayData, null, "\t"), 'utf-8');
        fs.writeFileSync(deletionDataPath, JSON.stringify(deletionData, null, "\t"), 'utf-8');

        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500)
    }
})

// Delete overlay / widget

app.delete('/api/delete/', async (req, res) => {
    const { overlayID, widgetID } = req.body;

    const deletionDataPath = join(__dirname, "data", "deletion-data.json");
    const overlayDataPath = join(__dirname, "overlays", overlayID, "overlay-data.json");
    let currWidgetsArray = await fetchOverlayData(overlayID);
    let target;
    try {
        if (widgetID) {
            target = join(__dirname, 'overlays', overlayID, widgetID);
            const updatedWidgetsArray = { ...currWidgetsArray, widgets: currWidgetsArray.widgets.filter(widget => widget.id != widgetID) }
            fs.writeFileSync(overlayDataPath, JSON.stringify(updatedWidgetsArray, null, "\t"), 'utf-8');
        } else {
            target = join(__dirname, 'overlays', overlayID);
        }
        fs.rmSync(target, { recursive: true, force: true });

        let deletionData = JSON.parse(fs.readFileSync(deletionDataPath));
        if (Object.keys(deletionData[overlayID].widgets).length <= 1) {
            delete deletionData[overlayID];
        } else {
            const updatedDeletionDataWidgets = deletionData[overlayID].widgets.filter(widget => widget.id != widgetID)
            deletionData[overlayID].widgets = updatedDeletionDataWidgets;
        }
        fs.writeFileSync(deletionDataPath, JSON.stringify(deletionData, null, "\t"), 'utf-8');

        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})

// Restore overlay / widget

app.put('/api/restore/', async (req, res) => {
    const { overlayID, widgetID } = req.body;

    const deletionDataPath = join(__dirname, "data", "deletion-data.json");
    const overlayDataPath = join(__dirname, "overlays", overlayID, "overlay-data.json");
    let overlayData = await fetchOverlayData(overlayID);
    try {
        if (widgetID) {
            overlayData.widgets = overlayData.widgets.map((widget) => {
                if (widgetID === widget.id) {
                    const { deleteAfter, ...rest } = widget;
                    return rest;
                }
                return widget;
            });
        } else {
            delete overlayData.deleteAfter;
        }
        fs.writeFileSync(overlayDataPath, JSON.stringify(overlayData, null, "\t"), 'utf-8');

        let deletionData = JSON.parse(fs.readFileSync(deletionDataPath));
        if (Object.keys(deletionData[overlayID].widgets).length <= 1) {
            delete deletionData[overlayID];
        } else {
            delete deletionData[overlayID][widgetID];
        }
        fs.writeFileSync(deletionDataPath, JSON.stringify(deletionData, null, "\t"), 'utf-8');

        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
})

// Load iframe

app.get('/overlays/:overlayID/:template-:id/iframe.html', async (req, res) => {
    const { overlayID, template, id } = req.params;
    const filePath = join(__dirname, 'overlays', overlayID, `${template}-${id}`, 'iframe.html');

    try {
        await fs.access(filePath, fs.constants.F_OK);
        res.sendFile(filePath);
    } catch (error) {
        res.status(404).send('File not found');
    }
});

// Update widget settings

app.put('/api/update-widget-settings', async (req, res) => {
    const { overlayID, widgetID, updates } = req.body;

    const instancePath = join(__dirname, "overlays", overlayID, "overlay-data.json");
    let currWidgetsArray = await fetchOverlayData(overlayID);

    try {
        const updatedWidgetsArray = currWidgetsArray.widgets.map((widget) =>
            widget.id === widgetID ? { ...widget, ...updates } : widget
        );
        currWidgetsArray.widgets = updatedWidgetsArray;
        currWidgetsArray.lastUpdate = Date.now();
        fs.writeFileSync(instancePath, JSON.stringify(currWidgetsArray, null, "\t"), 'utf-8');
        res.send();
    } catch (error) {
        console.error(error);
    }
})

// Fetch files from /data/

app.get('/api/data/:file', async (req, res) => {
    const dataObject = await fetchDataFile(`${req.params.file}.json`); // this returns [object Object] I think?
    res.json(dataObject)
})

// Fetch fields.json

app.get('/api/fields/:overlay/:widget', async (req, res) => {
    const dataFile = join(__dirname, "overlays", req.params.overlay, req.params.widget, 'src', 'fields.json');
    const fieldData = await fs.readFile(dataFile, 'utf-8');

    res.send(fieldData)
})

// Fetch data.json

app.post('/api/field-data/:overlay/:widget', async (req, res) => {
    const overlayName = req.params.overlay;
    const widgetName = req.params.widget;

    const widgetSrc = join(__dirname, "overlays", overlayName, widgetName, 'src');

    const dataFilePath = join(widgetSrc, 'data.json');
    const fieldsFilePath = join(widgetSrc, 'fields.json');

    try {
        const fieldsFile = fs.readFileSync(fieldsFilePath, 'utf-8');
        const fields = generateDataFromFields(JSON.parse(fieldsFile));
        const dataFile = fs.readFileSync(dataFilePath, 'utf-8');
        const data = JSON.parse(dataFile);


        let content, regenerate = false;
        Object.keys(fields).forEach(key => {
            if (data[key] === undefined) regenerate = true;
        })

        const defaultDataContent = JSON.stringify(fields, null, 2);
        if (regenerate) {
            content = defaultDataContent;
            await fs.writeFile(dataFilePath, defaultDataContent, 'utf-8');
            console.log(`Fields data for ${dataFilePath} regenerated successfully`);
        } else {
            content = data;
        }

        res.type('application/json').send(content);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`Fields file not found. Creating with default content.`);
            try {
                const defaultContent = JSON.stringify({}, null, 2);

                await fs.writeFile(fieldsFilePath, defaultContent, 'utf-8');
                await fs.writeFile(dataFilePath, defaultContent, 'utf-8');

                res.type('application/json').send(defaultContent);
                console.log(`File created successfully: ${dataFilePath}`);

            } catch (createError) {
                console.error(`Error creating file or directory for ${dataFilePath}:`, createError);
                res.status(500).json({ error: 'Failed to create default data file.' });
            }
        } else {
            console.error(`Error reading ${fieldsFilePath}:`, error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
})

// Update the value of a specific field in data.json

app.put('/api/update-field-data/:overlay/:widget/:field', async (req, res) => {
    const { overlay, widget, field } = req.params;
    const { newValue } = req.body;

    const dataFilePath = join(__dirname, "overlays", overlay, widget, 'src', 'data.json');
    try {
        const fieldData = await fs.readFile(dataFilePath, 'utf-8');
        let fieldDataJson = JSON.parse(fieldData);

        fieldDataJson[field] = newValue;
        const newFieldData = JSON.stringify(fieldDataJson, null, 2);

        await fs.writeFile(dataFilePath, newFieldData, 'utf-8');
        res.send();
    } catch (error) {
        console.error(`Error updating ${dataFilePath}:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.put('/api/update-iframe-files/', async (req, res) => {
    const { overlayID, widgetID } = req.body;
    const iframeTemplate = join(__dirname, "templates", "iframe");
    const widgetPath = join(__dirname, "overlays", overlayID, widgetID);

    copyFiles(iframeTemplate, widgetPath, ['iframe.html', 'main.css', 'script.js']).then(async () => {
        res.status(200).json({ scriptVersion: SCRIPT_VER });
    }).catch(err => {
        console.error(`Error updating ${widget} iframe:`, err);
        res.status(500).json({ error: 'Internal server error' });
    });
})

app.put('/api/SE_API/set', async (req, res) => {
    const { key, value } = req.body
    let data = await fetchDataFile('SE_API.json');
    if (Array.isArray(value)) {
        data[key] = [...value];
    } else {
        data[key] = value;
    }

    const dataFilePath = join(__dirname, "data", 'SE_API.json');
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, "\t"), 'utf-8');
    res.status(200).json({ message: `${key} updated successfully` });
})

app.get('/api/SE_API/get/:key', async (req, res) => {
    const key = req.params.key;
    const data = await fetchDataFile('SE_API.json');
    if (data[key]) {
        res.json(data[key]);
    } else {
        res.json(null);
    }
})

app.get('/api/widget-io-export/:overlayID/:widgetID/:widgetName', async (req, res) => {
    const { overlayID, widgetID, widgetName } = req.params;
    const filePath = join(__dirname, 'overlays', overlayID, `${widgetID}`, 'src');
    const to_zip = fs.readdirSync(filePath);

    const zip = new AdmZip();
    zip.addLocalFile(join(filePath, 'html.html'), "", "html.txt");
    zip.addLocalFile(join(filePath, 'css.css'), "", "css.txt");
    zip.addLocalFile(join(filePath, 'js.js'), "", "js.txt");
    zip.addLocalFile(join(filePath, 'fields.json'), "", "fields.txt");
    zip.addLocalFile(join(filePath, 'data.json'), "", "data.txt");
    zip.addLocalFile(join(__dirname, 'data', "widget.ini"));

    const zipPath = join(__dirname, `${widgetName}.zip`);
    zip.writeZip(zipPath);

    res.download(zipPath, `${widgetName}.zip`, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Download failed");
        }
        fs.unlinkSync(zipPath);
    });
});

app.post("/api/widget-io-import/:overlayID", upload.single("file"), async (req, res) => {
    const overlayID = req.params.overlayID;
    if (!req.file) {
        return res.status(400).json({ error: "No file received" });
    }
    const baseName = req.file.originalname.split('.')[0];
    const name = baseName.charAt(0).toUpperCase() + baseName.slice(1);
    const normalizedName = name.toLowerCase().replaceAll(" - ", "-").replaceAll(" ", "-") + "-" + uuidv4();

    const basePath = join(__dirname, "overlays", overlayID, normalizedName);
    const srcPath = join(basePath, "src");
    const instancePath = join(__dirname, "overlays", overlayID, "overlay-data.json");

    try {
        await fs.ensureDir(srcPath);

        // Extract + parse ini
        const zip = new AdmZip(req.file.path);
        const entries = zip.getEntries();

        const widgetIniEntry = entries.find((e) => e.entryName.endsWith("widget.ini"));
        if (!widgetIniEntry) throw new Error("widget.ini missing in ZIP");
        const config = ini.parse(widgetIniEntry.getData().toString("utf8"));

        const mapping = {
            HTML: "html.html",
            CSS: "css.css",
            JS: "js.js",
            FIELDS: "fields.json",
            DATA: "data.json",
        };

        // Copy files
        for (const [section, outFile] of Object.entries(mapping)) {
            if (!config[section]?.path) continue;
            const entryPath = config[section].path.replace(/['"]/g, "");
            const zipEntry = entries.find(
                (e) => basename(e.entryName) === basename(entryPath)
            );
            if (!zipEntry) continue;

            let contents = zipEntry.getData().toString("utf8");

            if (section === "FIELDS" || section === "DATA") {
                try {
                    contents = JSON.stringify(JSON.parse(contents), null, 2);
                } catch {
                    contents = JSON.stringify({ raw: contents }, null, 2);
                }
            }

            await fs.writeFile(join(srcPath, outFile), contents, "utf8");
        }

        // Copy iframe template
        const iframeTemplate = join(__dirname, "templates", "iframe");
        await fs.copy(iframeTemplate, basePath, { overwrite: true });

        // Create default widget data
        const widgetData = {
            name,
            id: normalizedName,
            src: `/overlays/${overlayID}/${normalizedName}/iframe.html`,
            template: "imported-zip",
            scriptVersion: SCRIPT_VER,
            width: 500,
            height: 500,
            posX: 0,
            posY: 0,
        };

        // Update overlay-data.json
        let currWidgetsArray = await fetchOverlayData(overlayID);
        currWidgetsArray.widgets.push(widgetData);
        await fs.writeFile(instancePath, JSON.stringify(currWidgetsArray, null, 2), "utf8");

        res.json(widgetData);
    } catch (err) {
        console.error("Error importing widget:", err);
        res.status(500).json({ error: String(err) });
    } finally {
        if (req.file?.path) await fs.remove(req.file.path);
    }
});

app.post("/api/rename/", async (req, res) => {
    const { overlayID, widgetID, name } = req.body;
    const newID = name.toLowerCase().replaceAll(' - ', '-').replaceAll(' ', '-') + '-' + uuidv4();
    const dir = join(__dirname, "overlays", overlayID);
    const newDir = join(__dirname, "overlays", newID);
    const instancePath = join(__dirname, "overlays", overlayID, "overlay-data.json");
    let overlayData = await fetchOverlayData(overlayID);

    try {
        // Rename widget/overlay
        if (widgetID != undefined) {
            const updatedData = overlayData.widgets.map(widget => widget.id === widgetID ? { ...widget, name, id: newID, src: widget.src.replace(widgetID, newID) } : widget);
            overlayData.widgets = updatedData;
            fs.writeFileSync(instancePath, JSON.stringify(overlayData, null, "\t"), 'utf-8');
            // Rename folder
            const oldWidgetPath = join(__dirname, "overlays", overlayID, widgetID)
            const newWidgetPath = join(__dirname, "overlays", overlayID, newID)
            await fs.rename(oldWidgetPath, newWidgetPath);
        } else {
            const updatedWidgetData = overlayData.widgets.map(widget => ({ ...widget, src: widget.src.replace(overlayID, newID) }));
            overlayData.widgets = updatedWidgetData;
            const updatedData = { ...overlayData, name, id: newID };
            overlayData = updatedData;
            fs.writeFileSync(instancePath, JSON.stringify(overlayData, null, "\t"), 'utf-8');
            // Rename folder
            await fs.rename(dir, newDir);
        }

        // Rename overlay if it exists in deletion-data.json
        // This covers cases when an overlay is renamed while it has a widget pending deletion
        const deletionDataPath = join(__dirname, "data", "deletion-data.json");
        let deletionData = JSON.parse(fs.readFileSync(deletionDataPath));
        if (Object.keys(deletionData).includes(overlayID)) {
            deletionData[newID] = { ...deletionData[overlayID], name, id: newID }
            delete deletionData[overlayID];
            fs.writeFileSync(deletionDataPath, JSON.stringify(deletionData, null, "\t"), 'utf-8');
        }

        res.json({ id: newID });
    } catch (error) {
        res.json({ error })
        console.error(error);
    }

})

app.put('/api/make-template/', async (req, res) => {
    try {
        const { overlayID, widgetID, templateName } = req.body;
        const normalizedName = templateName.replaceAll(' - ', '-').replaceAll(' ', '-');
        const instancePath = join(__dirname, "overlays", overlayID, widgetID, "src");
        const destinationPath = join(__dirname, "templates", "user", normalizedName);

        await fs.promises.cp(instancePath, destinationPath, { recursive: true });

        res.json({ name: normalizedName })
    } catch (error) {
        res.json({ error })
        console.log(error);
    }
})

app.get('/api/open-folder/:overlayID/:widgetID', async (req, res) => {
    const { overlayID, widgetID } = req.params;
    const instancePath = widgetID == "null" ? join(__dirname, "overlays", overlayID) : join(__dirname, "overlays", overlayID, widgetID);

    let command;

    if (process.platform === "darwin") {
        command = `open "${instancePath}"`;
    } else if (process.platform === "win32") {
        command = `start "" "${instancePath}"`;
    } else if (process.platform === "linux") {
        command = `xdg-open "${instancePath}"`;
    } else {
        throw new Error("Unsupported operating system");
    }

    exec(command, (error) => {
        if (error) {
            res.json({ error })
            console.error("Error opening folder:", error);
            return
        }
    });
    res.send()
})

app.get('/api/open-editor/:overlayID/:widgetID', async (req, res) => {
    const { overlayID, widgetID } = req.params;
    const html = join(__dirname, "overlays", overlayID, widgetID, "src", "html.html");
    const css = join(__dirname, "overlays", overlayID, widgetID, "src", "css.css");
    const js = join(__dirname, "overlays", overlayID, widgetID, "src", "js.js");
    const fields = join(__dirname, "overlays", overlayID, widgetID, "src", "fields.json");

    const command = `code --reuse-window "${html}" "${css}" "${js}" "${fields}"`;

    exec(command, (error) => {
        if (error) {
            res.json({ error })
            console.error("Error opening editor:", error);
            return
        }
    });
    res.send()
})

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
})