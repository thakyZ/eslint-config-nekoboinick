declare module "eslint-config-stylelint" {
  import type { Linter } from "eslint";

  declare const stylelintConfig: Linter.Config;

  export = stylelintConfig;
}

declare module "eslint-config-stylelint/jest" {
  import type { Linter } from "eslint";

  const stylelintJestConfig: Linter.Config;

  export = stylelintJestConfig;
}
