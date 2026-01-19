import { TicketWithAssignee } from "@/types";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { memo, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useTicketAssign, useTicketStatus } from "@/hooks";
import { User } from "@acme/shared-models";
import { UserSelection } from "./user-selection";

export interface TicketInfoProps {
  type?: 'static' | 'editable';
  data: TicketWithAssignee;
  shortTitle?: boolean;
  action?: ReactNode;
}

export const TicketInfo = memo(({ data, type = 'static', shortTitle = true, action }: TicketInfoProps) => {
    const [status, setStatus] = useState<boolean>(data.completed);
    const [assignee, setAssignee] = useState<User | null>(data?.assignee ?? null);
  

    const { mutate: mutateStatus, isLoading: changingStatus } = useTicketStatus();
    const { mutate: mutateAssign, isLoading: changingAssignee } = useTicketAssign();

    const handleAssigneeChange = useCallback((user: User | null) => {
        if (user?.id === assignee?.id || !user?.id) {
            return;
        }

        mutateAssign({ id: data.id, assigneeId: user?.id ?? null, onSuccess: () => {
            setAssignee(user);
        }, onError: () => {
            setAssignee(data?.assignee ?? null);
        } });
    }, [mutateAssign, data.id, assignee, data?.assignee]);

    const handleStatusChange = useCallback(() => {
        mutateStatus({ id: data.id, complete: !status, onSuccess: () => {
            setStatus(!status);
        }, onError: () => {
            setStatus(status);
        } });
    }, [mutateStatus, data.id, status]);


    useEffect(() => {
        setStatus(data.completed);
    }, [data.completed]);

    useEffect(() => {
        setAssignee(data?.assignee ?? null);
    }, [data?.assignee]);

    return (
        <div className="flex flex-col gap-4 size-full">
            <h4 className={cn("text-lg", shortTitle && 'truncate')}>{data.description}</h4>
            <TicketDetails assignee={assignee} status={status} type={type} onStatusChange={handleStatusChange} onAssigneeChange={handleAssigneeChange} changingStatus={changingStatus} changingAssignee={changingAssignee} />
            {action ? action : null}
        </div>
    );
});

interface TicketDetailsProps {
    assignee: User | null;
    status: boolean;
    type: 'static' | 'editable';
    onStatusChange: () => void;
    onAssigneeChange: (user: User | null) => void;
    changingStatus: boolean;
    changingAssignee: boolean;
}

const TicketDetails = ({ assignee, status, type, onStatusChange, onAssigneeChange, changingStatus, changingAssignee }: TicketDetailsProps) => {
    const statusLabel = changingStatus 
        ? (status ? 'Reopening...' : 'Completing...')
        : (status ? 'Complete' : 'Mark as complete');

    if (type === 'static') {
        return (
        <div className="flex flex-col gap-4 border-y border-border py-4">
            <div className="flex justify-between w-full">
                <span className="text-muted-foreground text-sm">Assigned to:</span>
                <span className="text-foreground">{assignee?.name ?? 'Unassigned'}</span>
            </div>
            <div className="flex justify-between w-full">
                <span className="text-muted-foreground text-sm">Status:</span>
                <span className={cn("text-foreground", status ? 'text-green-600' : 'text-red-600')}>{status ? 'Complete' : 'Incomplete'}</span>
            </div>
        </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 border-t border-border py-4">
            <UserSelection value={assignee} onChange={onAssigneeChange} disabled={changingAssignee} />
            <div className="flex items-center gap-3">
                <Checkbox id="status" checked={status} onCheckedChange={onStatusChange} disabled={changingStatus} />
                <Label htmlFor="status" className={cn(changingStatus && 'opacity-50')}>{statusLabel}</Label>
            </div>
        </div>
    );
};

export const TicketInfoSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 size-full">
      <Skeleton className="h-4 w-full" />
      <div className="flex flex-col gap-2 border-y border-border py-4">
        <div className="flex justify-between w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex justify-between w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
        </div>
      </div>
    <Skeleton className="h-8 w-full" />
    </div>
  );
};