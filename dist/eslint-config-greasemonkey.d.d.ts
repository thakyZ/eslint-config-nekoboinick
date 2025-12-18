declare module "eslint-config-greasemonkey" {
	import { Linter } from "eslint";
	interface GreasemonkeyConfig extends Linter.Config {
		globals: Linter.Globals;
	}
	const greasemonkeyConfig: GreasemonkeyConfig;
	export default greasemonkeyConfig;
}
