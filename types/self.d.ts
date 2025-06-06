declare module "self" {
  import type { Linter } from "eslint";
  import type { FlatCompat } from "@eslint/eslintrc";
  type MonkeyCodeNamesTypeDef = "string" | "custom" | "custom_global"
  type GetMonkeyCodeNamesFunc = (type: MonkeyCodeNamesTypeDef) => (Array<string> | { [key: string]: string })
  interface EslintGreaseMonkeyModule_LanguageOptions {
    globals: Record<string, string>;
  }
  type ObjectOrArrayKvp<TKey, TValue> = Array<[TKey, TValue]> | Record<TKey, TValue>;
  let ___dirname: string | undefined;
  const flatCompat: FlatCompat;
  const removableGlobalVars: string[];
  const greaseMonkey: Partial<Linter.Config>[];
  /**
   * Gets the installed version of a module from the path and name.
   *
   * @param {String} name The name of the module to query.
   * @returns {String | null}
   */
  function getInstalledVersion(name: string): string | null;
  /**
   *
   *
   * @param getMonkeyCodeNames
   */
  function customRules(getMonkeyCodeNames: GetMonkeyCodeNamesFunc): Linter.RulesRecord;
  /**
   * Gets a list of monkey code names. And parses them into types.
   *
   * @param config
   * @returns
   */
  function getMonkeyCodeNames(config: Partial<Linter.Config>[]): GetMonkeyCodeNamesFunc
  /**
   *
   *
   * @param name Name of the global property to remove.
   * @param global Object containing the global variables.
   * @returns
   */
  function removeGlobalVars(name: string, global: ObjectOrArrayKvp<string, string | boolean>): ObjectOrArrayKvp<string, string | boolean>;

  export type {
    MonkeyCodeNamesTypeDef,
    GetMonkeyCodeNamesFunc,
    EslintGreaseMonkeyModule_LanguageOptions,
    ObjectOrArrayKvp,
    ___dirname,
    flatCompat,
    removableGlobalVars,
    greaseMonkey,
    getInstalledVersion,
    customRules,
    getMonkeyCodeNames,
    removeGlobalVars,
  };
}

declare namespace self {
  export * from "self";
}