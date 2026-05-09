type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="h-dvh flex flex-col items-center justify-center">
      <div className="max-w-7xl w-full">{children}</div>
    </main>
  );
};
