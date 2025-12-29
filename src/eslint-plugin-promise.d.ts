declare module "eslint-plugin-promise" {
  import { ReadonlyDeep } from "type-fest";
  import { Linter } from "eslint";
  import { RulesMeta } from "@eslint/core";

  const promisePlugin: {
    configs: {
      readonly "recommended": Linter.Config;
      readonly "flat/recommended": Linter.Config;
    };
    rules: {
      readonly "param-names": ReadonlyDeep<RulesMeta<"resolveParamNames" | "rejectParamNames">>;
      readonly "no-return-wrap": ReadonlyDeep<RulesMeta<"resolve" | "reject">>;
      readonly "always-return": ReadonlyDeep<RulesMeta<"thenShouldReturnOrThrow">>;
      readonly "catch-or-return": ReadonlyDeep<RulesMeta<"terminationMethod">>;
      readonly "prefer-await-to-callbacks": ReadonlyDeep<RulesMeta<"error">>;
      readonly "prefer-await-to-then": ReadonlyDeep<RulesMeta<"preferAwaitToCallback">>;
      readonly "prefer-catch": ReadonlyDeep<RulesMeta<"preferCatchToThen">>;
      readonly "no-native": ReadonlyDeep<RulesMeta<"name">>;
      readonly "no-callback-in-promise": ReadonlyDeep<RulesMeta<"callback">>;
      readonly "no-promise-in-callback": ReadonlyDeep<RulesMeta<"avoidPromiseInCallback">>;
      readonly "no-nesting": ReadonlyDeep<RulesMeta<"avoidNesting">>;
      readonly "avoid-new": ReadonlyDeep<RulesMeta<"avoidNew">>;
      readonly "no-new-statics": ReadonlyDeep<RulesMeta<"avoidNewStatic">>;
      readonly "no-return-in-finally": ReadonlyDeep<RulesMeta<"avoidReturnInFinally">>;
      readonly "valid-params": ReadonlyDeep<RulesMeta<"requireOneOptionalArgument" | "requireOneArgument" | "requireTwoOptionalArguments">>;
      readonly "no-multiple-resolved": ReadonlyDeep<RulesMeta<"alreadyResolved" | "potentiallyAlreadyResolved">>;
      readonly "spec-only": ReadonlyDeep<RulesMeta<"avoidNonStandard">>;
    };
    rulesConfig: {
      /** @default 1 */
      readonly "param-names": number;
      /** @default 1 */
      readonly "always-return": number;
      /** @default 1 */
      readonly "no-return-wrap": number;
      /** @default 0 */
      readonly "no-native": number;
      /** @default 1 */
      readonly "catch-or-return": number;
    };
  };

  export = promisePlugin;
}
