import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Input } from "@/components/input";
import { type UseFormReturn } from "react-hook-form";
import { type NewFormLinkData } from "../../hooks/use-form-new-link";

type FormNewLinkProps = {
  form: UseFormReturn<NewFormLinkData>;
  handleSubmit: (data: NewFormLinkData) => void;
};

export const FormNewLink = ({ form, handleSubmit }: FormNewLinkProps) => {
  return (
    <Card className="h-2/4 md:max-w-md flex flex-col">
      <h1 className="text-gray-600 text-lg">Novo link</h1>

      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit((data) => {
          handleSubmit(data);
        })}
      >
        <Input
          {...form.register("originalUrl")}
          label="link original"
          placeholder="https://www.exemplo.com.br"
          error={!!form.formState.errors.originalUrl}
          errorMessage={form.formState.errors.originalUrl?.message}
        />

        <Input
          {...form.register("shortenedUrl")}
          label="link encurtado"
          prefix="brev.ly/"
          error={!!form.formState.errors.shortenedUrl}
          errorMessage={form.formState.errors.shortenedUrl?.message}
        />

        <Button type="submit">Salvar link</Button>
      </form>
    </Card>
  );
};
