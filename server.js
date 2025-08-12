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
// app.use(express.static(join(__dirname, 'public')));

app.get('/overlays/overlay-:overlay-id/:template-:id/iframe.html', async (req, res) => {
    const { template, id } = req.params;
    const filePath = join(__dirname, 'overlays', 'overlay-1', `${template}-${id}`, 'iframe.html');
    // Swap overlay-1 for id here

    try {
        await fs.access(filePath, fs.constants.F_OK);
        res.sendFile(filePath);
    } catch (error) {
        res.status(404).send('File not found');
    }
});

// Get widgets
// This should check for widget files and delete entries from the JSON if not found.
// In the future widgetInstances will also store deletion data in the form of a UNIX timestamp. This should check the current time and delete any references earlier than Date.now()

app.get('/api/get-widgets', async (req, res) => {
    const widgets = await fs.readFile('./widgetInstances.json', 'utf-8');
    res.json(JSON.parse(widgets))

})

// Get templates

app.get('/api/get-templates', async (req, res) => {
    const templates = await fs.readdir('./templates/user/');
    res.json([templates])
})

// Create Widget

app.post("/api/create-widget", async (req, res) => {
    if (!req.body.template) return res.status(400).json({ error: "templateName is required" });

    const { template: templateName } = req.body;
    const instanceId = uuidv4();
    const widgetData = {
        template: templateName,
        id: instanceId,
        name: `${templateName} widget`,
        src: `/overlays/overlay-1/${templateName}-${instanceId}/iframe.html`,
        width: 500,
        height: 500,
        posX: 0,
        posY: 0,
    };
    // Swap overlay-1 for id of the overlay, name for user input

    const iframeTemplate = join(__dirname, "templates", "iframe");
    const widgetTemplate = join(__dirname, "templates", "user", templateName);
    const destinationPath = join(__dirname, "overlays", "overlay-1", `${templateName}-${instanceId}`);
    const widgetFilesPath = join(__dirname, "overlays", "overlay-1", `${templateName}-${instanceId}`, "src");
    // Swap overlay-1 for id here

    try {
        console.log(`Copying ${templateName} files to ${destinationPath}`);
        await fs.promises.cp(iframeTemplate, destinationPath, { recursive: true });
        await fs.promises.cp(widgetTemplate, widgetFilesPath, { recursive: true });

        const currWidgets = await fs.promises.readFile(
            "./widgetInstances.json",
            "utf-8",
        );
        const currWidgetsArray = JSON.parse(currWidgets);
        currWidgetsArray.push(widgetData);
        await fs.promises.writeFile("./widgetInstances.json", JSON.stringify(currWidgetsArray, null, "\t"), "utf-8",);

        res.json(widgetData);
    } catch (error) {
        console.error("Error creating widget:", error);
        res.status(500).json({ error: "Failed to create widget" });
    }
});

// Delete widget

app.delete('/api/delete-widget', async (req, res) => {
    if (!req.body.id) return res.status(400).json({ error: 'Widget id is required' });
    if (!req.body.template) return res.status(400).json({ error: 'Template name is required' });


    const currWidgets = await fs.readFile('./widgetInstances.json', 'utf-8');
    const currWidgetsArray = JSON.parse(currWidgets);
    const target = join(__dirname, 'overlays', 'overlay-1', `${req.body.template}-${req.body.id}`);
    // Swap overlay-1 for id here

    try {
        const updatedWidgetsArray = currWidgetsArray.filter(item => item.id != req.body.id);
        fs.writeFileSync('./widgetInstances.json', JSON.stringify(updatedWidgetsArray, null, "\t"), 'utf-8');
        fs.rmSync(target, { recursive: true, force: true });

        res.send();
    } catch (error) {
        console.error(error);
    }
})

// Update widgetInstances

app.put('/api/update-widget-settings', async (req, res) => {
    if (!req.body.id) return res.status(400).json({ error: 'Widget id is required' });

    const newSettings = {
        width: req.body.width,
        height: req.body.height,
        posX: req.body.posX,
        posY: req.body.posY,
    }

    const currWidgets = await fs.readFile('./widgetInstances.json', 'utf-8');
    const currWidgetsArray = JSON.parse(currWidgets);
    try {
        const updatedWidgetsArray = currWidgetsArray.map(widget => widget.id === req.body.id ? { ...widget, ...newSettings } : widget);
        fs.writeFileSync('./widgetInstances.json', JSON.stringify(updatedWidgetsArray, null, "\t"), 'utf-8');
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