import AdminI18N from "#view/AdminI18N";
import response from "primate/response";
import route from "primate/route";

route.get(request => response.view(AdminI18N, { locales: request.locales }));
