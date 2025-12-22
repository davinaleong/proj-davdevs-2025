'use client'

import { notFound } from 'next/navigation'
import { MessageCircle } from 'lucide-react'

import Button from './../components/Button'
import Panel from './../components/Panel'
import Input from './../components/Input'

export default function Test() {
    // Prevent access in production
    if (process.env.NODE_ENV === 'production') {
        notFound()
    }

    return (
        <div className="relative container mx-auto flow p-4">
            <h1 className="text-2xl lg:text-4xl font-bold mb-4">🧪 Test Page</h1>
            <p>This page is for testing components during development.</p>

            <Panel className="fixed bottom-20 right-4 w-100 md:w-150 h-200 flex flex-col gap-4 p-4 bg-gray-100 dark:bg-gray-900 p-4 rounded-sm" overwrite={true}>
                <Panel className="flex-14 flex flex-col-reverse overflow-y-auto gap-3 bg-gray-100 dark:bg-gray-900 p-4 rounded-sm" overwrite={true}>
                    <Panel className="max-w-80 self-end text-black bg-blue-300 dark:text-white dark:bg-blue-700 p-4 rounded-sm" overwrite={true}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas corrupti minima molestiae recusandae explicabo velit. Sed iusto quod sequi amet facilis totam expedita consectetur at nulla sint neque, autem sapiente.
                    </Panel>
                    <Panel className="max-w-80 text-black bg-white dark:text-white dark:bg-black p-4 rounded-sm" overwrite={true}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas corrupti minima molestiae recusandae explicabo velit. Sed iusto quod sequi amet facilis totam expedita consectetur at nulla sint neque, autem sapiente.
                    </Panel>
                </Panel>
                <Panel className="flex-1 flex gap-2" overwrite={true}>
                    <Input placeholder="Type a message..." className="flex-4 px-3 py-2" />
                    <Button className="flex-1 px-3 py-2" variant="primary">Send</Button>
                </Panel>
            </Panel>

            <Button className="fixed bottom-4 right-4 p-3">
                <MessageCircle size={24} />
            </Button>
        </div>
    )
}