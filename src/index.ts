import * as path from "node:path";

import { FlatCompat } from "@eslint/eslintrc";
import { Plugin } from "@eslint/core";
import { Linter } from "eslint";
import globals from "globals";
import * as flatConfigUtils from "eslint-flat-config-utils";

// #region Plugins

import jsPlugin from "@eslint/js";
import stylisticPlugin from "@stylistic/eslint-plugin";
import importXPlugin from "eslint-plugin-import-x";
import jestPlugin from "eslint-plugin-jest";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import markdownPlugin from "eslint-plugin-markdown";
import nPlugin from "eslint-plugin-n";
import promisePlugin from "eslint-plugin-promise";
import tsPlugin from "typescript-eslint";
import unicornPlugin from "eslint-plugin-unicorn";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import nextPlugin from "@next/eslint-plugin-next";
import eslintCommentsPlugin from "@eslint-community/eslint-plugin-eslint-comments";

// #endregion Plugins

// #region Configs

import flatGitignoreConfig from "eslint-config-flat-gitignore";
import greasemonkeyConfig from "eslint-config-greasemonkey";

// #endregion Configs

import customRules from "./rules.js";
import { getMonkeyCodeNames } from "./greasemonkey.js";

/** @type {import('@eslint/eslintrc').FlatCompat} */
const flatCompat: FlatCompat = new FlatCompat();

// /** @type {import('eslint').Linter.Config[]} */
// const greaseMonkey: Linter.Config[] = flatCompat.extends("greasemonkey");

