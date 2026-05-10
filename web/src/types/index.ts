export type Link = {
  id: string;
  createdAt: string;
  accessCount: number;
  originalUrl: string;
  shortenedUrl: string;
};

export type ListLinksOutput = {
  links: Array<Link>;
};

export const LinkType = {
  GET_LINK: "get-link",
  LIST_LINKS: "list-links",
  UPDATE_LINK: "update-link",
} as const;
