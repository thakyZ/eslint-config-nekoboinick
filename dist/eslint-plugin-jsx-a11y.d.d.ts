declare module "eslint-plugin-jsx-a11y" {
	import { Linter } from "eslint";
	import { RulesMeta } from "@eslint/core";
	interface Configs {
		recommended: Linter.LegacyConfig;
		strict: Linter.LegacyConfig;
	}
	interface FlatConfigs {
		recommended: Linter.Config;
		strict: Linter.Config;
	}
	interface Rules {
		"accessible-emoji": RulesMeta;
		"alt-text": RulesMeta;
		"anchor-ambiguous-text": RulesMeta;
		"anchor-has-content": RulesMeta;
		"anchor-is-valid": RulesMeta;
		"aria-activedescendant-has-tabindex": RulesMeta;
		"aria-props": RulesMeta;
		"aria-proptypes": RulesMeta;
		"aria-role": RulesMeta;
		"aria-unsupported-elements": RulesMeta;
		"autocomplete-valid": RulesMeta;
		"click-events-have-key-events": RulesMeta;
		"control-has-associated-label": RulesMeta;
		"heading-has-content": RulesMeta;
		"html-has-lang": RulesMeta;
		"iframe-has-title": RulesMeta;
		"img-redundant-alt": RulesMeta;
		"interactive-supports-focus": RulesMeta;
		"label-has-associated-control": RulesMeta;
		"label-has-for": RulesMeta;
		"lang": RulesMeta;
		"media-has-caption": RulesMeta;
		"mouse-events-have-key-events": RulesMeta;
		"no-access-key": RulesMeta;
		"no-aria-hidden-on-focusable": RulesMeta;
		"no-autofocus": RulesMeta;
		"no-distracting-elements": RulesMeta;
		"no-interactive-element-to-noninteractive-role": RulesMeta;
		"no-noninteractive-element-interactions": RulesMeta;
		"no-noninteractive-element-to-interactive-role": RulesMeta;
		"no-noninteractive-tabindex": RulesMeta;
		"no-onchange": RulesMeta;
		"no-redundant-roles": RulesMeta;
		"no-static-element-interactions": RulesMeta;
		"prefer-tag-over-role": RulesMeta;
		"role-has-required-aria-props": RulesMeta;
		"role-supports-aria-props": RulesMeta;
		"scope": RulesMeta;
		"tabindex-no-positive": RulesMeta;
	}
	interface JsxA11yPlugin extends Linter.Config {
		configs: Configs;
		flatConfigs: FlatConfigs;
		rules: Rules;
		meta: {
			name: string;
			version: string;
		};
	}
	const jsxA11yPlugin: JsxA11yPlugin;
	export = jsxA11yPlugin;
}
