import zod from "zod";

export const envConfig = zod.object({
  VITE_FRONTEND_URL: zod.url(),
  VITE_BACKEND_URL: zod.url(),
});

export const env = envConfig.parse(import.meta.env);
