import { Button } from "@/components/button";
import { Card } from "@/components/card";
import type { Link } from "@/types";
import {
  CopyIcon,
  DownloadSimpleIcon,
  LinkIcon,
  SpinnerIcon,
  TrashIcon,
} from "@phosphor-icons/react";

type ListLinksProps = {
  links: Array<Link>;
  isPending: boolean;
};

export const ListLinks = ({ links, isPending }: ListLinksProps) => {
  return (
    <Card className="relative h-full overflow-hidden">
      {isPending && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 overflow-hidden">
          <div className="h-full w-1/3 bg-blue-base animate-loading-bar" />
        </div>
      )}
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-gray-600 text-lg">Meus links</h1>

        <Button
          style={{
            width: 120,
          }}
          type="button"
          color="secondary"
        >
          <DownloadSimpleIcon size={16} />
          Baixar CSV
        </Button>
      </div>

      <hr className="flex-col w-full h-px my-5 bg-gray-200 border-0" />

      {(links?.length === 0 || isPending) && (
        <div className="p-4 flex flex-col items-center justify-center gap-4">
          <SpinnerIcon size={32} className="text-gray-400 animate-spin" />

          <p className="text-gray-500 text-xs uppercase">carregando links...</p>
        </div>
      )}

      {links?.length === 0 && !isPending && (
        <div className="p-4 flex flex-col items-center justify-center gap-4">
          <LinkIcon size={32} className="text-gray-400" />

          <p className="text-gray-500 text-xs uppercase">
            ainda não existem links cadastrados
          </p>
        </div>
      )}

      {links?.length >= 1 &&
        !isPending &&
        links.map((item, index, array) => (
          <div key={item.shortenedUrl}>
            <div className="flex flex-row justify-between gap-3">
              <div className="flex flex-col min-w-0">
                <a
                  target="_blank"
                  href={item.originalUrl}
                  className="text-blue-base text-md truncate md:overflow-visible md:text-clip"
                >
                  {item.originalUrl}
                </a>

                <a
                  target="_blank"
                  href={item.shortenedUrl}
                  className="text-gray-500 text-sm truncate mt-2 md:overflow-visible md:text-clip"
                >
                  {item.shortenedUrl}
                </a>
              </div>

              <div className="flex flex-row items-center shrink-0">
                <p className="text-gray-500 text-sm mr-5 text-right whitespace-nowrap">
                  {item.accessCount} acessos
                </p>

                <div className="flex flex-row items-center w-20 gap-1">
                  <Button color="secondary">
                    <CopyIcon size={16} />
                  </Button>

                  <Button color="secondary">
                    <TrashIcon size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {index < array.length - 1 && (
              <hr className="flex-col w-full h-px my-5 bg-gray-200 border-0" />
            )}
          </div>
        ))}
    </Card>
  );
};
