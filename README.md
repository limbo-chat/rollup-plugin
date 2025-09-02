# rollup-plugin-limbo

This is a rollup plugin to make [limbo](https://github.com/limbo-chat) plugin development easier.

> [!NOTE]
> You can quickly scaffold a new limbo plugin using `npm create limbo-plugin`

## Features

- Automatically copies your built plugin to your local Limbo plugins folder

## Install

```sh
pnpm add -D rollup-plugin-limbo
# or
yarn add -D rollup-plugin-limbo
# or
npm install -D rollup-plugin-limbo
```

## Usage

```js
import { defineConfig } from "rollup";
import limbo from "rollup-plugin-limbo";

export default defineConfig({
	input: "./src/plugin.ts",
	output: {
		dir: "build",
	},
	plugins: [
		limbo({
			// optional, copying is disabled by default
			copyToPluginsDir: true,
			pluginsDir: process.env.LIMBO_PLUGINS_DIR_PATH,
		}),
	],
});
```

## Automatic Build Copying

In order for `rollup-plugin-limbo` to automatically copy the built plugin to your local Limbo plugins directory, you must provide the path to the directory. Here are the usual locations on platforms Limbo supports.

```sh
# macos
/Users/<user>/Library/Application Support/limbo/plugins
```
