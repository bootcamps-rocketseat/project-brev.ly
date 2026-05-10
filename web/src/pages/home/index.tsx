import { FormNewLink, ListLinks } from "./components";
import { useFormNewLink, useListLinks } from "./hooks";

export const Home = () => {
  const { form, handleSubmit } = useFormNewLink();
  const { isPending, links } = useListLinks();

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-10 px-4 py-6">
      <div className="flex justify-center md:justify-start">
        <img src="/Logo.svg" alt="Brev.ly logo" className="w-32" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        <FormNewLink form={form} handleSubmit={handleSubmit} />

        <ListLinks links={links} isPending={isPending} />
      </div>
    </div>
  );
};
