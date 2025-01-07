"use client";
import { deleteJournalEntry } from "@/actions/journal";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const DeleteDialog = ({ entryId }) => {
    const router = useRouter();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const {
        loading: isDeleting,
        fetchData: deleteEntryFn,
        data: deletedEntry,
    } = useFetch(deleteJournalEntry);

    useEffect(() => {
        if (deletedEntry && !isDeleting) {
            setDeleteDialogOpen(false);
            toast.error("Journal entry deleted successfully");
            router.push(`/collection/${deletedEntry.collectionId ? deletedEntry.collectionId : "unorganized"}`);
        }
    }, [deletedEntry, isDeleting]);

    const handleDelete = () => {
        deleteEntryFn(entryId);
    };

    return (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action can not be undone.This will permanently delete your journal entry
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        className="bg-red-500 hover:bg-red-600"
                        disabled={isDeleting}
                        onClick={handleDelete}
                    >
                        {isDeleting ? " Deleting..." : "Delete Entry"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDialog;
