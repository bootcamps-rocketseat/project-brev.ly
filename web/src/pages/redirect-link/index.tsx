import { Card } from "@/components/card";
import { Route } from "@/routes/$shortenedUrl";
import { useRedirectLink } from "./hooks";

export const RedirectLink = () => {
  const { shortenedUrl } = Route.useParams();
  useRedirectLink(shortenedUrl);

  return (
    <Card className="mt-[31vh] flex flex-col items-center justify-center md:mt-0">
      <img src="/Logo_Icon.svg" alt="Logo" className="w-16 h-16" />
      <h1 className="text-xl text-gray-600 m-6">Redirecionando...</h1>
      <p className="text-center text-md text-gray-500">
        O link será aberto automaticamente em alguns instantes.
      </p>
      <p className="text-center text-md text-gray-500 mb-6">
        Não foi redirecionado?
        <a className="ml-2 text-md text-blue-base underline" href="/">
          Acesse aqui
        </a>
      </p>
    </Card>
  );
};
