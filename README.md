# @personal-ari/plugin-sdk

## Local Development

To make changes to the SDK and test them instantly in plugins without publishing to a registry, use `npm link`.

### 1. Prepare SDK
In the `ari-sdk` directory:
```bash
npm install
npm run build # Build the project
npm link       # Create a global link to the package
```

### 2. Connect in Plugin

In the plugin directory (e.g., `ari/plugins/GiftPlugin/ui`):

```bash
npm link @personal-ari/plugin-sdk
```

### 3. Workflow

To have SDK changes immediately reflected in the plugin:

1. Start SDK build in watch mode: `npm run dev` (or `vite build --watch`).
2. In another terminal, start the plugin: `npm run dev`.

> **Important:** If you encounter an "Invalid hook call" error (Duplicate React), ensure that the plugin's `vite.config.ts` has a configured alias for `react` pointing to the plugin's local `node_modules`.
