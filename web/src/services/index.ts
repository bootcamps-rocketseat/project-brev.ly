import type { NewFormLinkData } from "@/pages/home/hooks/use-form-new-link";
import type { ListLinksOutput } from "@/types";
import { api } from "./config";

const createLink = async (data: NewFormLinkData) => {
  return await api.post("/links", data);
};

const listLinks = async () => {
  return await api.get<ListLinksOutput>("/links");
};

export const services = {
  links: { create: createLink, list: listLinks },
};
