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

app.get('/api/get-widgets', async (req, res) => {
    const widgets = await fs.readFile('./widgetInstances.json', 'utf-8');
    res.json(JSON.parse(widgets))

    // This should check for widget files and delete entries from the JSON if not found.
})

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
        height: 700,
        posX: 0,
        posY: 0,
    };
    // Swap overlay-1 for id here

    const templatePath = join(__dirname, "templates", templateName);
    const destinationPath = join(__dirname, "overlays", "overlay-1", `${templateName}-${instanceId}`,);
    // Swap overlay-1 for id here


    try {
        console.log(`Copying ${templateName} files to ${destinationPath}`);
        await fs.promises.cp(templatePath, destinationPath, { recursive: true });

        const currWidgets = await fs.promises.readFile(
            "./widgetInstances.json",
            "utf-8",
        );
        const currWidgetsArray = JSON.parse(currWidgets);
        currWidgetsArray.push(widgetData);
        await fs.promises.writeFile("./widgetInstances.json", JSON.stringify(currWidgetsArray, null, 2), "utf-8",);

        res.json(widgetData);
    } catch (error) {
        console.error("Error creating widget:", error);
        res.status(500).json({ error: "Failed to create widget" });
    }
});

app.delete('/api/delete-widget', async (req, res) => {
    if (!req.body.id) return res.status(400).json({ error: 'Widget id is required' });
    if (!req.body.template) return res.status(400).json({ error: 'Template name is required' });


    const currWidgets = await fs.readFile('./widgetInstances.json', 'utf-8');
    const currWidgetsArray = JSON.parse(currWidgets);
    const target = join(__dirname, 'overlays', 'overlay-1', `${req.body.template}-${req.body.id}`);
    // Swap overlay-1 for id here

    try {
        const updatedWidgetsArray = currWidgetsArray.filter(item => item.id != req.body.id);
        fs.writeFileSync('./widgetInstances.json', JSON.stringify(updatedWidgetsArray), 'utf-8');
        fs.rmSync(target, { recursive: true, force: true });

        res.send();
    } catch (error) {
        console.error(error);
    }
})

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
        fs.writeFileSync('./widgetInstances.json', JSON.stringify(updatedWidgetsArray), 'utf-8');
        res.send();
    } catch (error) {
        console.error(error);
    }
})

app.get('/api/data/:file', async (req, res) => {
    if (!req.params.file) return res.status(400).json({ error: 'File is required' });

    const dataFile = join(__dirname, "data", `${req.params.file}.json`);

    const dataObject = await fs.readFile(dataFile, 'utf-8');

    res.json(JSON.parse(dataObject))
})

app.get('/api/field-data/:overlay/:widget', async (req, res) => {
    if (!req.params.overlay) return res.status(400).json({ error: 'Overlay is required' });
    if (!req.params.widget) return res.status(400).json({ error: 'Widget is required' });

    const dataFile = join(__dirname, "overlays", req.params.overlay, req.params.widget, 'src', 'data.json');

    const fieldData = await fs.readFile(dataFile, 'utf-8');

    res.send(fieldData)
})

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
})