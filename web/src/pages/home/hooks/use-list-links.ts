import { services } from "@/services";
import { LinkType, type Link } from "@/types";
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

  const deleteLink = (id: string) => {
    if (id) {
      mutation.mutate(id);
    }
  };

  return {
    deleteLink,
    links: query.data?.data?.links as Array<Link>,
    isPending: query.isPending || query.isFetching || mutation.isPending,
  };
};
