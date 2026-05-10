import { Card } from "@/components/card";
import { Link } from "@tanstack/react-router";

export const RouteNotFound = () => {
  return (
    <Card className="mt-[31vh] flex flex-col items-center justify-center md:mt-0">
      <img src="/404.svg" alt="Imagem 404" className="w-48" />
      <h1 className="text-center text-xl text-gray-600 m-6">
        Link não encontrado
      </h1>
      <p className="text-center text-md text-gray-500 mb-6">
        O link que você está tentando acessar não existe, foi removido ou é uma
        URL inválida. Saiba mais em
        <Link className="ml-2 text-md text-blue-base underline" to="/">
          brev.ly.
        </Link>
      </p>
    </Card>
  );
};
