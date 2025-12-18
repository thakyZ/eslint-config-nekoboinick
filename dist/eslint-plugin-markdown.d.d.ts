declare module "eslint-plugin-markdown" {
	import { Linter } from "eslint";
	interface MarkdownPlugin extends Linter.Config {
		configs: { recommended: Linter.Config[] };
	}
	const markdownPlugin: MarkdownPlugin;
	export = markdownPlugin;
}
