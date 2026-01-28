import react from "@primate/react";
import config from "primate/config";
import FileRef from "primate/runtime/FileRef";
import I18N from "./I18N.ts";

export default config({
  modules: [
    new I18N(FileRef.join(import.meta.dirname as any, "../locales")),
    react()
  ],
});
