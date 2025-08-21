import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import MembershipForm, { type MembershipFormData } from "@/components/admin/MembershipForm";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Define the type for a membership plan
export type MembershipPlan = {
  _id: string;
  name: string;
  price: number;
  duration: "monthly" | "quarterly" | "yearly";
  features: string[];
};

// API Functions
const fetchMemberships = async (): Promise<MembershipPlan[]> => {
  const response = await fetch("/api/memberships");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const createMembership = async (data: MembershipFormData, token: string | null) => {
  const response = await fetch("/api/memberships", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || "Failed to create membership plan");
  }
  return response.json();
};

const updateMembership = async ({ id, data, token }: { id: string, data: MembershipFormData, token: string | null }) => {
  const response = await fetch(`/api/memberships/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || "Failed to update membership plan");
  }
  return response.json();
};

const deleteMembership = async ({ id, token }: { id: string, token: string | null }) => {
  const response = await fetch(`/api/memberships/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || "Failed to delete membership plan");
  }
  return response.json();
};


const AdminMembershipPage = () => {
  const { token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
  const [planToDelete, setPlanToDelete] = useState<MembershipPlan | null>(null);

  // Queries
  const { data: memberships, isLoading, isError, error } = useQuery<MembershipPlan[]>({
    queryKey: ["memberships"],
    queryFn: fetchMemberships,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (newData: MembershipFormData) => createMembership(newData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberships'] });
      toast({ title: "Success", description: "Membership plan created." });
      setIsFormOpen(false);
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message || "Failed to create plan.", variant: "destructive" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (vars: { id: string, data: MembershipFormData }) => updateMembership({ ...vars, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberships'] });
      toast({ title: "Success", description: "Membership plan updated." });
      setIsFormOpen(false);
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message || "Failed to update plan.", variant: "destructive" });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMembership({ id, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memberships'] });
      toast({ title: "Success", description: "Membership plan deleted." });
      setIsAlertOpen(false);
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message || "Failed to delete plan.", variant: "destructive" });
    }
  });

  const handleSave = (data: MembershipFormData) => {
    if (editingPlan) {
      updateMutation.mutate({ id: editingPlan._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleOpenDeleteDialog = (plan: MembershipPlan) => {
    setPlanToDelete(plan);
    setIsAlertOpen(true);
  };

  const handleOpenFormDialog = (plan: MembershipPlan | null) => {
    setEditingPlan(plan);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Membership Plans</h1>
          <Button disabled>Add New Plan</Button>
        </div>
        <Card>
          <CardHeader><CardTitle>Existing Plans</CardTitle></CardHeader>
          <CardContent>
             <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
             </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isError) {
    return <div className="text-red-500">Error loading membership plans: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Membership Plans</h1>
        <Button onClick={() => handleOpenFormDialog(null)}>Add New Plan</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Existing Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {memberships?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No membership plans found.</TableCell>
                </TableRow>
              )}
              {memberships?.map((plan) => (
                <TableRow key={plan._id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell className="capitalize">{plan.duration}</TableCell>
                  <TableCell>${plan.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleOpenFormDialog(plan)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 hover:!text-red-600" onClick={() => handleOpenDeleteDialog(plan)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingPlan ? "Edit Membership Plan" : "Add New Membership Plan"}
            </DialogTitle>
            <DialogDescription>
              {editingPlan
                ? "Make changes to the plan details here."
                : "Fill out the form to create a new membership plan."}
            </DialogDescription>
          </DialogHeader>
          <MembershipForm
            onSave={handleSave}
            onCancel={() => setIsFormOpen(false)}
            planToEdit={editingPlan}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              <span className="font-semibold"> {planToDelete?.name} </span>
              plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => planToDelete && deleteMutation.mutate(planToDelete._id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminMembershipPage;
