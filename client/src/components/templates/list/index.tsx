import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ListProps {
  children: ReactNode;
  className?: string;
}

export const List = ({ children, className }: ListProps) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", className)}>
        {children}
    </div>
  );
};