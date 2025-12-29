import * as path from "node:path";

import "@eslint/markdown";
import { Plugin } from "@eslint/core";
import { Linter } from "eslint";
import type { ConfigInitalizationOptions, Plugins } from "./types.js";
import { FlatCompat } from "@eslint/eslintrc";

const keysToRemoveIfExists: Record<keyof Linter.RulesRecord, keyof Linter.RulesRecord> = {
  "key-spacing": "@stylistic/key-spacing",
};

export default async function init(options?: ConfigInitalizationOptions): Promise<Linter.Config[]> {
  const output: Linter.Config[] = [];
  const plugins: Plugins = {
    jsPlugin: await (await import("./configs/js.ts")).default(),
    stylisticPlugin: await (await import("./configs/stylistic.ts")).default(),
    importXPlugin: await (await import("./configs/import-x.ts")).default(),
    jestPlugin: await (await import("./configs/jest.ts")).default(),
    jsxA11yPlugin: await (await import("./configs/jsx-a11y.ts")).default(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
    markdownPlugin: await (await import("./configs/markdown.ts")).default(),
    nPlugin: await (await import("./configs/n.ts")).default(),
    promisePlugin: await (await import("./configs/promise.ts")).default(),
    tsPlugin: await (await import("./configs/typescript.ts")).default(),
    unicornPlugin: await (await import("./configs/unicorn.ts")).default(),
    reactPlugin: await (await import("./configs/react.ts")).default(),
    reactHooksPlugin: await (await import("./configs/react-hooks.ts")).default(),
    reactRefreshPlugin: await (await import("./configs/react-refresh.ts")).default(),
    unusedImportsPlugin: await (await import("./configs/unused-imports.ts")).default(),
    nextPlugin: await (await import("./configs/next.ts")).default(),
    eslintCommentsPlugin: await (await import("./configs/eslint-comments.ts")).default(),
    flatGitignoreConfig: await (await import("./configs/flat-gitignore.ts")).default(),
    greasemonkeyConfig: await (await import("./configs/greasemonkey.ts")).default(),
    stylelintConfig: await (await import("./configs/stylelint.ts")).default(),
    stylelintJestConfig: await (await import("./configs/stylelint-jest.ts")).default(),
    flatConfigUtils: (await import("eslint-flat-config-utils")),
    customRules: (await import("./rules.js")).default,
    getMonkeyCodeNames: (await import("./greasemonkey.js")).getMonkeyCodeNames,
    FlatCompat: (await import("@eslint/eslintrc")).FlatCompat,
    globals: (await import("globals")),
  };

  const flatCompat = new FlatCompat({
    baseDirectory: __dirname,
  });

  if (typeof options === "function") {
    output.push(...options(plugins));
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
                  ts: plugins.tsPlugin.plugin as Plugin,
                },
              });
              break;
            case "unused-imports":
              output.push({
                plugins: {
                  "unused-imports": plugins.unusedImportsPlugin,
                },
              });
              break;
            default:
              console.warn(`Unknown plugin option ${(plugin as unknown)?.toString() ?? "unknown"} at index ${index}.`);
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
            case "flat-gitignore":
              if (typeof options.flat_gitignore_config === "object") {
                output.push(plugins.flatGitignoreConfig(options.flat_gitignore_config));
              }
              else {
                console.warn("Config key `flat_gitignore_config` supplied but `options.flat_gitignore_config` was not specified.");
              }
              break;
            case "js_all":
              output.push(plugins.jsPlugin.configs.all);
              break;
            case "js_recommended":
              output.push(plugins.jsPlugin.configs.recommended);
              break;
            case "stylistic_all":
              output.push(plugins.stylisticPlugin.configs.all);
              break;
            case "stylistic_customize":
              if (typeof options.stylistic_customize === "object") {
                output.push(plugins.stylisticPlugin.configs.customize(options.stylistic_customize));
              }
              else {
                console.warn("Config key `stylistic_customize` supplied but `options.stylistic_customize` was not specified.");
              }
              break;
            case "stylistic_disable-legacy":
              output.push(plugins.stylisticPlugin.configs["disable-legacy"]);
              break;
            case "stylistic_recommended":
              output.push(plugins.stylisticPlugin.configs.recommended);
              break;
            case "import-x_electron":
              output.push(plugins.importXPlugin.configs["flat/electron"] as Linter.Config);
              break;
            case "import-x_errors":
              output.push(plugins.importXPlugin.configs["flat/errors"] as Linter.Config);
              break;
            case "import-x_react":
              output.push(plugins.importXPlugin.configs["flat/react"] as Linter.Config);
              break;
            case "import-x_recommended":
              output.push(plugins.importXPlugin.configs["flat/recommended"] as Linter.Config);
              break;
            case "import-x_stage-0":
              output.push(plugins.importXPlugin.configs["flat/stage-0"] as Linter.Config);
              break;
            case "import-x_typescript":
              output.push(plugins.importXPlugin.configs["flat/typescript"] as Linter.Config);
              break;
            case "import-x_warnings":
              output.push(plugins.importXPlugin.configs["flat/warnings"] as Linter.Config);
              break;
            case "jest_all":
              output.push(plugins.jestPlugin.configs["flat/all"]);
              break;
            case "jest_recommended":
              output.push(plugins.jestPlugin.configs["flat/recommended"]);
              break;
            case "jest_style":
              output.push(plugins.jestPlugin.configs["flat/style"]);
              break;
            case "jsx-a11y_recommended":
              output.push(plugins.jsxA11yPlugin.flatConfigs.recommended);
              break;
            case "jsx-a11y_strict":
              output.push(plugins.jsxA11yPlugin.flatConfigs.strict);
              break;
            case "markdown_recommended":
              output.push(...plugins.markdownPlugin.configs.recommended as Linter.Config[]);
              break;
            case "markdown_processor":
              output.push(...plugins.markdownPlugin.configs.processor);
              break;
            case "n_all":
              output.push(plugins.nPlugin.configs["flat/all"]);
              break;
            case "n_mixed-esm-and-cjs":
              output.push(...plugins.nPlugin.configs["flat/mixed-esm-and-cjs"]);
              break;
            case "n_recommended":
              output.push(plugins.nPlugin.configs["flat/recommended"]);
              break;
            case "n_recommended-module":
              output.push(plugins.nPlugin.configs["flat/recommended-module"]);
              break;
            case "n_recommended-script":
              output.push(plugins.nPlugin.configs["flat/recommended-script"]);
              break;
            case "promise":
              output.push(plugins.promisePlugin.configs["flat/recommended"]);
              break;
            case "ts_all":
              output.push(...plugins.tsPlugin.configs.all as Linter.Config[]);
              break;
            case "ts_base":
              output.push(...plugins.tsPlugin.configs.base as Linter.Config[]);
              break;
            case "ts_disableTypeChecked":
              output.push(...plugins.tsPlugin.configs.disableTypeChecked as Linter.Config[]);
              break;
            case "ts_eslintRecommended":
              output.push(...plugins.tsPlugin.configs.eslintRecommended as Linter.Config[]);
              break;
            case "ts_recommended":
              output.push(...plugins.tsPlugin.configs.recommended as Linter.Config[]);
              break;
            case "ts_recommendedTypeChecked":
              output.push(...plugins.tsPlugin.configs.recommendedTypeChecked as Linter.Config[]);
              break;
            case "ts_recommendedTypeCheckedOnly":
              output.push(...plugins.tsPlugin.configs.recommendedTypeCheckedOnly as Linter.Config[]);
              break;
            case "ts_strict":
              output.push(...plugins.tsPlugin.configs.strict as Linter.Config[]);
              break;
            case "ts_strictTypeChecked":
              output.push(...plugins.tsPlugin.configs.strictTypeChecked as Linter.Config[]);
              break;
            case "ts_strictTypeCheckedOnly":
              output.push(...plugins.tsPlugin.configs.strictTypeCheckedOnly as Linter.Config[]);
              break;
            case "ts_stylistic":
              output.push(...plugins.tsPlugin.configs.stylistic as Linter.Config[]);
              break;
            case "ts_stylisticTypeChecked":
              output.push(...plugins.tsPlugin.configs.stylisticTypeChecked as Linter.Config[]);
              break;
            case "ts_stylisticTypeCheckedOnly":
              output.push(...plugins.tsPlugin.configs.stylisticTypeCheckedOnly as Linter.Config[]);
              break;
            case "unicorn_all":
              output.push(plugins.unicornPlugin.configs.all);
              break;
            case "unicorn_recommended":
              output.push(plugins.unicornPlugin.configs.recommended);
              break;
            case "unicorn_unopinionated":
              output.push(plugins.unicornPlugin.configs.unopinionated);
              break;
            case "react_all":
              output.push(plugins.reactPlugin.configs.flat.all);
              break;
            case "react_recommended":
              output.push(plugins.reactPlugin.configs.flat.recommended);
              break;
            case "react_jsx-runtime":
              output.push(...flatCompat.config(plugins.reactPlugin.configs["jsx-runtime"]));
              break;
            case "react-hooks_recommended":
              output.push(plugins.reactHooksPlugin.configs.flat.recommended);
              break;
            case "react-hooks_recommended-latest":
              output.push(plugins.reactHooksPlugin.configs.flat["recommended-latest"]);
              break;
            case "react-refresh_next":
              output.push(plugins.reactRefreshPlugin.configs.next);
              break;
            case "react-refresh_recommended":
              output.push(plugins.reactRefreshPlugin.configs.recommended);
              break;
            case "react-refresh_vite":
              output.push(plugins.reactRefreshPlugin.configs.vite);
              break;
            case "next_core-web-vitals":
              output.push(plugins.nextPlugin.configs["core-web-vitals"]);
              break;
            case "next_recommended":
              output.push(plugins.nextPlugin.configs.recommended);
              break;
            case "eslint-comments_recommended":
              output.push(plugins.eslintCommentsPlugin.configs.recommended);
              break;
            case "stylelint":
              output.push(plugins.stylelintConfig);
              break;
            case "stylelint_jest":
              output.push(plugins.stylelintJestConfig);
              break;
            default:
              console.warn(`Unknown config option ${(config as unknown)?.toString() ?? "unknown"} at index ${index}.`);
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
      const override: Linter.Config[] = options.override(output, plugins);
      output.push(...override);
    }

    if (options?.additional) {
      output.push(...options.additional);
    }
  }
  else {
    /** @type {import("eslint").Linter.Config[]} */
    output.push(
      {
        name: "Ignores",
        ignores: ["node_modules"],
      },
      plugins.jsPlugin.configs.recommended,
      ...plugins.tsPlugin.configs.recommendedTypeChecked as Linter.Config[],
      {
        name: "typescript project",
        languageOptions: {
          parserOptions: {
            projectService: true,
          },
        },
      },
      plugins.flatGitignoreConfig({
        root: true,
        strict: true,
        name: "gitignore",
      }),
      ...plugins.markdownPlugin.configs.recommended,
      plugins.stylisticPlugin.configs.customize({
        indent: 2,
        quotes: "double",
        semi: true,
        jsx: true,
      }),
      {
        name: "Jest Configs",
        files: ["test/**"],
        ...plugins.jestPlugin.configs["flat/recommended"],
        rules: {
          ...plugins.jestPlugin.configs["flat/recommended"].rules,
        },
      },
      {
        name: "All JavaScript Types",
        files: ["*.js", "*.mjs", "*.cjs", "*.ts", "*.d.ts", "*.mts"],
        languageOptions: {
          globals: {
            ...plugins.globals.builtin,
          },
        },
        plugins: {
          unicorn: plugins.unicornPlugin,
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
          ...plugins.customRules(plugins.getMonkeyCodeNames(plugins.greasemonkeyConfig.globals)),
        },
      },
      {
        name: "JavaScript Modules",
        files: ["*.js", "*.mjs"],
        languageOptions: {
          ecmaVersion: "latest",
          globals: {
            ...plugins.globals.es2021,
            ...plugins.globals.node,
            ...plugins.globals.nodeBuiltin,
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
            ...plugins.globals.es2021,
            ...plugins.globals.commonjs,
            ...plugins.globals.node,
            ...plugins.globals.nodeBuiltin,
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
            ...plugins.globals.es2021,
            ...plugins.globals.commonjs,
            ...plugins.globals.node,
            ...plugins.globals.nodeBuiltin,
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
    );
  }

  return output;
}
