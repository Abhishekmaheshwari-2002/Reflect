import { getCollections } from "@/actions/collection";
import { getJournalEntries } from "@/actions/journal";
import Collections from "./components/collections";
import MoodAnalytics from "./components/moodAnalytics";

const dashboard = async () => {
    const collections = await getCollections();
    const entriesData = await getJournalEntries();
    // Group entries by collection
    const entriesByCollection = entriesData?.data?.entries?.reduce(
        (acc, entry) => {
            const collectionId = entry.collectionId || "unorganized";
            if (!acc[collectionId]) {
                acc[collectionId] = [];
            }
            acc[collectionId].push(entry);
            return acc;
        }, {});

    return (
        <div className="px-4 py-8 space-y-8">
            <section className="space-y-4">
                <MoodAnalytics />
            </section>
            <Collections
                collections={collections}
                entriesByCollection={entriesByCollection}
            />
        </div>
    );
};

export default dashboard;
