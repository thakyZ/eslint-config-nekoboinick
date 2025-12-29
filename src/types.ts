import type { StylisticCustomizeOptions } from "@stylistic/eslint-plugin";
import type { Linter } from "eslint";
import type { FlatGitignoreOptions } from "eslint-config-flat-gitignore";
import type { Get, LiteralUnion, Paths } from "type-fest";

export interface Plugins {
  readonly jsPlugin: ImportModuleSafe<typeof import("@eslint/js")>;
  readonly stylisticPlugin: ImportModuleSafe<typeof import("@stylistic/eslint-plugin")>;
  readonly importXPlugin: ImportModuleSafe<typeof import("eslint-plugin-import-x")>;
  readonly flatConfigUtils: ImportModuleSafe<typeof import("eslint-flat-config-utils")>;
  readonly jestPlugin: ImportModuleSafe<typeof import("eslint-plugin-jest")>;
  readonly jsxA11yPlugin: ImportModuleSafe<typeof import("eslint-plugin-jsx-a11y")>;
  readonly markdownPlugin: ImportModuleSafe<typeof import("@eslint/markdown")>;
  readonly nPlugin: ImportModuleSafe<typeof import("eslint-plugin-n")>;
  readonly promisePlugin: ImportModuleSafe<typeof import("eslint-plugin-promise")>;
  readonly tsPlugin: ImportModuleSafe<typeof import("typescript-eslint")>;
  readonly unicornPlugin: ImportModuleSafe<typeof import("eslint-plugin-unicorn")>;
  readonly reactPlugin: ImportModuleSafe<typeof import("eslint-plugin-react")>;
  readonly reactHooksPlugin: ImportModuleSafe<typeof import("eslint-plugin-react-hooks")>;
  readonly reactRefreshPlugin: ImportModuleSafe<typeof import("eslint-plugin-react-refresh")>;
  readonly unusedImportsPlugin: ImportModuleSafe<typeof import("eslint-plugin-unused-imports")>;
  readonly nextPlugin: ImportModuleSafe<typeof import("@next/eslint-plugin-next")>;
  readonly eslintCommentsPlugin: ImportModuleSafe<typeof import("@eslint-community/eslint-plugin-eslint-comments")>;
  readonly flatGitignoreConfig: ImportModuleSafe<typeof import("eslint-config-flat-gitignore")>;
  readonly greasemonkeyConfig: ImportModuleSafe<typeof import("eslint-config-greasemonkey")>;
  readonly stylelintConfig: ImportModuleSafe<typeof import("eslint-config-stylelint")>;
  readonly stylelintJestConfig: ImportModuleSafe<typeof import("eslint-config-stylelint/jest")>;
  readonly customRules: ImportModuleSafe<typeof import("./rules.js")>;
  readonly getMonkeyCodeNames: ImportModuleSafe<typeof import("./greasemonkey.js")>["getMonkeyCodeNames"];
  readonly FlatCompat: ImportModuleSafe<typeof import("@eslint/eslintrc")>["FlatCompat"];
  readonly globals: ImportModuleSafe<typeof import("globals")>;
}

const PLUGIN_KEYS = ["ts", "unused-imports"] as const; // eslint-disable-line @typescript-eslint/no-unused-vars

export type PluginKeys = typeof PLUGIN_KEYS[number];

export type SetupConfigFunc = (plugins: Plugins) => Linter.Config[];

const CONFIG_KEYS = [ // eslint-disable-line @typescript-eslint/no-unused-vars
  "js_all", "js_recommended",
  "stylistic_all", "stylistic_customize", "stylistic_disable-legacy", "stylistic_recommended",
  "import-x_electron", "import-x_errors", "import-x_react", "import-x_recommended", "import-x_stage-0", "import-x_typescript",
  "import-x_warnings",
  "jest_all", "jest_recommended", "jest_style",
  "jsx-a11y_recommended", "jsx-a11y_strict",
  "markdown_recommended", "markdown_processor",
  "n_all", "n_mixed-esm-and-cjs", "n_recommended", "n_recommended-module", "n_recommended-script",
  "promise",
  "ts_all", "ts_base", "ts_disableTypeChecked", "ts_eslintRecommended", "ts_recommended", "ts_recommendedTypeChecked",
  "ts_recommendedTypeCheckedOnly", "ts_strict", "ts_strictTypeChecked", "ts_strictTypeCheckedOnly", "ts_stylistic",
  "ts_stylisticTypeChecked", "ts_stylisticTypeCheckedOnly",
  "unicorn_unopinionated", "unicorn_all", "unicorn_recommended",
  "react_all", "react_jsx-runtime", "react_recommended",
  "react-hooks_recommended", "react-hooks_recommended-latest",
  "react-refresh_next", "react-refresh_recommended", "react-refresh_vite",
  "react-refresh_next", "react-refresh_recommended", "react-refresh_vite",
  "next_core-web-vitals", "next_recommended",
  "eslint-comments_recommended",
  "stylelint", "stylelint_jest",
  "flat-gitignore",
] as const;

export type ConfigKeys = typeof CONFIG_KEYS[number];

export type ConfigInitalizationOptions = IConfigInitalizationOptions | SetupConfigFunc;

export interface IConfigInitalizationOptions {
  plugins?: PluginKeys[];
  configs?: ConfigKeys[];
  override?: (config: Linter.Config[], plugins: Plugins) => Linter.Config[];
  additional?: Linter.Config[];
  stylistic_customize: StylisticCustomizeOptions;
  flat_gitignore_config: FlatGitignoreOptions;
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
  | _LiteralStringUnion<ToString<Paths<Module, { bracketNotation: false; maxRecursionDepth: 2 }> | Paths<Module, {
    bracketNotation: true;
    maxRecursionDepth: 2;
  }>>>,
> = Get<Awaited<Module>, Path>;

export type ImportModuleSafe<Module> = Awaited<Module> extends { default: Get<Awaited<Module>, "default"> }
  ? Get<Awaited<Module>, "default">
  : Awaited<Module>;
