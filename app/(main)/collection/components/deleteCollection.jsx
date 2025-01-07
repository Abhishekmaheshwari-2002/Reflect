"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteCollection } from "@/actions/collection";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";

const DeleteCollectionDialog = ({ collection, entriesCount = 0 }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {
    loading: isDeleting,
    fetchData: deleteCollectionFn,
    data: deletedCollection,
  } = useFetch(deleteCollection);

  useEffect(() => {
    if (deleteCollection && !isDeleting) {
      setOpen(false);
      toast.error(
        `collection "${collection.name}" and all its entries deleted`
      );
    }
    router.push("/dashboard");
  }, [deletedCollection, isDeleting]);

  const handleDelete = async () => {
    await deleteCollectionFn(collection.id);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete &quot;{collection.name}&quot;
          </AlertDialogTitle>
          <div className="space-y-2 text-muted-foreground text-sm">
            <p>This will permanently delete:</p>
            <ul className="list-disc list-inside">
              <li>The collection &quot;{collection.name}&quot;</li>
              <li>
                {entriesCount} journal {entriesCount === 1 ? "entry" : "entries"}
              </li>
            </ul>
            <p className="font-semibold text-red-600">
              This action can not be undone
            </p>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className="bg-red-500 hover:bg-red-600"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? " Deleting..." : "Delete Collection"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCollectionDialog;
