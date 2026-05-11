import { services } from "@/services";
import { LinkType, type Link } from "@/types";
import { downloadUrl } from "@/utils/download-url";
import { formatUrl } from "@/utils/format-url";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useListLinks = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [LinkType.LIST_LINKS],
    queryFn: () => services.links.list(),
  });

  const mutationExportReportLinks = useMutation({
    mutationFn: services.links.export,
    onSuccess: ({ data: { reportUrl } }) => {
      downloadUrl(reportUrl);
    },
  });

  const handleExportReportLinks = () => {
    mutationExportReportLinks.mutate();
  };

  const mutation = useMutation({
    mutationFn: services.links.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LinkType.LIST_LINKS] });
    },
  });

  const deleteLink = (url: string) => {
    if (url) {
      const formatedUrl = formatUrl(url);

      const handleDelete = () => {
        const confirmed = confirm(
          `Você realmete quer apagar link ${formatedUrl}?`,
        );

        if (!confirmed) return;

        mutation.mutate(formatedUrl);

        alert("Link deletado com sucesso!");
      };

      handleDelete();
    }
  };

  const copyLink = async (url: string) => {
    await navigator.clipboard.writeText(url);

    const formatedUrl = formatUrl(url);

    toast.info(
      <div className="flex flex-col">
        <p>Link copiado com sucesso</p>
        <span>O link {formatedUrl} foi copiado para àrea transferência.</span>
      </div>,
      {
        className: "!bg-blue-100 !text-blue-600",
      },
    );
  };

  return {
    copyLink,
    deleteLink,
    handleExportReportLinks,
    links: query.data?.data?.links as Array<Link>,
    isPendingExportReporLinks: mutationExportReportLinks.isPending,
    isPending: query.isPending || query.isFetching || mutation.isPending,
  };
};
