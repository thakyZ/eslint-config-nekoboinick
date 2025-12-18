declare module "@eslint-community/eslint-plugin-eslint-comments" {
	import { Linter } from "eslint";
	import { RulesMeta } from "@eslint/core";
	interface Utils {
		patch: (ruleId?: keyof Linter.RulesRecord = "@eslint-community/eslint-comments/no-unused-disable") => void;
	}
	interface Configs {
		recommended: Linter.Config;
	}
	interface Rules {
		"disable-enable-pair": RulesMeta<"missingPair" | "missingRulePair">;
		"no-aggregating-enable": RulesMeta<"aggregatingEnable">;
		"no-duplicate-disable": RulesMeta<"duplicate" | "duplicateRule">;
		"no-restricted-disable": RulesMeta<"disallow">;
		"no-unlimited-disable": RulesMeta<"unexpected">;
		"no-unused-disable": RulesMeta<string>;
		"no-unused-enable": RulesMeta<"unused" | "unusedRule">;
		"no-use": RulesMeta<"disallow">;
		"require-description": RulesMeta<"missingDescription">;
	}
	interface EslintCommentsPlugin extends Linter.Config {
		configs: Configs;
		rules: Rules;
		utils: Utils;
	}
	const eslintCommentsPlugin: EslintCommentsPlugin;
	export = eslintCommentsPlugin;
}
