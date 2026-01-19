
import { StateView, TicketInfo, TicketInfoSkeleton } from "@/components/shared";
import { List } from "@/components/templates";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import { TicketWithAssignee } from "@/types";
import { Button } from "@/components/ui/button";

export interface TicketListProps {
    tickets: TicketWithAssignee[];
    isLoading?: boolean;
    isError?: boolean;
}

export const TicketList = memo(({ tickets, isLoading = false, isError = false }: TicketListProps) => {
    const navigate = useNavigate();

    const handleClick = (id: number) => {
        navigate(`/${id}`);
    };

    if (isLoading) {
        return (
            <List>
                {Array.from({ length: tickets.length || 4 }).map((_, index) => (
                    <div key={index} className="border border-border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <TicketInfoSkeleton />
                    </div>
                ))}
            </List>
        );
    }

    if (isError) {
        return <StateView type="error" />;
    }

    if (!tickets || tickets.length === 0) {
        return <StateView type="empty" />;
    }

    return (
        <List>
            {tickets.map((t: TicketWithAssignee) => (
                <div key={t.id} className="border border-border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleClick(t.id)}>
                    <TicketInfo key={t.id} data={t} action={<Button size="sm" className="hover:cursor-pointer" onClick={() => handleClick(t.id)}>View</Button>} />
                </div>
            ))}
        </List>
    );
});