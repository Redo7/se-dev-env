<div align="center">
  
# se-dev-env
  
</div>
This app aims to bridge the gap between efficient development and StreamElements. Create an overlay, add a widget, and start coding right in your preferred editor.

---

![](https://gist.github.com/user-attachments/assets/bdfc1fb9-6722-4aa7-b4b0-efcae6422043)
![](https://gist.github.com/user-attachments/assets/fe5da4b0-132f-49a7-90e3-2f608bd6aeb1)
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