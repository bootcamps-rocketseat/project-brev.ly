import zod from "zod";

export const createLinkInput = zod.object({
  originalUrl: zod.url({
    message: "Informe uma URL válida.",
  }),
  shortenedUrl: zod
    .string()
    .min(1, {
      message: "O link encurtado é obrigatório.",
    })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "O link encurtado deve conter apenas letras, números, hífen ou underline.",
    }),
});

export type CreateLinkInput = zod.infer<typeof createLinkInput>;
