# NASA Dashboard — Chrome Extension

A Chrome extension that displays live NASA / ISS data at a glance: how many humans are currently in orbit, who they are, and real-time ISS system telemetry.

## Features

- **Crew manifest** — live count of humans currently in orbit aboard the ISS, pulled from the Open Notify API
- **ISS system status** — real-time Urine and Water tank levels streamed live from NASA's Lightstreamer telemetry feed
- No API key required — all data sources are public

## Preview

The popup is a compact 380×500px dark-themed dashboard with:
- Glowing crew count with a scrollable astronaut list
- Live progress bars for ISS life support tank levels

## Installation

### From source

1. **Clone the repo**
   ```bash
   git clone https://github.com/LetUndefined/Nasa-extension.git
   cd Nasa-extension
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load into Chrome**
   - Open `chrome://extensions`
   - Enable **Developer mode** (top-right toggle)
   - Click **Load unpacked**
   - Select the `dist/` folder

5. Click the extension icon in your toolbar — the NASA Dashboard popup will open.

## Development

Start the Vite dev server (for UI iteration in the browser):
```bash
npm run dev
```

To test as an actual extension, rebuild with `npm run build` and reload the unpacked extension in `chrome://extensions` after each change.

## Tech stack

| Tool | Purpose |
|---|---|
| React 19 + TypeScript | UI |
| Vite | Bundler |
| Tailwind CSS v4 | Styling |
| Open Notify API | Astronaut count & names |
| Lightstreamer (ISSLIVE) | Real-time ISS telemetry |

## Data sources

- **Astronaut data** — `http://api.open-notify.org/astros.json` (public, no key needed)
- **ISS telemetry** — `https://push.lightstreamer.com` / `ISSLIVE` stream, items `USLAB000058` (Urine Tank) and `USLAB000059` (Water Tank)

## License

MIT
