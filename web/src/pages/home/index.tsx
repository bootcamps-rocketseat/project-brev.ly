import { FormNewLink, ListLinks } from "./components";
import { useFormNewLink, useListLinks } from "./hooks";

export const RouteHome = () => {
  const { form, handleSubmit } = useFormNewLink();
  const { isPending, links, deleteLink, copyLink } = useListLinks();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center md:justify-start">
        <img src="/Logo.svg" alt="Brev.ly logo" className="w-32" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        <FormNewLink
          form={form}
          isPending={isPending}
          handleSubmit={handleSubmit}
        />

        <ListLinks
          links={links}
          copyLink={copyLink}
          isPending={isPending}
          deleteLink={deleteLink}
        />
      </div>
    </div>
  );
};
