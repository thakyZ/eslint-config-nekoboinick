import { serialize } from "error-serializer";
import ensureError from "ensure-error";
import type { ImportModuleSafe } from "../types.ts";

type ModuleType = typeof import("eslint-config-flat-gitignore");

/**
 * Exports the `@eslint-community/eslint-plugin-eslint-comments` config.
 *
 * @returns {Promise<ImportModuleSafe<ModuleType>>}
 */
export default async function (): Promise<ImportModuleSafe<ModuleType>> {
  try {
    const module = (await import("eslint-config-flat-gitignore"));

    if ("default" in module) {
      return module.default;
    }

    return module;
  }
  catch (error: unknown) {
    console.error(serialize(ensureError(error)));
    return {} as ImportModuleSafe<ModuleType>;
  }
}
