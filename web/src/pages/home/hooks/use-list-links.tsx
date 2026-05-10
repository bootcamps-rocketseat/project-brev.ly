import { services } from "@/services";
import { LinkType, type Link } from "@/types";
import { formatUrl } from "@/utils/format-url";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useListLinks = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [LinkType.LIST_LINKS],
    queryFn: () => services.links.list(),
  });

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

  return {
    deleteLink,
    links: query.data?.data?.links as Array<Link>,
    isPending: query.isPending || query.isFetching || mutation.isPending,
  };
};
