import express from 'express';
import cors from 'cors'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors())
app.use(express.json());

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

async function fetchOverlayData(overlayID){
    const instancePath = join(__dirname, "overlays", overlayID, "overlay-data.json");
    const data = await fs.readFile(instancePath, 'utf-8');
    const currOverlayData = JSON.parse(data);

    return currOverlayData;
}

// API

// Create overlay

app.post("/api/create-overlay/", async (req, res) => {
    if (!req.body.name) return res.status(400).json({ error: 'Overlay name is required' });

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

app.get('/api/get-overlays', async (req, res) => {
    const overlays = await fs.readdir('./overlays/');
    const overlaysArray = await Promise.all(overlays.map(async (overlay) => {
        return await fetchOverlayData(overlay);
    }))
    res.json(overlaysArray)
})

// Get templates

app.get('/api/get-templates', async (req, res) => {
    const templates = await fs.readdir('./templates/user/');
    res.json([templates])
})

// Get widgets
// This should check for widget files and delete entries from the JSON if not found.
// In the future overlay-data will also store deletion data in the form of a UNIX timestamp. This should check the current time and delete any references earlier than Date.now()

app.get('/api/get-overlay-data/:overlayID', async (req, res) => {
    if (!req.params.overlayID) return res.status(400).json({ error: 'Overlay ID is required' });

    const { overlayID } = req.params;
    let currWidgetsArray = await fetchOverlayData(overlayID);
    
    res.json(currWidgetsArray)
})

// Create Widget

app.post("/api/create-widget/", async (req, res) => {
    if (!req.body.overlayID) return res.status(400).json({ error: 'Overlay id is required' });
    if (!req.body.template) return res.status(400).json({ error: "Template name is required" });
    if (!req.body.name) return res.status(400).json({ error: "Widget name is required" });

    const { name, template, overlayID } = req.body;
    const normalizedName = name.toLowerCase().replaceAll(' - ', '-').replaceAll(' ', '-');
    const instanceId = uuidv4();
    const widgetData = {
        template: template,
        id: instanceId,
        name: name,
        src: `/overlays/${overlayID}/${normalizedName}-${instanceId}/iframe.html`,
        width: 500,
        height: 500,
        posX: 0,
        posY: 0,
    };

    const iframeTemplate = join(__dirname, "templates", "iframe");
    const widgetTemplate = join(__dirname, "templates", "user", template);
    const destinationPath = join(__dirname, "overlays", overlayID, `${normalizedName}-${instanceId}`);
    const widgetFilesPath = join(__dirname, "overlays", overlayID, `${normalizedName}-${instanceId}`, "src");
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

// Delete widget

app.delete('/api/delete-widget/', async (req, res) => {
    if (!req.body.overlayID) return res.status(400).json({ error: 'Overlay id is required' });
    if (!req.body.id) return res.status(400).json({ error: 'Widget id is required' });
    if (!req.body.template) return res.status(400).json({ error: 'Template name is required' });

    const { template, id, overlayID } = req.body;

    const instancePath = join(__dirname, "overlays", overlayID, "overlay-data.json");
    let currWidgetsArray = await fetchOverlayData(overlayID);
    const target = join(__dirname, 'overlays', overlayID, `${template}-${id}`);

    try {
        const updatedWidgetsArray = currWidgetsArray.widgets.filter(item => item.id != id);
        fs.writeFileSync(instancePath, JSON.stringify(updatedWidgetsArray, null, "\t"), 'utf-8');
        fs.rmSync(target, { recursive: true, force: true });

        res.send();
    } catch (error) {
        console.error(error);
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
    if (!req.body.overlayID) return res.status(400).json({ error: 'Overlay id is required' });
    if (!req.body.id) return res.status(400).json({ error: 'Widget id is required' });

    const { overlayID, id, width, height, posX, posY } = req.body;

    const newSettings = {
        width: width,
        height: height,
        posX: posX,
        posY: posY,
    }

    const instancePath = join(__dirname, "overlays", overlayID, "overlay-data.json");
    let currWidgetsArray = await fetchOverlayData(overlayID);
    
    try {
        const updatedWidgetsArray = currWidgetsArray.widgets.map(widget => widget.id === id ? { ...widget, ...newSettings } : widget);
        currWidgetsArray.widgets = updatedWidgetsArray;
        fs.writeFileSync(instancePath, JSON.stringify(currWidgetsArray, null, "\t"), 'utf-8');
        res.send();
    } catch (error) {
        console.error(error);
    }
})

// Fetch files from /data/

app.get('/api/data/:file', async (req, res) => { 
    if (!req.params.file) return res.status(400).json({ error: 'File is required' });

    const dataFile = join(__dirname, "data", `${req.params.file}.json`);

    const dataObject = await fs.readFile(dataFile, 'utf-8');

    res.json(JSON.parse(dataObject))
})

// Fetch fields.json

app.get('/api/fields/:overlay/:widget', async (req, res) => {
    if (!req.params.overlay) return res.status(400).json({ error: 'Overlay is required' });
    if (!req.params.widget) return res.status(400).json({ error: 'Widget is required' });
    
    const dataFile = join(__dirname, "overlays", req.params.overlay, req.params.widget, 'src', 'fields.json');
    const fieldData = await fs.readFile(dataFile, 'utf-8');

    res.send(fieldData)
})

// Fetch data.json

app.post('/api/field-data/:overlay/:widget', async (req, res) => { 
    if (!req.params.overlay) return res.status(400).json({ error: 'Overlay is required' });
    if (!req.params.widget) return res.status(400).json({ error: 'Widget is required' });
    console.log('--- Widget ---', req.params.widget);

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
            if(data[key] === undefined) regenerate = true;
        })
        
        const defaultDataContent = JSON.stringify(fields, null, 2);
        if(regenerate){
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
    if (!req.params.overlay) return res.status(400).json({ error: 'Overlay is required' });
    if (!req.params.widget) return res.status(400).json({ error: 'Widget is required' });
    if (!req.params.field) return res.status(400).json({ error: 'Field is required' });

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

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
})