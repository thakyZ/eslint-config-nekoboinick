declare module "eslint-plugin-promise" {
	import { Linter } from "eslint";
	import { RulesMeta } from "@eslint/core";
	interface Configs {
		"recommended": Linter.Config;
		"flat/recommended": Linter.Config;
	}
	interface Rules extends RulesConfig {
		"param-names": RulesMeta<"resolveParamNames" | "rejectParamNames">;
		"no-return-wrap": RulesMeta<"resolve" | "reject">;
		"always-return": RulesMeta<"thenShouldReturnOrThrow">;
		"catch-or-return": RulesMeta<"terminationMethod">;
		"prefer-await-to-callbacks": RulesMeta<"error">;
		"prefer-await-to-then": RulesMeta<"preferAwaitToCallback">;
		"prefer-catch": RulesMeta<"preferCatchToThen">;
		"no-native": RulesMeta<"name">;
		"no-callback-in-promise": RulesMeta<"callback">;
		"no-promise-in-callback": RulesMeta<"avoidPromiseInCallback">;
		"no-nesting": RulesMeta<"avoidNesting">;
		"avoid-new": RulesMeta<"avoidNew">;
		"no-new-statics": RulesMeta<"avoidNewStatic">;
		"no-return-in-finally": RulesMeta<"avoidReturnInFinally">;
		"valid-params": RulesMeta<"requireOneOptionalArgument" | "requireOneArgument" | "requireTwoOptionalArguments">;
		"no-multiple-resolved": RulesMeta<"alreadyResolved" | "potentiallyAlreadyResolved">;
		"spec-only": RulesMeta<"avoidNonStandard">;
	}
	interface RulesConfig {
		/** @default 1 */
		"param-names": number1;
		/** @default 1 */
		"always-return": number;
		/** @default 1 */
		"no-return-wrap": number;
		/** @default 0 */
		"no-native": number;
		/** @default 1 */
		"catch-or-return": number;
	}
	interface PromisePlugin extends Linter.Config {
		configs: Configs;
		rules: Rules;
		rulesConfig: RulesConfig;
	}
	const promisePlugin: PromisePlugin;
	export = promisePlugin;
}
