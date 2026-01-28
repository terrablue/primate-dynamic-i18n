import EditAdminI18N from "#view/EditAdminI18N";
import response from "primate/response";
import route from "primate/route";

route.get(request => response.view(EditAdminI18N, { locales: request.locales }));

route.post(async request => {
  const form = request.body.form();

  for (const locale of Object.keys(request.locales)) {
    delete request.locales[locale];
  }

  for (const [field, value] of Object.entries(form)) {
    // de-DE[switch_language][value]
    const match = field.match(/^(.+?)\[(.+?)\]\[(key|value)\]$/);
    if (!match) continue;

    const [, locale, entry_key, type] = match;

    if (type !== "value") continue;

    request.locales[locale] ??= {};
    request.locales[locale][entry_key] = value;
  }

  for (const [locale, data] of Object.entries(request.locales)) {
    await request.locale_update(locale, data);
  }

  return response.redirect(request.url);
});
