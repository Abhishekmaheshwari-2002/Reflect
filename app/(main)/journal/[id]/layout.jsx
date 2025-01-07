import React, { Suspense } from 'react'

const EntryLayout = ({ children }) => {
    return (
        <div className='px-4 py-8'>
            <div className='mb-8'>
                <Link
                    href="/dashboard"
                    className="text-sm text-orange-600 hover:text-orange-700"
                >
                    ⬅ Back to Dashboard
                </Link>
            </div>

            <Suspense fallback={<BarLoader color="orange" width={"100%"} />}>
                {children}
            </Suspense>
        </div>
    )
}

export default EntryLayout
