<div align="center">
  
# se-dev-env
  
</div>
This app aims to bridge the gap between efficient development and StreamElements. Create an overlay, add a widget, and start coding right in your preferred editor.

---

<img width="3840" height="2486" alt="image" src="https://github.com/user-attachments/assets/9c581933-35e3-413a-9b57-5e1422cea2a6" />
<img width="3840" height="2486" alt="image" src="https://github.com/user-attachments/assets/c020b829-6771-44bb-bcb6-d19e56747254" />

---

# Installation and launching

1. Run this command in the terminal

```bash
git clone https://github.com/Redo7/se-dev-env
cd se-dev-env
npm install
```
2. Create a `.env` file in the root directory with these values:
  -   `VITE_GOOGLE_FONTS_API_KEY = your-api-key-here`
3. To run the app, choose one of the options below
  - Terminal: `npm run dev`
  - VSCode: Run `code .` in the terminal to open the app's folder in the editor. Then just run `npm run dev` in its integrated terminal
    - Not a lot of difference, but at least you can close the other terminal window
4. Open [http://localhost:5173/](http://localhost:5173/)

# Configuration

1. You can add your own widget templates and create them on any overlay by simply putting your `html.html`, `css.css`, `js.js`, `fields.json`, and `data.json` inside of `/templates/user/{your template name}`. The app is going to scan that directory, and will automatically add them to the `+` button on the overlay.
  - Or just import a widget.io compatible widget, edit it's files if needed, and click `Make a template` from the context menu.

> [!NOTE]
> 2. It's recommended you create private repos inside of `/templates/user/` and `/overlays/` and push them to a remote in order to have a backup of your files.

# Using the app

1. Make a new overlay
2. Make or Import a new widget
3. Hover over the widget and click the 3 dots to open the context menu
4. Click `Open in Editor` to open the widgets files in VSCode (for now just VSCode)

# 1.0 Release Roadmap

-   [x] `SE_API` storage persistance
-   [x] On-screen console toasts
-   [ ] [widget.io](https://chromewebstore.google.com/detail/widgetio/fcgbjpajcfjnjgfdeookpnoefgcliljj)
    -   [x] Import
    -   [x] Export
        -   [ ] Obfuscate
-   [x] Finish home screen design
    -   [x] Add search
    -   [x] Add sort
    -   [x] Display relative time on recents
-   [x] Overlay and widget renaming
    -   [x] Rename entries in `deletion-data.json`
-   [x] Native way of creating templates
-   [ ] Fields
    -   [ ] Movable
    -   [ ] Field Creator
        -   [ ] Creating new field should put the template name by default
        -   [ ] Increment number when adding multiple times
    -   [ ] Field Group redesign
-   [ ] Events emulation
    -   [x] Basic implementation
    -   [ ] Custom events
    -   [ ] Update `data/onSessionUpdate` and `data/onWidgetLoad` when related events happen
-   [ ] Chat emulation
    -   [x] Basic implementation
    -   [ ] Identities
-   [ ] Finish light mode
-   [ ] Widget menu
    -   [x] Rename
    -   [x] Export
    -   [x] Duplicate
    -   [ ] Move to
    -   [x] Make a template
    -   [x] Open folder
    -   [x] Open in Editor
        -   [ ] Editor can be set in settings
    -   [ ] Regenerate widget data.json with default values
    -   [ ] Set current field.json defaults from current data.json values
    -   [x] Pointer events
    -   [x] Layer above
    -   [x] Layer below
    -   [x] Toggle bg
    -   [ ] Accent color
    -   [x] Toggle blur
    -   [x] Delete
-   [ ] Animations
-   [ ] Run script
-   [x] Automatic widget layering onClick
-   [x] Add toasts to the app
