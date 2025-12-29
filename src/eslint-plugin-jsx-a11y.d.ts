declare module "eslint-plugin-jsx-a11y" {
  import { Linter } from "eslint";
  import { RulesMeta } from "@eslint/core";

  declare const jsxA11yPlugin: {
    readonly configs: {
      readonly recommended: Linter.LegacyConfig;
      readonly strict: Linter.LegacyConfig;
    };
    readonly flatConfigs: {
      readonly recommended: Linter.Config;
      readonly strict: Linter.Config;
    };
    readonly rules: {
      readonly "accessible-emoji": RulesMeta;
      readonly "alt-text": RulesMeta;
      readonly "anchor-ambiguous-text": RulesMeta;
      readonly "anchor-has-content": RulesMeta;
      readonly "anchor-is-valid": RulesMeta;
      readonly "aria-activedescendant-has-tabindex": RulesMeta;
      readonly "aria-props": RulesMeta;
      readonly "aria-proptypes": RulesMeta;
      readonly "aria-role": RulesMeta;
      readonly "aria-unsupported-elements": RulesMeta;
      readonly "autocomplete-valid": RulesMeta;
      readonly "click-events-have-key-events": RulesMeta;
      readonly "control-has-associated-label": RulesMeta;
      readonly "heading-has-content": RulesMeta;
      readonly "html-has-lang": RulesMeta;
      readonly "iframe-has-title": RulesMeta;
      readonly "img-redundant-alt": RulesMeta;
      readonly "interactive-supports-focus": RulesMeta;
      readonly "label-has-associated-control": RulesMeta;
      readonly "label-has-for": RulesMeta;
      readonly "lang": RulesMeta;
      readonly "media-has-caption": RulesMeta;
      readonly "mouse-events-have-key-events": RulesMeta;
      readonly "no-access-key": RulesMeta;
      readonly "no-aria-hidden-on-focusable": RulesMeta;
      readonly "no-autofocus": RulesMeta;
      readonly "no-distracting-elements": RulesMeta;
      readonly "no-interactive-element-to-noninteractive-role": RulesMeta;
      readonly "no-noninteractive-element-interactions": RulesMeta;
      readonly "no-noninteractive-element-to-interactive-role": RulesMeta;
      readonly "no-noninteractive-tabindex": RulesMeta;
      readonly "no-onchange": RulesMeta;
      readonly "no-redundant-roles": RulesMeta;
      readonly "no-static-element-interactions": RulesMeta;
      readonly "prefer-tag-over-role": RulesMeta;
      readonly "role-has-required-aria-props": RulesMeta;
      readonly "role-supports-aria-props": RulesMeta;
      readonly "scope": RulesMeta;
      readonly "tabindex-no-positive": RulesMeta;
    };
    readonly meta: {
      readonly name: string;
      readonly version: string;
    };
  };

  export = jsxA11yPlugin;
}
