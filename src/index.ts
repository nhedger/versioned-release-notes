import { getInput } from "@actions/core";
import { create as createGlob } from "@actions/glob";

(async () => {
	// Get files glob pattern from inputs
	const files = getInput("files", { required: true, trimWhitespace: true });

	// Create a new glob
	const glob = await createGlob(files);
	for await (const file of glob.globGenerator()) {
		console.log(file);
	}
})();
