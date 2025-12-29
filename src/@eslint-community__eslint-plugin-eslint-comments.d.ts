declare module "@eslint-community/eslint-plugin-eslint-comments" {
  import type { Linter } from "eslint";
  import type { RulesMeta } from "@eslint/core";
  import type { ReadonlyDeep } from "type-fest";

  const eslintCommentsPlugin: {
    readonly configs: {
      readonly recommended: Linter.Config;
    };
    readonly rules: {
      readonly "disable-enable-pair": ReadonlyDeep<RulesMeta<"missingPair" | "missingRulePair">>;
      readonly "no-aggregating-enable": ReadonlyDeep<RulesMeta<"aggregatingEnable">>;
      readonly "no-duplicate-disable": ReadonlyDeep<RulesMeta<"duplicate" | "duplicateRule">>;
      readonly "no-restricted-disable": ReadonlyDeep<RulesMeta<"disallow">>;
      readonly "no-unlimited-disable": ReadonlyDeep<RulesMeta<"unexpected">>;
      readonly "no-unused-disable": ReadonlyDeep<RulesMeta<string>>;
      readonly "no-unused-enable": ReadonlyDeep<RulesMeta<"unused" | "unusedRule">>;
      readonly "no-use": ReadonlyDeep<RulesMeta<"disallow">>;
      readonly "require-description": ReadonlyDeep<RulesMeta<"missingDescription">>;
    };
    readonly utils: {
      // eslint-disable-next-line no-unused-vars
      readonly patch: (ruleId?: keyof Linter.RulesRecord = "@eslint-community/eslint-comments/no-unused-disable") => void;
    };
  };

  export = eslintCommentsPlugin;
}
