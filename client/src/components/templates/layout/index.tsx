import { Header } from "./header";
import { ReactNode } from "react";

export interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="p-5 size-full min-h-screen w-full max-w-7xl mx-auto flex flex-col gap-6">
      <Header />
      <hr className="border-foreground" />
      <main>
        {children}
      </main>
    </div>
  );
};
