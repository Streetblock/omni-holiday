# OmniHoliday

Holiday and observance domain library built on top of a dedicated calendar-conversion engine.

OmniHoliday adds:
- legal classification (e.g. German legal config)
- holiday providers (state/religious/cultural)
- category and scope metadata (regional, legal, silent day, etc.)

## Engine Dependency

OmniHoliday uses **ChronosBridge** as its calendar-conversion engine:
- Repository: [https://github.com/Streetblock/chronos-bridge.git](https://github.com/Streetblock/chronos-bridge.git)

Current local integration mirrors the modular ChronosBridge source in `libs/chronos-bridge/src` and adapts it for browser-global compatibility.

## Scope

This repository is the **domain layer**.
Calendar conversion math should come from ChronosBridge.

## Project Layout

```text
omni-holiday/
├── index.html
├── app.js
├── style.css
├── src/
│   └── omni-holiday.js
└── libs/
    ├── bootstrap.js
    ├── chronos-bridge-adapter.js
    └── chronos-bridge/
        └── src/
```

## Demo (GitHub Pages)

The root `index.html` is the demo entrypoint so GitHub Pages can serve it directly.

## Local Dev

For parallel local development with separate repos:

```bash
# in chronos-bridge
npm link

# in omni-holiday
npm link chronos-bridge
```

## License

MIT
