"use client";

import { useEffect, useState } from "react";
import CollectionPreview from "./collectionPreview";
import CollectionForm from "@/components/collectionDialog";
import { createCollection } from "@/actions/collection";
import { toast } from "sonner";
import useFetch from "@/hooks/useFetch";


const Collections = ({ collections = [], entriesByCollection }) => {

    const [isCollectionDialogOpen, setCollectionDialogOpen] = useState(false);
    const {
        loading: createCollectionLoading,
        fetchData: createCollectionFn,
        data: createdCollection,
    } = useFetch(createCollection);

    useEffect(() => {
        if (createdCollection) {
            setCollectionDialogOpen(false);
            fetchCollections(); // Refresh collections list
            toast.success(`Collection ${createdCollection.name} created!`)
        }
    }, [createdCollection, createCollectionLoading]);

    const handleCreateCollection = async () => {
        createCollectionFn(data);
    }

    if (collections.length === 0) return <></>;


    return (
        <section id="collection" className="space-y-6">
            <h2 className="text-3xl font-bold gradient-title">Collection</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Create New Collection Button */}
                <CollectionPreview
                    isCreateNew={true}
                    onCreateNew={() => setCollectionDialogOpen(true)}
                />
                {/* Unorganized Collection */}
                {entriesByCollection?.unorganized?.length > 0 && (
                    <CollectionPreview
                        name="Unorganized"
                        entries={entriesByCollection.unorganized}
                        isUnorganized={true}
                    />
                )}

                {/* User Collections */}
                {collections?.map((collection) => (
                    <CollectionPreview
                        key={collection.id}
                        id={collection.id}
                        name={collection.name}
                        entries={entriesByCollection[collection.id] || []}
                    />
                ))}

                <CollectionForm
                    loading={createCollectionLoading}
                    onSuccess={handleCreateCollection}
                    open={isCollectionDialogOpen}
                    setOpen={setCollectionDialogOpen}
                />
            </div>
        </section>
    );
};

export default Collections;
