import { List } from "@/components/templates";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckIcon, TicketIcon, XIcon } from "lucide-react";
import { ReactNode } from "react";

export interface TicketSummaryProps {
    totalTickets: number;
    completedTickets: number;
    incompleteTickets: number;
    isLoading?: boolean;
}

export interface SummaryItemProps {
    key: (typeof SUMMARY_CONFIG)[number]['key'];
    label: string;
    value: number;
    percentage?: number;
    icon: ReactNode;
    color: string;
    iconBg: string;
    textColor: string;
    isLoading?: boolean;
}

const SUMMARY_CONFIG = [
    {
        key: "total-tickets",
        label: "Total Tickets",
        icon: <TicketIcon className="text-amber-600" />,
        color: "bg-amber-50",
        iconBg: "bg-amber-100",
        textColor: "text-amber-900",
        getValue: ({ totalTickets }: { totalTickets: number }) => {
            return {
                value: totalTickets,
                percentage: undefined,
            };
        },
    },
    {
        key: "completed-tickets",
        label: "Completed Tickets",
        icon: <CheckIcon className="text-emerald-600" />,
        color: "bg-emerald-50",
        iconBg: "bg-emerald-100",
        textColor: "text-emerald-900",
        getValue: ({ totalTickets, completedTickets }: { totalTickets: number, completedTickets: number }) => {
            return {
                value: completedTickets,
                percentage: (completedTickets / totalTickets) * 100,
            };
        },
    },
    {
        key: "incomplete-tickets",
        label: "Incomplete Tickets",
        icon: <XIcon className="text-rose-600" />,
        color: "bg-rose-50",
        iconBg: "bg-rose-100",
        textColor: "text-rose-900",
        getValue: ({ totalTickets, incompleteTickets }: { totalTickets: number, incompleteTickets: number }) => {
            return {
                value: incompleteTickets,
                percentage: (incompleteTickets / totalTickets) * 100,
            };
        },
    },
] as const;

export const TicketSummary = ({ totalTickets, completedTickets, incompleteTickets, isLoading = false }: TicketSummaryProps) => {
    return (
        <div className="flex flex-col gap-4">
            <List className="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {SUMMARY_CONFIG.map((item: (typeof SUMMARY_CONFIG)[number]) => (
                    <SummaryItem key={item.key} label={item.label} value={item.getValue({ totalTickets, completedTickets, incompleteTickets })?.value ?? 0} percentage={item.getValue({ totalTickets, completedTickets, incompleteTickets })?.percentage} icon={item.icon} color={item.color} iconBg={item.iconBg} textColor={item.textColor} isLoading={isLoading} />
                ))}
            </List>
        </div>
    );
};



const SummaryItem = ({ label, value, percentage, icon, color, iconBg, textColor, isLoading = false }: SummaryItemProps) => {
    return (
        <div className={`flex flex-col gap-4 p-4 rounded-xl ${color}`}>
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">{label}</span>
                <div className={`p-2 rounded-lg ${iconBg}`}>
                    {icon}
                </div>
            </div>
            {isLoading ? (
                <Skeleton className="w-20 h-10" />
            ) : (
                <div className="flex items-baseline gap-1">
                <span className={`text-3xl font-bold ${textColor}`}>
                    {value}
                </span>
                {percentage !== undefined && (
                    <span className="text-lg text-gray-500">
                        ({percentage.toFixed(2)}%)
                    </span>
                )}
            </div>
            )}
            
        </div>
    );
};