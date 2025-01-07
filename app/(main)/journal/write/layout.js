import Link from "next/link"
import { Suspense } from "react"
import { BarLoader } from "react-spinners";
// import { BarLoader } from "react-loader-spinner ";


const WriteLayout = ({ children }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div>
                <Link
                    className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer"
                    href="/dashboard">
                    ⬅ Back to Dashboard
                </Link>
            </div>

            <Suspense fallback={<BarLoader color="orange" width={"100%"} />}>
                {children}
            </Suspense>


        </div>
    );
};

export default WriteLayout
