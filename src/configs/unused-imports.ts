import { serialize } from "error-serializer";
import ensureError from "ensure-error";
import type { ImportModuleSafe } from "../types.ts";

type ModuleType = typeof import("eslint-plugin-unused-imports");

/**
 * Exports the `eslint-plugin-unused-imports` config.
 *
 * @returns {Promise<ImportModuleSafe<ModuleType>>}
 */
export default async function (): Promise<ImportModuleSafe<ModuleType>> {
  try {
    const module = (await import("eslint-plugin-unused-imports"));

    if ("default" in module) {
      return module.default;
    }

    return module;
  }
  catch (error: unknown) {
    console.error(serialize(ensureError(error)));
    return {};
  }
}
