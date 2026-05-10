import type { NewFormLinkData } from "@/pages/home/hooks/use-form-new-link";
import type { ListLinksOutput } from "@/types";
import { api } from "./config";

const createLink = async (data: NewFormLinkData) => {
  return await api.post("/links", data);
};

const listLinks = async () => {
  return await api.get<ListLinksOutput>("/links");
};

const deleteLink = async (id: string) => {
  return await api.delete(`/links/${id}`);
};

export const services = {
  links: { create: createLink, list: listLinks, delete: deleteLink },
};
