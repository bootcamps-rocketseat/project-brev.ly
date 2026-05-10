import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { services } from "@/services";
import { env } from "@/env";
import { LinkType } from "@/types";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

const newFormLinkSchema = zod.object({
  originalUrl: zod.url("Informe uma url válida"),
  shortenedUrl: zod
    .string()
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Informe uma url minúscula e sem espaço/caracter especial.",
    ),
});

export type NewFormLinkData = zod.infer<typeof newFormLinkSchema>;

export const useFormNewLink = () => {
  const queryClient = useQueryClient();

  const form = useForm<NewFormLinkData>({
    defaultValues: {
      originalUrl: "",
      shortenedUrl: "",
    },
    resolver: zodResolver(newFormLinkSchema),
  });

  const mutation = useMutation({
    mutationFn: services.links.create,
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: [LinkType.LIST_LINKS] });
    },
    onError: ({ response, status }: AxiosError) => {
      if (status === 400) {
        const data = response?.data as {
          message: string;
        };

        const message =
          data.message === "Shortened URL already exists"
            ? "O link encurtado já existe."
            : data.message;

        toast.error(
          <div className="flex flex-col">
            <p>Erro no cadastro</p>
            <span>{message}</span>
          </div>,
          {
            className: "!bg-red-100 !text-red-600",
          },
        );

        form.setError("shortenedUrl", { message });
      }
    },
  });

  const handleSubmit = (data: NewFormLinkData) => {
    const formtedShortenedUrl = `${env.VITE_FRONTEND_URL}/${data.shortenedUrl}`;

    mutation.mutate({
      ...data,
      shortenedUrl: formtedShortenedUrl,
    });
  };

  return {
    form,
    handleSubmit,
  };
};
