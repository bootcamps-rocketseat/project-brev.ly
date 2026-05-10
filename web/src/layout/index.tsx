type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="h-full flex flex-col items-center justify-center md:h-dvh">
      <div className="pt-8 pl-4 pr-4 pb-4 max-w-7xl w-full">{children}</div>
    </main>
  );
};
