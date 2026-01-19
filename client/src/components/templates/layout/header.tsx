import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogTitle, DialogHeader, DialogContent, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTicketCreate } from "@/hooks";

export const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname === "/";

    const handleBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

  return (
    <header className="flex justify-between items-center">
        {isHome ? (
            <h1 className="text-2xl font-light">Ticketing App</h1>
        ) : (
            <Button size="sm" className="hover:cursor-pointer hover:bg-transparent" variant="ghost" onClick={handleBack}>
                <ArrowLeftIcon className="w-4 h-4" />
                Back
            </Button>
        )}
      <CreateTicketButton />
    </header>
  );
};

const CreateTicketButton = () => {
    const { mutateCreate, isLoading } = useTicketCreate();

    const [description, setDescription] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    const handleSubmit = useCallback(() => {
        if (description.trim() === '') {
          return;
        }

        mutateCreate(description);
        setOpen(false);
        setDescription('');
    }, [mutateCreate, description]);

    const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }, []);


    const toggleOpen = useCallback(() => {
        setOpen(!open);
    }, [open]);

    return (
      <Dialog open={open} onOpenChange={toggleOpen}>
        <DialogTrigger asChild>
          <Button className="hover:cursor-pointer" size="sm">Create Ticket {" "}<PlusIcon className="w-4 h-4" /></Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Ticket</DialogTitle>
            <DialogDescription>
              Create a new ticket to track your work.
            </DialogDescription>
          </DialogHeader>
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" required placeholder="Enter a description for the ticket" value={description} onChange={handleDescriptionChange} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size="sm" className="hover:cursor-pointer" onClick={toggleOpen}>Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading} size="sm" className="hover:cursor-pointer" onClick={handleSubmit}>{isLoading ? 'Creating...' : 'Create'}</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  );
};
