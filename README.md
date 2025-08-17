<div align="center">
  
# se-dev-env
  
</div>
This app aims to bridge the gap between efficient development and StreamElements. Create an overlay, add a widget, and start coding right in your preferred editor.

---

<img width="3840" height="2486" alt="image" src="https://github.com/user-attachments/assets/899513b6-2cbc-4ac8-9d59-fe400cb0af94" />
<img width="3840" height="2486" alt="image" src="https://github.com/user-attachments/assets/c020b829-6771-44bb-bcb6-d19e56747254" />

---


# Installation

```bash
git clone https://github.com/redo7/se-dev-env
cd se-dev-env
npm run dev
```

# Configuration
You can add your own widget templates and create them on any overlay by simply putting your `html.html`, `css.css`, `js.js`, `fields.json`, and `data.json` inside of `/templates/user/{your template name}`. The app is going to scan that directory, and will automatically add them to the `+` button on the overlay.

# 1.0 Release Roadmap

- [ ] `SE_API` storage persistance
- [ ] On-screen console toasts
- [ ] [widget.io](https://chromewebstore.google.com/detail/widgetio/fcgbjpajcfjnjgfdeookpnoefgcliljj) `import`/`export`
- [ ] Finish home screen design
    - [ ] Display relative time on recents
- [ ] Overlay and widget renaming
- [ ] Fields
    - [ ] Movable
    - [ ] Field Creator
    - [ ] Field Group redesign
- [ ] Events emulation
    - [ ] Custom events
    - [ ] Update `data/onSessionUpdate` and `data/onWidgetLoad` when related events happen
- [ ] Chat emulation
- [ ] Finish light mode
