<div align="center">
  
# se-dev-env
  
</div>
This app aims to bridge the gap between efficient development and StreamElements. Create an overlay, add a widget, and start coding right in your preferred editor.

---

<img width="3840" height="2486" alt="image" src="https://github.com/user-attachments/assets/9c581933-35e3-413a-9b57-5e1422cea2a6" />
<img width="3840" height="2486" alt="image" src="https://github.com/user-attachments/assets/c020b829-6771-44bb-bcb6-d19e56747254" />

---

# Installation

1. Run this command in the terminal

```bash
git clone https://github.com/Redo7/se-dev-env
cd se-dev-env
npm install
npm run dev
```

2. Open [http://localhost:5173/](http://localhost:5173/)
3. Then just run `npm run dev` in the app's directory whenever you want to start the server

# Configuration

1. You can add your own widget templates and create them on any overlay by simply putting your `html.html`, `css.css`, `js.js`, `fields.json`, and `data.json` inside of `/templates/user/{your template name}`. The app is going to scan that directory, and will automatically add them to the `+` button on the overlay.

2. Create a `.env` file in the root directory with these values:

-   `VITE_GOOGLE_FONTS_API_KEY = your-api-key-here`

# 1.0 Release Roadmap

-   [x] `SE_API` storage persistance
-   [x] On-screen console toasts
-   [ ] [widget.io](https://chromewebstore.google.com/detail/widgetio/fcgbjpajcfjnjgfdeookpnoefgcliljj)
    -   [ ] Import
    -   [x] Export
        -   [ ] Obfuscate
-   [x] Finish home screen design
    -   [x] Add search
    -   [x] Add sort
    -   [x] Display relative time on recents
-   [ ] Overlay and widget renaming
    -   [ ] Rename entries in `deletion-data.json`
-   [ ] Native way of creating templates
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
    -   [ ] Rename
    -   [ ] Export
    -   [ ] Make a template
    -   [ ] Open folder
    -   [ ] Open in Editor
        -   [ ] Editor can be set in settings
    -   [ ] Pointer events
    -   [ ] Delete
-   [ ] Animations
-   [ ] Add toasts to the app
