import { services } from "@/services";
import { LinkType } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useRedirectLink = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryFn: () => services.links.get(id),
    queryKey: [LinkType.GET_LINK, id],
    enabled: !!id,
  });

  const queryUpdateAccessCount = useQuery({
    queryFn: () => services.links.update(id),
    queryKey: [LinkType.UPDATE_LINK, id],
    enabled: !!query.data?.data.id,
  });

  useEffect(() => {
    if (
      query.status === "success" &&
      queryUpdateAccessCount.status === "success"
    ) {
      window.location.href = query.data.data.originalUrl;
      queryClient.invalidateQueries({ queryKey: [LinkType.LIST_LINKS] });
    }
  }, [query.status, query.data, queryUpdateAccessCount.status, queryClient]);

  return {
    query,
    queryUpdateAccessCount,
  };
};
