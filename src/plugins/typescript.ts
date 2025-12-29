import { serialize } from "error-serializer";
import ensureError from "ensure-error";
import type { ImportValue } from "../types.ts";

type ModuleType = typeof import("typescript-eslint");

export default (
  /**
   * Exports the `typescript-eslint` plguin.
   *
   * @returns {Promise<ImportValue<ModuleType, "plugin">>}
   */
  async function (): Promise<ImportValue<ModuleType, "plugin">> {
    try {
      return (await import("typescript-eslint")).plugin;
    }
    catch (error: unknown) {
      console.error(serialize(ensureError(error)));
      return {} as ImportValue<ModuleType, "plugin">;
    }
  }
)();
