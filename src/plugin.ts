import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "rollup";
import { getDefaultPluginsDirectory } from "./utils";

export declare namespace plugin {
	interface Options {
		/**
		 * Whether to copy the build output to the limbo plugins directory.
		 *
		 * @default false
		 */
		copyToPluginsDir?: boolean;

		/**
		 * The directory where the plugin will be copied after build.
		 */
		pluginsDir?: string;
	}
}

// TODO, should overrides be spread before or after the user options?

export function plugin(opts?: plugin.Options): Plugin {
	let pluginManifest: any | undefined;
	let outDir: string | undefined;

	return {
		name: "limbo",
		outputOptions(userOpts) {
			return {
				...userOpts,
				format: "cjs",
				entryFileNames: "plugin.js",
			};
		},
		buildStart() {
			this.addWatchFile("plugin.json");

			let pluginManifestRaw;

			try {
				pluginManifestRaw = fs.readFileSync("plugin.json", "utf8");
			} catch (error) {
				this.error("Failed to read plugin.json");
			}

			try {
				pluginManifest = JSON.parse(pluginManifestRaw);
			} catch {
				this.error("Failed to parse plugin.json");
			}
		},
		generateBundle({ dir }) {
			outDir = dir;

			this.emitFile({
				type: "asset",
				fileName: "plugin.json",
				source: JSON.stringify(pluginManifest),
			});
		},
		closeBundle() {
			if (outDir === undefined || !opts?.copyToPluginsDir) {
				return;
			}

			const pluginsDirectory = opts?.pluginsDir ?? getDefaultPluginsDirectory();

			const pluginDirectory = path.join(pluginsDirectory, pluginManifest!.id);

			try {
				fs.cpSync(outDir, pluginDirectory, {
					recursive: true,
				});

				this.info(`Copied built plugin to ${pluginDirectory}`);
			} catch {
				this.error(`Failed to copy built plugin to ${pluginDirectory}`);
			}
		},
	};
}
