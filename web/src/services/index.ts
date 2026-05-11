import type { NewFormLinkData } from "@/pages/home/hooks/use-form-new-link";
import type { ExportReportLinksOutput, Link, ListLinksOutput } from "@/types";
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

const exportReportLinks = async () => {
  return await api.get<ExportReportLinksOutput>("/export-report-links");
};

export const services = {
  links: {
    get: getLink,
    list: listLinks,
    create: createLink,
    delete: deleteLink,
    export: exportReportLinks,
    update: updateAccessCountLink,
  },
};
