import { Button } from "@/components/button";
import { Card } from "@/components/card";
import {
  CopyIcon,
  DownloadSimpleIcon,
  LinkIcon,
  TrashIcon,
} from "@phosphor-icons/react";

export const ListLinks = () => {
  return (
    <Card className="h-full">
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
      <div className="p-4 flex flex-col items-center justify-center gap-4">
        <LinkIcon size={32} className="text-gray-400" />

        <p className="text-gray-500 text-xs uppercase">
          ainda não existem links cadastrados
        </p>
      </div>
      {[1, 2, 3, 4, 5].map((_, index, array) => (
        <>
          <div className="flex flex-row justify-between gap-3">
            <div className="flex flex-col min-w-0">
              <a
                target="_blank"
                href="https://www.youtube.com/"
                className="text-blue-base text-md truncate md:overflow-visible md:text-clip"
              >
                brev.ly/Portfolio-Dev
              </a>

              <a
                target="_blank"
                href="https://www.youtube.com/"
                className="text-gray-500 text-sm truncate mt-2 md:overflow-visible md:text-clip"
              >
                devsite.portfolio.com.br/devname-123456
              </a>
            </div>

            <div className="flex flex-row items-center shrink-0">
              <p className="text-gray-500 text-sm mr-5 text-right whitespace-nowrap">
                30 acessos
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
        </>
      ))}
    </Card>
  );
};
