import JokeSection from '../components/sections/jokes/JokeSection'

export default function Funny() {

    return (
        <div className="min-h-screen grid place-items-center bg-white dark:bg-gray-900">
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                    Random Original Joke
                </h1>
                
                <JokeSection />

                <div className="text-center mt-8">
                    <p className="text-gray-600 dark:text-gray-400">
                        Refresh the page to get a new joke!
                    </p>
                </div>
            </div>
        </div>
    )
}