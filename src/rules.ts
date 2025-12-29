import type { Linter } from "eslint";
import type { getMonkeyCodeNames } from "./greasemonkey.ts";

/**
 * Gets the custom rules for this config.
 *
 * @param {ReturnType<typeof import('./greasemonkey.ts').getMoneyCodeNames>} callback
 * @returns {import('eslint').Linter.RulesRecord}
 */
export default function customRules(callback: ReturnType<typeof getMonkeyCodeNames>): Linter.RulesRecord {
  return {
    "@stylistic/comma-dangle": ["error", "always-multiline"],
    "for-direction": "error",
    "getter-return": "error",
    "no-async-promise-executor": "error",
    "no-await-in-loop": "error",
    "no-compare-neg-zero": "error",
    "no-cond-assign": "error",
    "no-constant-condition": "error",
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-dupe-args": "error",
    "no-dupe-else-if": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty-character-class": "error",
    "no-empty": ["error", {
      allowEmptyCatch: true,
    }],
    "no-empty-static-block": "error",
    "no-ex-assign": "error",
    "no-extra-boolean-cast": "error",
    // Disabled because of https://github.com/eslint/eslint/issues/6028
    "@stylistic/no-extra-parens": ["error", "all", {
      conditionalAssign: false,
      nestedBinaryExpressions: false,
      ignoreJSX: "multi-line",
    }],
    "@stylistic/no-extra-semi": "error",
    "no-func-assign": "error",
    "no-import-assign": "error",
    "no-inner-declarations": "error",
    "no-invalid-regexp": "error",
    "no-irregular-whitespace": "error",
    "no-loss-of-precision": "error",
    "no-misleading-character-class": "error",
    "no-obj-calls": "error",
    "no-promise-executor-return": "error",
    "no-prototype-builtins": "error",
    "no-regex-spaces": "error",
    "no-setter-return": "error",
    "no-sparse-arrays": "error",
    "no-template-curly-in-string": "error",
    "no-unreachable": "error",
    "no-unreachable-loop": "error",
    "no-unsafe-finally": "error",
    "no-unsafe-negation": ["error", {
      enforceForOrderingRelations: true,
    }],
    "no-unsafe-optional-chaining": ["error", {
      disallowArithmeticOperators: true,
    }],
    "no-useless-backreference": "error",
    "use-isnan": "error",
    "valid-typeof": ["error", {
      requireStringLiterals: false,
    }],
    "no-unexpected-multiline": "error",
    "accessor-pairs": ["error", {
      enforceForClassMembers: true,
    }],
    "array-callback-return": ["error", {
      allowImplicit: true,
    }],
    "block-scoped-var": "error",
    complexity: "warn",
    curly: "error",
    "default-case": "error",
    "default-case-last": "error",
    "dot-notation": "error",
    "@stylistic/dot-location": ["error", "property"],
    eqeqeq: "error",
    "grouped-accessor-pairs": ["error", "getBeforeSet"],
    "guard-for-in": "error",
    "no-alert": "error",
    "no-caller": "error",
    "no-case-declarations": "error",
    "no-constructor-return": "error",
    "no-else-return": ["error", {
      allowElseIf: false,
    }],
    "no-empty-pattern": "error",
    "no-eq-null": "error",
    "no-eval": "error",
    "no-extend-native": ["error", {
      exceptions: ["Object", "String"],
    }],
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-fallthrough": "error",
    "@stylistic/no-floating-decimal": "error",
    "no-global-assign": "error",
    "no-implicit-coercion": "error",
    "no-implicit-globals": "error",
    "no-implied-eval": "error",
    "no-iterator": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "@stylistic/no-multi-spaces": "error",
    "no-multi-str": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-nonoctal-decimal-escape": "error",
    "no-new": "error",
    "no-octal-escape": "error",
    "no-octal": "error",
    "no-proto": "error",
    "no-redeclare": "off",
    "no-return-assign": ["error", "always"],
    // "no-return-await": "error",
    "no-script-url": "error",
    "no-self-assign": ["error", {
      props: true,
    }],
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-throw-literal": "error",
    "no-unmodified-loop-condition": "error",
    "no-unused-expressions": ["error", {
      enforceForJSX: true,
    }],
    "no-unused-labels": "error",
    "no-useless-call": "error",
    "no-useless-catch": "error",
    "no-useless-concat": "error",
    "no-useless-escape": "error",
    "no-useless-return": "error",
    "no-void": "error",
    "no-warning-comments": "warn",
    "no-with": "error",

    // Disabled for now as Firefox doesn't support named capture groups and I"m tired of getting issues about the use of named capture groups...
    "prefer-named-capture-group": "error",

    "prefer-promise-reject-errors": ["error", {
      allowEmptyReject: true,
    }],
    "prefer-regex-literals": ["error", {
      disallowRedundantWrapping: true,
    }],
    radix: "error",

    // Disabled for now as it causes too much churn
    // TODO: Enable it in the future when I have time to deal with
    // the churn and the rule is stable and has an autofixer.
    // Still doesn't have a fixer as of ESLint 7.24.0.
    "require-unicode-regexp": "error",

    "@stylistic/wrap-iife": ["error", "inside", {
      functionPrototypeMethods: true,
    }],
    yoda: "error",
    "no-delete-var": "error",
    "no-label-var": "error",
    "no-restricted-globals": ["error", "event"],
    "no-shadow-restricted-names": "error",
    "no-undef-init": "error",
    "no-undef": ["error", {
      typeof: true,
    }],
    "no-unused-vars": ["error", {
      vars: "all",
      args: "after-used",
      ignoreRestSiblings: true,
      argsIgnorePattern: /^_/u.source,
      caughtErrors: "all",
      caughtErrorsIgnorePattern: /^_$/u.source,
    }],
    "n/no-deprecated-api": "error",
    "no-restricted-imports": ["error", "domain", "freelist", "smalloc", "punycode", "sys", "querystring", "colors"],
    "@stylistic/array-bracket-newline": ["error", "consistent"],
    "@stylistic/array-bracket-spacing": ["error", "never"],
    "@stylistic/array-element-newline": ["error", "consistent"],
    "@stylistic/brace-style": ["error", "1tbs", {
      allowSingleLine: true,
    }],
    camelcase: ["error", {
      properties: "never",
      ignoreDestructuring: true,
      ignoreGlobals: true,
      allow: [
        /\b\w+GM_\w+\b/u.source,
      ],
    }],
    "capitalized-comments": ["error", "always", {
      // You can also ignore this rule by wrapping the first word in quotes.
      // c8 => https://github.com/bcoe/c8
      ignorePattern: /pragma|ignore|prettier-ignore|webpack\w+:|c8|type-coverage:|cSpell:/u.source,
      ignoreInlineComments: true,
      ignoreConsecutiveComments: true,
    }],
    "@stylistic/comma-spacing": ["error", {
      before: false,
      after: true,
    }],
    "@stylistic/comma-style": ["error", "last"],
    "@stylistic/computed-property-spacing": ["error", "never", {
      enforceForClassMembers: true,
    }],
    "@stylistic/eol-last": "error",
    "@stylistic/function-call-spacing": ["error", "never"],
    "func-name-matching": ["error", {
      considerPropertyDescriptor: true,
    }],
    "func-names": ["error", "never"],
    "@stylistic/function-call-argument-newline": ["error", "consistent"],
    "@stylistic/indent": ["error", 2, {
      SwitchCase: 1,
    }],
    "@stylistic/jsx-quotes": ["error", "prefer-double"],
    "@stylistic/key-spacing": ["error", {
      beforeColon: false,
      afterColon: true,
    }],
    "@stylistic/keyword-spacing": "error",
    "@stylistic/linebreak-style": ["off", "unix"],
    "@stylistic/lines-between-class-members": ["error", "always", {
      // Workaround to allow class fields to not have lines between them.
      // TODO: Get ESLint to add an option to ignore class fields.
      exceptAfterSingleLine: true,
    }],

    // TODO: Enable this again when targeting Node.js 16.
    "logical-assignment-operators": ["error", "always", {
      enforceForIfStatements: true,
    }],

    "max-depth": "warn",
    "max-nested-callbacks": ["warn", 4],
    "max-params": ["warn", {
      max: 4,
    }],
    "@stylistic/max-statements-per-line": "off",
    "new-cap": ["error", {
      newIsCap: true,
      capIsNew: true,
      capIsNewExceptionPattern: "^GM_[a-zA-Z]+\\b",
      newIsCapExceptionPattern: "^GM_[a-zA-Z]+\\b",
      capIsNewExceptions: callback("array").flatMap((x) => x),
      newIsCapExceptions: callback("array").flatMap((x) => x),
    }],
    "@stylistic/new-parens": "error",
    "no-array-constructor": "error",
    "no-bitwise": "error",
    "no-lonely-if": "error",
    "@stylistic/no-mixed-operators": "error",
    "@stylistic/no-mixed-spaces-and-tabs": "error",
    "no-multi-assign": "off",
    "@stylistic/no-multiple-empty-lines": ["error", {
      max: 1,
    }],
    "no-negated-condition": "error",
    "no-object-constructor": "error",
    "@stylistic/no-whitespace-before-property": "error",
    "@stylistic/no-trailing-spaces": "error",
    "no-unneeded-ternary": "error",
    "@stylistic/object-curly-spacing": ["error", "always"],

    // Disabled because of https://github.com/xojs/eslint-config-xo/issues/27
    "@stylistic/object-property-newline": "error",

    "one-var": ["error", "never"],
    "@stylistic/one-var-declaration-per-line": "error",
    "operator-assignment": ["error", "always"],
    "@stylistic/operator-linebreak": ["error", "before"],
    "@stylistic/padded-blocks": ["error", "never", {
      allowSingleLineBlocks: false,
    }],
    "@stylistic/padding-line-between-statements": ["error", {
      blankLine: "always",
      prev: "multiline-block-like",
      next: "*",
    }],
    "prefer-exponentiation-operator": "error",
    "prefer-object-spread": "error",
    "@stylistic/quote-props": ["error", "as-needed"],
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/semi-spacing": ["error", {
      before: false,
      after: true,
    }],
    "@stylistic/semi-style": ["error", "last"],
    "@stylistic/semi": ["error", "always"],
    "@stylistic/space-before-blocks": ["error", "always"],
    "@stylistic/space-before-function-paren": ["error", {
      anonymous: "always",
      named: "never",
      asyncArrow: "always",
    }],
    "@stylistic/space-in-parens": ["error", "never"],
    "@stylistic/space-infix-ops": "error",
    "@stylistic/space-unary-ops": "error",
    "@stylistic/spaced-comment": ["error", "always", {
      line: {
        exceptions: ["-", "+", "*"],
        markers: ["!", "/", "=>", "#region", "#endregion", "@ts-check"],
      },
      block: {
        exceptions: ["-", "+", "*"],
        markers: ["!", "*"],
        balanced: true,
      },
    }],
    "@stylistic/switch-colon-spacing": ["error", {
      after: true,
      before: false,
    }],
    "@stylistic/template-tag-spacing": ["error", "never"],
    "unicode-bom": ["error", "never"],
    "arrow-body-style": "error",
    "@stylistic/arrow-parens": ["error", "always"],
    "@stylistic/arrow-spacing": ["error", {
      before: true,
      after: true,
    }],
    "constructor-super": "error",
    "@stylistic/generator-star-spacing": ["error", "both"],
    "no-class-assign": "error",
    "no-const-assign": "error",
    "no-constant-binary-expression": "error",
    "no-dupe-class-members": "error",
    "no-new-native-nonconstructor": "error",
    "no-this-before-super": "error",
    "no-useless-computed-key": ["error", {
      enforceForClassMembers: true,
    }],
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "object-shorthand": ["error", "always", {
      avoidExplicitReturnArrows: true,
    }],
    "prefer-arrow-callback": ["error", {
      allowNamedFunctions: true,
      allowUnboundThis: true,
    }],
    "prefer-const": ["error", {
      destructuring: "all",
    }],
    "prefer-destructuring": ["error", {
      // `array` is disabled because it forces destructuring on
      // stupid stuff like `foo.bar = process.argv[2];`
      // TODO: Open ESLint issue about this
      VariableDeclarator: {
        array: false,
        object: true,
      },
      AssignmentExpression: {
        array: false,

        // Disabled because object assignment destructuring requires parens wrapping:
        // `let foo; ({foo} = object);`
        object: false,
      },
    }, {
      enforceForRenamedProperties: false,
    }],
    "prefer-numeric-literals": "error",
    "prefer-object-has-own": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "require-yield": "error",
    "@stylistic/rest-spread-spacing": ["error", "never"],
    "symbol-description": "error",
    "@stylistic/template-curly-spacing": "error",
    "@stylistic/yield-star-spacing": ["error", "both"],
    "vue/array-element-newline": "off",
    "jsdoc/no-types": "off",
    "jsdoc/tag-lines": ["error", "any", {
      startLines: 1,
    }],
    "n/no-unpublished-import": ["error", {
      ignoreTypeImport: true,
      allowModules: [
        "eslint",
      ],
    }],
    "n/no-extraneous-import": ["error", {
      allowModules: [
        "@eslint/core",
        "@eslint/eslintrc",
      ],
    }],
    "n/no-missing-import": ["error", {
      ignoreTypeImport: true,
    }],
  };
}

