import os from "node:os";
import path from "node:path";

export function getDefaultPluginsDirectory() {
	const platform = os.platform();
	const homedir = os.homedir();

	let baseDir;

	if (platform === "win32") {
		baseDir = path.join(homedir, "AppData", "Roaming");
	} else if (platform === "darwin") {
		baseDir = path.join(homedir, "Library", "Application Support");
	} else {
		baseDir = path.join(homedir, ".config");
	}

	const dataDirectory = path.join(baseDir, "limbo");
	const pluginsDir = path.join(dataDirectory, "plugins");

	return pluginsDir;
}
