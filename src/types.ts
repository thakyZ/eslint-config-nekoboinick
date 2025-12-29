import type { StylisticCustomizeOptions } from "@stylistic/eslint-plugin";
import type { Linter } from "eslint";
import type { FlatGitignoreOptions } from "eslint-config-flat-gitignore";
import type { Get, LiteralUnion, Paths } from "type-fest";

import { default as jsPlugin } from "@eslint/js";
import { default as stylisticPlugin } from "@stylistic/eslint-plugin";
import { default as importXPlugin } from "eslint-plugin-import-x";
import { default as jestPlugin } from "eslint-plugin-jest";
import { default as jsxA11yPlugin } from "eslint-plugin-jsx-a11y";
import { default as markdownPlugin } from "@eslint/markdown";
import { default as nPlugin } from "eslint-plugin-n";
import { default as promisePlugin } from "eslint-plugin-promise";
import { default as tsPlugin, config as tsConfigInit } from "typescript-eslint";
import { default as unicornPlugin } from "eslint-plugin-unicorn";
import { default as reactPlugin } from "eslint-plugin-react";
import { default as reactHooksPlugin } from "eslint-plugin-react-hooks";
import { default as reactRefreshPlugin } from "eslint-plugin-react-refresh";
import { default as unusedImportsPlugin } from "eslint-plugin-unused-imports";
import { default as nextPlugin } from "@next/eslint-plugin-next";
import { default as eslintCommentsPlugin } from "@eslint-community/eslint-plugin-eslint-comments";
import { default as flatGitignoreConfig } from "eslint-config-flat-gitignore";
import { default as greasemonkeyConfig } from "eslint-config-greasemonkey";
import { default as stylelintConfig } from "eslint-config-stylelint";
import { default as stylelintJestConfig } from "eslint-config-stylelint/jest";
import { default as jsoncPlugin } from "eslint-plugin-jsonc";
import { default as jsdocPlugin } from "eslint-plugin-jsdoc";
import { default as customRules } from "./rules.ts";
import { getMonkeyCodeNames } from "./greasemonkey.ts";
import * as flatConfigUtils from "eslint-flat-config-utils";
import { FlatCompat } from "@eslint/eslintrc";
import { default as globals } from "globals";

export interface Plugins {
  readonly jsPlugin: typeof jsPlugin;
  readonly stylisticPlugin: typeof stylisticPlugin;
  readonly importXPlugin: typeof importXPlugin;
  readonly jestPlugin: typeof jestPlugin;
  readonly jsxA11yPlugin: typeof jsxA11yPlugin;
  readonly markdownPlugin: typeof markdownPlugin;
  readonly nPlugin: typeof nPlugin;
  readonly promisePlugin: typeof promisePlugin;
  readonly tsPlugin: typeof tsPlugin.default;
  readonly unicornPlugin: typeof unicornPlugin;
  readonly reactPlugin: typeof reactPlugin;
  readonly reactHooksPlugin: typeof reactHooksPlugin;
  readonly reactRefreshPlugin: typeof reactRefreshPlugin;
  readonly unusedImportsPlugin: typeof unusedImportsPlugin;
  readonly nextPlugin: typeof nextPlugin.default;
  readonly eslintCommentsPlugin: typeof eslintCommentsPlugin;
  readonly flatGitignoreConfig: typeof flatGitignoreConfig;
  readonly greasemonkeyConfig: typeof greasemonkeyConfig;
  readonly stylelintConfig: typeof stylelintConfig;
  readonly stylelintJestConfig: typeof stylelintJestConfig;
  readonly jsoncPlugin: typeof jsoncPlugin;
  readonly jsdocPlugin: typeof jsdocPlugin;
  readonly customRules: typeof customRules;
  readonly getMonkeyCodeNames: typeof getMonkeyCodeNames;
  readonly flatConfigUtils: typeof flatConfigUtils;
  readonly FlatCompat: typeof FlatCompat;
  readonly tsConfigInit: typeof tsConfigInit;
  readonly globals: typeof globals;
}

const PLUGIN_KEYS = ["ts", "unused-imports"] as const; // eslint-disable-line @typescript-eslint/no-unused-vars

export type PluginKeys = typeof PLUGIN_KEYS[number];

export type SetupConfigFunc = (plugins: Plugins) => Linter.Config[]; // eslint-disable-line no-unused-vars

export type ConfigKeys = Exclude<
  | `js_${keyof typeof jsPlugin.configs}`
  | `stylistic_${keyof typeof stylisticPlugin.configs}`
  | `import-x_${keyof typeof importXPlugin.flatConfigs}`
  | `jest_${keyof typeof jestPlugin.configs}`
  | `jsx-a11y_${keyof typeof jsxA11yPlugin.flatConfigs}`
  | `markdown_${keyof typeof markdownPlugin.configs}`
  | `n_${keyof typeof nPlugin.configs}`
  | `promise_${keyof typeof promisePlugin.configs}`
  | `ts_${keyof typeof tsPlugin.configs}`
  | `unicorn_${keyof typeof unicornPlugin.configs}`
  | `react_${keyof typeof reactPlugin.configs}`
  | `react-hooks_${keyof typeof reactHooksPlugin.configs}`
  | `react-refresh_${keyof typeof reactRefreshPlugin.configs}`
  | `next_${keyof typeof nextPlugin.configs}`
  | `eslint-comments_${keyof typeof eslintCommentsPlugin.configs}`
  | `jsonc_${keyof typeof jsoncPlugin.configs}`
  | `jsdoc_${keyof typeof jsdocPlugin.configs}`
  | "stylelint"
  | "stylelint_jest"
  | "flat-gitignore"
  | "greasemonkey",
  `${string}flat/${string}` | "jsonc_auto-config" | `${string}legacy` | `${string}_flat`
>;

export type ConfigInitializationOptions = IConfigInitializationOptions | SetupConfigFunc;

export interface IConfigInitializationOptions {
  plugins?: PluginKeys[];
  configs?: ConfigKeys[];
  // eslint-disable-next-line no-unused-vars
  override?: (config: Linter.Config[], plugins: Plugins) => Linter.Config[];
  additional?: Linter.Config[];
  stylistic_customize?: StylisticCustomizeOptions;
  flat_gitignore_config?: FlatGitignoreOptions;
}

// #region From type-fest Internals

type _LiteralStringUnion<T> = LiteralUnion<T, string>;

/**
 * Return a string representation of the given string or number.
 *
 * Note: This type is not the return type of the `.toString()` function.
 */
type ToString<T> = T extends string | number ? `${T}` : never;

// #endregion From type-fest Internals

export type ImportValue<
  Module,
  Path extends
  | readonly string[]
  | _LiteralStringUnion<ToString<Paths<Module, {
    bracketNotation: false;
    maxRecursionDepth: 2;
  }> | Paths<Module, {
    bracketNotation: true;
    maxRecursionDepth: 2;
  }>>>,
> = Get<Awaited<Module>, Path>;

export type ImportModuleSafe<Module> = Awaited<Module> extends { default: Get<Awaited<Module>, "default"> }
  ? Get<Awaited<Module>, "default">
  : Awaited<Module>;
