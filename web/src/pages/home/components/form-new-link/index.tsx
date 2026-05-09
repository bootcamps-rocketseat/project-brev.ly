import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Input } from "@/components/input";

export const FormNewLink = () => {
  return (
    <Card className="h-84 md:max-w-md gap-6 flex flex-col">
      <h1 className="text-gray-600 text-lg">Novo link</h1>

      <Input label="link original" placeholder="www.exemplo.com.br" />

      <Input label="link encurtado" prefix="brev.ly/" />

      <Button type="submit">Salvar link</Button>
    </Card>
  );
};