// /** @type {string[]} */
// const removableGlobalVars: string[] = ["$"] as const;

// /**
//  *
//  *
//  * @param {keyof import("eslint").Linter.Globals} name Name of the global property to remove.
//  * @param {import("eslint").Linter.Globals} global Object containing the global variables.
//  * @returns {import("eslint").Linter.Globals}
//  */
// function removeGlobalVars(name: keyof Linter.Globals, global: Linter.Globals): Linter.Globals {
//   /** @type {Linter.Globals} */
//   let temp: Linter.Globals = global;

//   if (typeof global === "object" && !Array.isArray(global)) {
//     for (const removeThis of removableGlobalVars) {
//       temp = Object.assign<Linter.Globals, Linter.Globals>(
//         {},
//         Object.fromEntries<Linter.Globals>(
//           Object.entries<Linter.Globals>(temp)
//             .map<Entry<Linter.Globals>>(
//               /**
//                * @param {import("type-fest").Entry<Linter.Globals>} param0
//                * @returns {import("type-fest").Entry<Linter.Globals> | null}
//                */
//               ([key, value]: Entry<Linter.Globals>): Entry<Linter.Globals> | null => {
//                 if (key === removeThis) {
//                   if (typeof value === "boolean") {
//                     return [key, false];
//                   }

