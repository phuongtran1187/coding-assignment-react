import { cn } from "@/lib/utils";
import { AlertCircle, FileText } from "lucide-react";
import { ReactNode } from "react";

type StateType = 'error' | 'empty';

export interface StateViewProps {
  className?: string;
  type?: StateType;
}

const DEFAULT_INFO: Record<StateType, { icon: ReactNode; title: string; description: string }> = {
  error: {
    icon: <AlertCircle className="size-8 text-red-500" />,
    title: 'Something went wrong',
    description: 'An error occurred while loading the data',
  },
  empty: {
    icon: <FileText className="size-8 text-gray-500" />,
    title: 'No data available',
    description: 'There is no data to display',
  },
} as const;

export const StateView = ({ className, type = 'empty' }: StateViewProps) => {
  
  return (
      <div className={cn("flex flex-col items-center justify-center gap-4 h-60", className)}>
        { DEFAULT_INFO[type].icon}
        <div className="flex flex-col items-center justify-center gap-2">
            <h3 className="text-lg">{DEFAULT_INFO[type].title}</h3>
            <p className="text-sm font-light text-muted-foreground">{DEFAULT_INFO[type].description}</p>
        </div>
      </div>
  );
};