/** @type {import("eslint").Linter.Config[]} */
const _default: Linter.Config[] = [
  {
    name: "Ignores",
    ignores: ["node_modules"],
  },
  jsPlugin.configs.recommended,
  ...tsPlugin.configs.recommendedTypeChecked as Linter.Config[],
  {
    name: "typescript project",
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  flatGitignoreConfig({
    root: true,
    strict: true,
    name: "gitignore",
  }),
  ...markdownPlugin.configs.recommended,
  stylisticPlugin.configs.customize({
    indent: 2,
    quotes: "double",
    semi: true,
    jsx: true,
  }),
  {
    name: "Jest Configs",
    files: ["test/**"],
    ...jestPlugin.configs["flat/recommended"],
    rules: {
      ...jestPlugin.configs["flat/recommended"].rules,
    },
  },
  {
    name: "All JavaScript Types",
    files: ["*.js", "*.mjs", "*.cjs", "*.ts", "*.d.ts", "*.mts"],
    languageOptions: {
      globals: {
        ...globals.builtin,
      },
    },
    plugins: {
      unicorn: unicornPlugin,
    },
    rules: {
      "@stylistic/key-spacing": ["error", {
        align: "value",
      }],
      "@stylistic/no-multi-spaces": ["error", {
        exceptions: {
          Property: true,
          VariableDeclarator: true,
        },
      }],
      ...customRules(getMonkeyCodeNames(greasemonkeyConfig)),
    },
  },
  {
    name: "JavaScript Modules",
    files: ["*.js", "*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.es2021,
        ...globals.node,
        ...globals.nodeBuiltin,
      },
      sourceType: "module",
      parserOptions: {
        projectService: true,
        project: path.join(__dirname, "tsconfig.json"),
      },
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
    settings: {},
    rules: {},
  },
  {
    name: "CommonJS",
    files: ["*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.es2021,
        ...globals.commonjs,
        ...globals.node,
        ...globals.nodeBuiltin,
      },
      sourceType: "commonjs",
      parserOptions: {},
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
    settings: {},
    rules: {},
  },
  {
    name: "TypeScript",
    files: ["*.ts", "*.d.ts", "*.mts"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.es2021,
        ...globals.commonjs,
        ...globals.node,
        ...globals.nodeBuiltin,
      },
      sourceType: "module",
      parserOptions: {
        projectService: true,
        project: path.join(__dirname, "tsconfig.json"),
      },
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: true,
    },
    settings: {},
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
];

interface Plugins {
  jsPlugin: typeof jsPlugin;
  stylisticPlugin: typeof stylisticPlugin;
  importXPlugin: typeof importXPlugin;
  flatConfigUtils: typeof flatConfigUtils;
  jestPlugin: typeof jestPlugin;
  jsxA11yPlugin: typeof jsxA11yPlugin;
  markdownPlugin: typeof markdownPlugin;
  nPlugin: typeof nPlugin;
  promisePlugin: typeof promisePlugin;
  tsPlugin: typeof tsPlugin;
  unicornPlugin: typeof unicornPlugin;
  reactPlugin: typeof reactPlugin;
  reactHooksPlugin: typeof reactHooksPlugin;
  reactRefreshPlugin: typeof reactRefreshPlugin;
  unusedImportsPlugin: typeof unusedImportsPlugin;
  nextPlugin: typeof nextPlugin;
  eslintCommentsPlugin: typeof eslintCommentsPlugin;
  flatGitignoreConfig: typeof flatGitignoreConfig;
  greasemonkeyConfig: typeof greasemonkeyConfig;
  customRules: typeof customRules;
  getMonkeyCodeNames: typeof getMonkeyCodeNames;
  FlatCompat: typeof FlatCompat;
  globals: typeof globals;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PLUGIN_KEYS = ["ts", "unused-imports"] as const;

type PluginKeys = typeof PLUGIN_KEYS[number];

type SetupConfigFunc = (plugins: Plugins) => Linter.Config[];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CONFIG_KEYS = [
  "js_all", "js_recommended",
  "stylistic_all", "stylistic_customize", "stylistic_disable-legacy", "stylistic_recommended", "stylistic_all-flat",
  "stylistic_recommended-flat",
  "import-x_electron", "import-x_errors", "import-x_react", "import-x_recommended", "import-x_stage-0", "import-x_typescript",
  "import-x_warnings",
  "jest_all", "jest_recommended", "jest_style",
  "jsx-a11y_recommended", "jsx-a11y_strict",
  "markdown_recommended",
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
] as const;

type ConfigKeys = typeof CONFIG_KEYS[number];

type ConfigInitalizationOptions = IConfigInitalizationOptions | SetupConfigFunc;

interface IConfigInitalizationOptions {
  plugins?: PluginKeys[];
  configs?: ConfigKeys[];
  override?: (config: Linter.Config[], plugins: Plugins) => Linter.Config[];
  additional?: Linter.Config[];
  stylistic_customize: (customize: typeof stylisticPlugin.configs.customize) => Linter.Config;
}

const keysToRemoveIfExists: Record<keyof Linter.RulesRecord, keyof Linter.RulesRecord> = {
  "key-spacing": "@stylistic/key-spacing",
}

export default function init(options?: ConfigInitalizationOptions): Linter.Config[] {
  const output: Linter.Config[] = [];
  const plugins: Plugins | undefined = typeof options === "function" || options?.override
    ? { jsPlugin, stylisticPlugin, importXPlugin, flatConfigUtils, jestPlugin,
        jsxA11yPlugin, markdownPlugin, nPlugin, promisePlugin, tsPlugin, unicornPlugin,
        reactPlugin, reactHooksPlugin, reactRefreshPlugin, unusedImportsPlugin,
        nextPlugin, eslintCommentsPlugin, flatGitignoreConfig, greasemonkeyConfig,
        customRules, getMonkeyCodeNames, FlatCompat, globals }
    : undefined;

  if (typeof options === "function") {
    output.push(...options(plugins!));
  }
  else if (options) {
    if (options?.plugins) {
      let index: number = 0;
      for (const plugin of options.plugins) {
        try {
          switch (plugin) {
            case "ts":
              output.push({
                plugins: {
                  ts: tsPlugin.plugin as Plugin,
                },
              });
              break;
            case "unused-imports":
              output.push({
                plugins: {
                  "unused-imports": unusedImportsPlugin,
                },
              });
              break;
            default:
              console.warn(`Unknown plugin option ${plugin as unknown as string} at index ${index}.`);
              break;
          }
        }
        finally {
          index++;
        }
      }
    }

    if (options?.configs) {
      let index: number = 0;
      for (const config of options.configs) {
        try {
          switch (config) {
            case "js_all":
              output.push(jsPlugin.configs.all);
              break;
            case "js_recommended":
              output.push(jsPlugin.configs.recommended);
              break;
            case "stylistic_all":
              output.push(stylisticPlugin.configs.all);
              break;
            case "stylistic_customize":
              if (typeof options.stylistic_customize === "function") {
                output.push(options.stylistic_customize(stylisticPlugin.configs.customize));
              }
              else {
                console.warn("config key `stylistic_customize` supplied but options.stylistic_customize() was not specified.");
              }
              break;
            case "stylistic_disable-legacy":
              output.push(stylisticPlugin.configs["disable-legacy"]);
              break;
            case "stylistic_recommended":
              output.push(stylisticPlugin.configs.recommended);
              break;
            case "stylistic_all-flat":
              output.push(stylisticPlugin.configs["all-flat"]);
              break;
            case "stylistic_recommended-flat":
              output.push(stylisticPlugin.configs["recommended-flat"]);
              break;
            case "import-x_electron":
              output.push(importXPlugin.configs["flat/electron"] as Linter.Config);
              break;
            case "import-x_errors":
              output.push(importXPlugin.configs["flat/errors"] as Linter.Config);
              break;
            case "import-x_react":
              output.push(importXPlugin.configs["flat/react"] as Linter.Config);
              break;
            case "import-x_recommended":
              output.push(importXPlugin.configs["flat/recommended"] as Linter.Config);
              break;
            case "import-x_stage-0":
              output.push(importXPlugin.configs["flat/stage-0"] as Linter.Config);
              break;
            case "import-x_typescript":
              output.push(importXPlugin.configs["flat/typescript"] as Linter.Config);
              break;
            case "import-x_warnings":
              output.push(importXPlugin.configs["flat/warnings"] as Linter.Config);
              break;
            case "jest_all":
              output.push(jestPlugin.configs["flat/all"]);
              break;
            case "jest_recommended":
              output.push(jestPlugin.configs["flat/recommended"]);
              break;
            case "jest_style":
              output.push(jestPlugin.configs["flat/style"]);
              break;
            case "jsx-a11y_recommended":
              output.push(...flatCompat.config(jsxA11yPlugin.configs.recommended));
              break;
            case "jsx-a11y_strict":
              output.push(...flatCompat.config(jsxA11yPlugin.configs.strict));
              break;
            case "markdown_recommended":
              output.push(...markdownPlugin.configs.recommended);
              break;
            case "n_all":
              output.push(nPlugin.configs["flat/all"]);
              break;
            case "n_mixed-esm-and-cjs":
              output.push(...nPlugin.configs["flat/mixed-esm-and-cjs"]);
              break;
            case "n_recommended":
              output.push(nPlugin.configs["flat/recommended"]);
              break;
            case "n_recommended-module":
              output.push(nPlugin.configs["flat/recommended-module"]);
              break;
            case "n_recommended-script":
              output.push(nPlugin.configs["flat/recommended-script"]);
              break;
            case "promise":
              output.push(promisePlugin.configs["flat/recommended"]);
              break;
            case "ts_all":
              output.push(...tsPlugin.configs.all as Linter.Config[]);
              break;
            case "ts_base":
              output.push(...tsPlugin.configs.base as Linter.Config[]);
              break;
            case "ts_disableTypeChecked":
              output.push(...tsPlugin.configs.disableTypeChecked as Linter.Config[]);
              break;
            case "ts_eslintRecommended":
              output.push(...tsPlugin.configs.eslintRecommended as Linter.Config[]);
              break;
            case "ts_recommended":
              output.push(...tsPlugin.configs.recommended as Linter.Config[]);
              break;
            case "ts_recommendedTypeChecked":
              output.push(...tsPlugin.configs.recommendedTypeChecked as Linter.Config[]);
              break;
            case "ts_recommendedTypeCheckedOnly":
              output.push(...tsPlugin.configs.recommendedTypeCheckedOnly as Linter.Config[]);
              break;
            case "ts_strict":
              output.push(...tsPlugin.configs.strict as Linter.Config[]);
              break;
            case "ts_strictTypeChecked":
              output.push(...tsPlugin.configs.strictTypeChecked as Linter.Config[]);
              break;
            case "ts_strictTypeCheckedOnly":
              output.push(...tsPlugin.configs.strictTypeCheckedOnly as Linter.Config[]);
              break;
            case "ts_stylistic":
              output.push(...tsPlugin.configs.stylistic as Linter.Config[]);
              break;
            case "ts_stylisticTypeChecked":
              output.push(...tsPlugin.configs.stylisticTypeChecked as Linter.Config[]);
              break;
            case "ts_stylisticTypeCheckedOnly":
              output.push(...tsPlugin.configs.stylisticTypeCheckedOnly as Linter.Config[]);
              break;
            case "unicorn_all":
              output.push(unicornPlugin.configs.all);
              break;
            case "unicorn_recommended":
              output.push(unicornPlugin.configs.recommended);
              break;
            case "unicorn_unopinionated":
              output.push(unicornPlugin.configs.unopinionated);
              break;
            case "react_all":
              output.push(reactPlugin.configs.flat.all);
              break;
            case "react_recommended":
              output.push(reactPlugin.configs.flat.recommended);
              break;
            case "react_jsx-runtime":
              output.push(...flatCompat.config(reactPlugin.configs["jsx-runtime"]));
              break;
            case "react-hooks_recommended":
              output.push(reactHooksPlugin.configs.flat.recommended);
              break;
            case "react-hooks_recommended-latest":
              output.push(reactHooksPlugin.configs.flat["recommended-latest"]);
              break;
            case "react-refresh_next":
              output.push(reactRefreshPlugin.configs.next);
              break;
            case "react-refresh_recommended":
              output.push(reactRefreshPlugin.configs.recommended);
              break;
            case "react-refresh_vite":
              output.push(reactRefreshPlugin.configs.vite);
              break;
            case "next_core-web-vitals":
              output.push(nextPlugin.configs["core-web-vitals"]);
              break;
            case "next_recommended":
              output.push(nextPlugin.configs.recommended);
              break;
            case "eslint-comments_recommended":
              output.push(eslintCommentsPlugin.configs.recommended);
              break;
            default:
              console.warn(`Unknown config option ${config as unknown as string} at index ${index}.`);
              break;
          }
        }
        finally {
          index++;
        }
      }
    }

    let index: number = 0;

    for (const entry of output) {
      for (const key of Object.keys(keysToRemoveIfExists)) {
        const value: keyof Linter.RulesRecord = keysToRemoveIfExists[key];

        if (entry.rules && value in entry.rules && key in entry.rules) {
          const value: Linter.RuleEntry<unknown[]> | undefined = entry.rules[key];

          switch (typeof value) {
            case "string":
              if (value !== "off") {
                entry.rules[key] = "off";
              }
              break;
            case "number":
              if (value !== 0) {
                entry.rules[key] = 0;
              }
              break;
            case "object":
              if (Array.isArray(value) && value.length >= 1) {
                switch (typeof value[0]) {
                  case "string":
                    if (value[0] !== "off") {
                      entry.rules[key] = "off";
                    }
                    break;
                  case "number":
                    if (value[0] !== 0) {
                      entry.rules[key] = 0;
                    }
                    break;
                  default:
                    console.warn(`Expected rule severity for rule '${key}' in entry ${entry.name ? `named '${entry.name}'` : `at index ${index}`} to be a String or Number but got a ${typeof value[0]} instead.`);
                    break;
                }
              }
              else {
                console.warn(`Expected rule severity for rule '${key}' in entry ${entry.name ? `named '${entry.name}'` : `at index ${index}`} to be an Array but got an Object instead.`);
              }
              break;
            default:
              console.warn(`Expected rule severity for rule '${key}' in entry ${entry.name ? `named '${entry.name}'` : `at index ${index}`} to be a String, Number, or Array but got a ${typeof value} instead.`);
              break;
          }
        }
      }

      index++;
    }

    if (options?.override) {
      const override: Linter.Config[] = options.override(output, plugins!);
      output.push(...override);
    }

    if (options?.additional) {
      output.push(...options.additional);
    }
  }
  else {
    output.push(..._default);
  }

  return output;
}
