import { notFound } from 'next/navigation'

export default function Test() {
    // Prevent access in production
    if (process.env.NODE_ENV === 'production') {
        notFound()
    }

    return (
        <div className="container mx-auto flow p-4">
            <h1 className="text-2xl lg:text-4xl font-bold mb-4">🧪 Test Page</h1>
            <p>This page is for testing components during development.</p>
            
            {/* Add your test components here */}
            <div className="border border-gray-200 dark:border-gray-800 p-4 rounded-sm">
                <p>Test components go here...</p>
            </div>
        </div>
    )
}