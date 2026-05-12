# OmniHoliday

Holiday and observance domain library built on top of a calendar math core.

OmniHoliday adds:
- legal classification (e.g. German legal config)
- holiday providers (state/religious/cultural)
- category and scope metadata (regional, legal, silent day, etc.)

## Scope

This repository is the **domain layer**.
Calendar conversion math should come from `chronos-bridge`.

## Current Project Layout

```text
omni-holiday/
├── omni-holiday.js
├── app.js
├── index.html
└── style.css
```

## Integration Direction

Planned setup:
1. Publish/use `chronos-bridge` as dependency.
2. Import conversion utilities into holiday providers.
3. Keep legal/business rules isolated in this repo.

## Local Dev (planned)

For parallel local development with separate repos:

```bash
# in chronos-bridge
npm link

# in omni-holiday
npm link chronos-bridge
```

## License

MIT
