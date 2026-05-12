import { services } from "@/services";
import { LinkType } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useRedirectLink = (shortenedUrl: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryFn: () => services.links.get(shortenedUrl),
    queryKey: [LinkType.GET_LINK, shortenedUrl],
    enabled: !!shortenedUrl,
  });

  const queryUpdateAccessCount = useQuery({
    queryFn: () => services.links.update(shortenedUrl),
    queryKey: [LinkType.UPDATE_LINK, shortenedUrl],
    enabled: query.isSuccess && !!query.data?.data.id,
  });

  useEffect(() => {
    if (query.isError) {
      window.location.replace("/url/not-found");
    }
  }, [query.isError]);

  useEffect(() => {
    if (!query.isSuccess || !queryUpdateAccessCount.isSuccess) {
      return;
    }

    queryClient.invalidateQueries({
      queryKey: [LinkType.LIST_LINKS],
    });

    window.location.replace(query.data.data.originalUrl);
  }, [
    query.data,
    queryClient,
    query.isSuccess,
    queryUpdateAccessCount.isSuccess,
  ]);

  return {
    query,
    queryUpdateAccessCount,
  };
};
