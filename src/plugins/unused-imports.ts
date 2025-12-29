import { serialize } from "error-serializer";
import ensureError from "ensure-error";
import type { ImportValue } from "../types.ts";

type ModuleType = typeof import("eslint-plugin-unused-imports");

export default (
  /**
   * Exports the `eslint-plugin-unused-imports` plguin.
   *
   * @returns {Promise<ImportValue<ModuleType, "default">>}
   */
  async function (): Promise<ImportValue<ModuleType, "default">> {
    try {
      return (await import("eslint-plugin-unused-imports")).default;
    }
    catch (error: unknown) {
      console.error(serialize(ensureError(error)));
      return {} as ImportValue<ModuleType, "default">;
    }
  }
)();