//                   return null;
//                 }

//                 return [key, value];
//               },
//             )
//             .filter(
//               /**
//                * @param {import("type-fest").Entry<Linter.Globals>} entry
//                * @returns {boolean}
//                */
//               (entry: Entry<Linter.Globals> | null): boolean => entry !== null,
//             ),
//         ),
//       );
//     }
//   }
//   else if (typeof global === "object" && Array.isArray(global)) {
//     for (const removeThis of removableGlobalVars) {
//       temp = Object.fromEntries<Linter.Globals>((global as Entries<Linter.Globals>).filter(
//         /**
//          * @param {import("type-fest").Entry<Linter.Globals>} entry
//          * @returns {boolean}
//          */
//         (entry: Entry<Linter.Globals>): boolean => {
//           if (typeof entry === "object" && Array.isArray(entry)) {
//             return entry[0] !== removeThis;
//           }

//           if (typeof entry === "string") {
//             return entry !== removeThis;
//           }

//           return false;
//         },
//       ));
//     }
//   }
//   else if (global === undefined) {
//     console.error(new Error(`Argument global of property ${name} is 'undefined'.`));

//     return global;
//   }
//   else {
//     console.warn(`Argument global of property ${name} is not a type of 'object' or 'array' but is instead a '${typeof global}'.`);

//     return global;
//   }

//   return temp;
// }
