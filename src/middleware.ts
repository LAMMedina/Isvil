import { defineMiddleware } from "astro:middleware";
import { verifyToken } from "@lib/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, cookies, redirect } = context;

  // Verifica si la ruta actual comienza con /admin
  if (request.url.includes("/admin")) {
    const token = cookies.get("token")?.value;

    if (!token) {
      return redirect("/login?error=no_token");
    }

    try {
      const user = await verifyToken(token);
      if (user.role !== "admin") {
        return redirect("/");
      }
      // Añade el usuario a locals para que esté disponible en las rutas
      context.locals.user = user as unknown as User;
    } catch (error) {
      console.error("Token verification failed:", error);
      return redirect("/login?error=invalid_token");
    }
  }

  return next();
});