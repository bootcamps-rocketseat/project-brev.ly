import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { services } from "@/services";
import { env } from "@/env";
import { LinkType } from "@/types";

const newFormLinkSchema = zod.object({
  originalUrl: zod.url("Informe uma url válida"),
  shortenedUrl: zod
    .string()
    .min(3, "Informe um link encurtado")
    .regex(/^[a-zA-Z0-9-]+$/, "Use apenas letras, números e hífen"),
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
    onError: () => {},
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
