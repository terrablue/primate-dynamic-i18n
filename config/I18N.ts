import type App from "@primate/core/App";
import type Next from "@primate/core/Next";
import type NextRoute from "@primate/core/NextRoute";
import type RequestFacade from "@primate/core/request/RequestFacade";
import Module from "primate/Module";
import FileRef from "primate/runtime/FileRef";

export default class I18NModule extends Module {
  name = "i18n-over-db";
  #directory: FileRef;
  #locales!: string[];
  #data!: Record<string, Record<string, string>>;

  constructor(directory: FileRef) {
    super();
    this.#directory = directory;
  }

  async init<T extends App>(app: T, next: Next<T>) {
    const files = await this.#directory.collect(f => f.isFile());

    this.#locales = files.map((f) => f.name);
    this.#data = Object.fromEntries(
      await Promise.all(
        files.map(async (f) => [f.base, await f.import("default")]),
      ),
    );
    console.log(this.#data);

    return next(app);
  }

  async write(locale: string, data: any) {
    await this.#directory.join(locale).write(`
      import locale from "primate/i18n/locale";

      export default locale({
        ${JSON.stringify(data)}
      });
    `);
  }

  route(request: RequestFacade, next: NextRoute) {
    return next({
      ...request,
      locales: this.#data,
      locale_update: this.write.bind(this),
    });
  }
}
