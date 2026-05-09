import { FormNewLink, ListLinks } from "./components";

export const Home = () => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-10 px-4 py-6">
      <div className="flex justify-center md:justify-start">
        <img src="/Logo.svg" alt="Brev.ly logo" className="w-32" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        <FormNewLink />

        <ListLinks />
      </div>
    </div>
  );
};
