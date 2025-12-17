import * as path from "node:path";

import { FlatCompat } from "@eslint/eslintrc";
import { Linter } from "eslint";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import js from "@eslint/js";
import ts from "typescript-eslint";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";
import md from "eslint-plugin-markdown";
import jest from "eslint-plugin-jest";

import customRules from "./rules.js";
import { getMonkeyCodeNames } from "./greasemonkey.js";

/** @type {import('@eslint/eslintrc').FlatCompat} */
const flatCompat: FlatCompat = new FlatCompat();

/** @type {import('eslint').Linter.Config<import('eslint').Linter.RulesRecord>[]} */
const greaseMonkey: Linter.Config<Linter.RulesRecord>[] = flatCompat.extends("greasemonkey");

/** @type {import("eslint").Linter.Config<import("eslint").Linter.RulesRecord>[]} */
const _default: Linter.Config<Linter.RulesRecord>[] = [
  {
    name: "Ignores",
    ignores: ["node_modules"]
  },
  js.configs.recommended,
  ts.configs.recommendedTypeChecked as Linter.Config<Linter.RulesRecord>,
  ...md.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    quotes: "double",
    semi: true,
    jsx: true,
  }),
  {
    name: "Jest Configs",
    files: ["test/**"],
    ...jest.configs["flat/recommended"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
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
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      "@stylistic/key-spacing": ["error", {
        align: "value",
      }],
      "@stylistic/no-multi-spaces": ["error", {
        exceptions: {
          Property:           true,
          VariableDeclarator: true,
        },
      }],
      ...customRules(getMonkeyCodeNames(greaseMonkey)),
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
        project: path.join(__dirname, "tsconfig.json")
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

export default _default;
