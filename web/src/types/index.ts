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
  LIST_LINKS: "list-links",
} as const;
