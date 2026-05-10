import { services } from "@/services";
import { LinkType, type Link } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useListLinks = () => {
  const query = useQuery({
    queryKey: [LinkType.LIST_LINKS],
    queryFn: () => services.links.list(),
  });

  return {
    links: query.data?.data?.links as Array<Link>,
    isPending: query.isPending || query.isFetching,
  };
};
