import Link from "next/link"
import { Suspense } from "react"
import Loading from "./loading";
const CollectionLayout = ({ children }) => {
    return (
        <div className="px-4 py-8">
            <div className="mb-8">
                <Link
                    className="text-sm text-orange-600 hover:text-orange-700"
                    href="/dashboard">
                    ⬅ Back to Dashboard
                </Link>
            </div>

            <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
    )
}

export default CollectionLayout
