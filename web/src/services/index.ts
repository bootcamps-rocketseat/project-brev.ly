import type { NewFormLinkData } from "@/pages/home/hooks/use-form-new-link";
import type { Link, ListLinksOutput } from "@/types";
import { api } from "./config";

const createLink = async (data: NewFormLinkData) => {
  return await api.post("/links", data);
};

const listLinks = async () => {
  return await api.get<ListLinksOutput>("/links");
};

const deleteLink = async (shortenedUrl: string) => {
  return await api.delete(`/links/${shortenedUrl}`);
};

const getLink = async (shortenedUrl: string) => {
  return await api.get<Link>(`/links/${shortenedUrl}`);
};

const updateAccessCountLink = async (shortenedUrl: string) => {
  return await api.patch(`/links/${shortenedUrl}/access-count`);
};

export const services = {
  links: {
    get: getLink,
    list: listLinks,
    create: createLink,
    delete: deleteLink,
    update: updateAccessCountLink,
  },
};
