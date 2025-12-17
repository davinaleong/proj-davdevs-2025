'use client'

import { notFound } from 'next/navigation'
import Input from '../components/Input'
import Label from '../components/Label'
import Group from '../components/Group'
import Button from '../components/Button'

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
            <div className="flow border border-gray-200 dark:border-gray-800 p-4 rounded-sm">
                <h2 className="text-lg font-semibold">Input Component Showcase</h2>

                {/* Basic Input Types */}
                <div className="flow">
                    <h3 className="text-md font-semibold">Basic Input Types (Vertical Layout)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Group variant="vertical">
                            <Label>Text Input</Label>
                            <Input 
                                type="text" 
                                placeholder="Enter text"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label required>Email Input</Label>
                            <Input 
                                type="email" 
                                placeholder="example@domain.com"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Password Input</Label>
                            <Input 
                                type="password" 
                                placeholder="Enter your password"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Number Input</Label>
                            <Input 
                                type="number" 
                                placeholder="Enter number"
                                min={0}
                                max={100}
                                step={0.1}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Phone Number</Label>
                            <Input 
                                type="tel" 
                                placeholder="+1 (555) 123-4567"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Website URL</Label>
                            <Input 
                                type="url" 
                                placeholder="https://example.com"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Search Input</Label>
                            <Input 
                                type="search" 
                                placeholder="Search..."
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Date Input</Label>
                            <Input 
                                type="date"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Date & Time</Label>
                            <Input 
                                type="datetime-local"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Month Input</Label>
                            <Input 
                                type="month"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Time Input</Label>
                            <Input 
                                type="time"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Color Picker</Label>
                            <Input 
                                type="color"
                                className="w-full h-10 border border-gray-300 dark:border-gray-700 rounded-sm"
                            />
                        </Group>
                    </div>
                </div>

                {/* Horizontal Layout Examples */}
                <div className="flow">
                    <h3 className="text-md font-semibold">Horizontal Layout Examples</h3>
                    <div className="flow">
                        <Group variant="horizontal">
                            <Label>Name:</Label>
                            <Input 
                                type="text" 
                                placeholder="Your name"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm flex-1"
                            />
                        </Group>

                        <Group variant="horizontal">
                            <Label required>Email:</Label>
                            <Input 
                                type="email" 
                                placeholder="your.email@domain.com"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm flex-1"
                            />
                        </Group>

                        <Group variant="horizontal">
                            <Label>Age:</Label>
                            <Input 
                                type="number" 
                                placeholder="25"
                                min={0}
                                max={150}
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm w-20"
                            />
                        </Group>
                    </div>
                </div>

                {/* Special Input Types */}
                <div className="flow">
                    <h3 className="text-md font-semibold">Special Input Types</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Group variant="vertical">
                            <Label>File Upload</Label>
                            <Input 
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Multiple File Upload</Label>
                            <Input 
                                type="file"
                                multiple
                                accept="image/*"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Range Slider</Label>
                            <Input 
                                type="range"
                                min={0}
                                max={100}
                                step={1}
                                className="w-full"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Week Picker</Label>
                            <Input 
                                type="week"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm"
                            />
                        </Group>
                    </div>
                </div>

                {/* Checkbox and Radio Examples */}
                <div className="flow">
                    <h3 className="text-md font-semibold">Checkbox and Radio Examples</h3>
                    <div className="flow">
                        <Group variant="horizontal">
                            <Input 
                                type="checkbox"
                                className="border-gray-300 text-blue-500 focus:ring-blue-500 rounded"
                            />
                            <Label>I agree to the terms and conditions</Label>
                        </Group>

                        <Group variant="horizontal">
                            <Input 
                                type="checkbox"
                                defaultChecked
                                className="border-gray-300 text-blue-500 focus:ring-blue-500 rounded"
                            />
                            <Label>Subscribe to newsletter</Label>
                        </Group>

                        <div className="flow">
                            <Label>Choose your preferred contact method:</Label>
                            <Group variant="horizontal">
                                <Input 
                                    type="radio"
                                    name="contact"
                                    value="email"
                                    className="border-gray-300 text-blue-500 focus:ring-blue-500"
                                />
                                <Label>Email</Label>
                            </Group>
                            <Group variant="horizontal">
                                <Input 
                                    type="radio"
                                    name="contact"
                                    value="phone"
                                    className="border-gray-300 text-blue-500 focus:ring-blue-500"
                                />
                                <Label>Phone</Label>
                            </Group>
                            <Group variant="horizontal">
                                <Input 
                                    type="radio"
                                    name="contact"
                                    value="sms"
                                    defaultChecked
                                    className="border-gray-300 text-blue-500 focus:ring-blue-500"
                                />
                                <Label>SMS</Label>
                            </Group>
                        </div>
                    </div>
                </div>

                {/* Standalone Inputs (No Labels) */}
                <div className="flow">
                    <h3 className="text-md font-semibold">Standalone Inputs (No Labels)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input 
                            type="text" 
                            placeholder="Search products..."
                            className="px-4 py-3 border-2 border-blue-300 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        
                        <Input 
                            type="email" 
                            placeholder="Enter your email"
                            className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-sm"
                        />

                        <Input 
                            type="number" 
                            placeholder="Quantity"
                            min={1}
                            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-full text-center"
                        />
                    </div>
                </div>

                {/* Different Styling Examples */}
                <div className="flow">
                    <h3 className="text-md font-semibold">Different Styling Examples</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Group variant="vertical">
                            <Label>Modern Style</Label>
                            <Input 
                                type="text" 
                                placeholder="Modern input"
                                className="px-4 py-3 border-2 border-purple-300 dark:border-purple-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Minimal Style</Label>
                            <Input 
                                type="text" 
                                placeholder="Minimal input"
                                className="px-3 py-2 border-0 border-b-2 border-gray-300 dark:border-gray-700 rounded-none focus:ring-0 focus:border-blue-500"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Error State</Label>
                            <Input 
                                type="text" 
                                placeholder="Error input"
                                className="px-3 py-2 border-2 border-red-300 dark:border-red-700 rounded-sm focus:ring-2 focus:ring-red-500 bg-red-50 dark:bg-red-900"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Success State</Label>
                            <Input 
                                type="text" 
                                placeholder="Success input"
                                defaultValue="Valid input"
                                className="px-3 py-2 border-2 border-green-300 dark:border-green-700 rounded-sm focus:ring-2 focus:ring-green-500 bg-green-50 dark:bg-green-900"
                            />
                        </Group>
                    </div>
                </div>

                {/* Form Example */}
                <div className="flow">
                    <h3 className="text-md font-semibold">Complete Form Example</h3>
                    <div className="max-w-md border border-gray-200 dark:border-gray-800 p-4 rounded-sm flow">
                        <h4 className="font-medium">User Registration</h4>
                        
                        <Group variant="vertical">
                            <Label required>Full Name</Label>
                            <Input 
                                type="text" 
                                placeholder="John Doe"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label required>Email Address</Label>
                            <Input 
                                type="email" 
                                placeholder="john@example.com"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label required>Password</Label>
                            <Input 
                                type="password" 
                                placeholder="Enter a secure password"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </Group>

                        <Group variant="vertical">
                            <Label>Date of Birth</Label>
                            <Input 
                                type="date"
                                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </Group>

                        <Group variant="horizontal">
                            <Input 
                                type="checkbox"
                                className="border-gray-300 text-blue-500 focus:ring-blue-500 rounded"
                            />
                            <Label required>I agree to the terms of service</Label>
                        </Group>

                        <Button variant="primary" className="w-full mt-4">
                            Register Account
                        </Button>
                    </div>
                </div>

                {/* Custom Checkbox and Radio Showcase */}
                <div className="flow">
                    <h3 className="text-md font-semibold">Custom Checkbox & Radio Variants</h3>
                    
                    {/* Checkbox Variants */}
                    <div className="flow">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Checkbox Variants</h4>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            <Group variant="horizontal">
                                <Input 
                                    type="checkbox"
                                    variant="white"
                                    defaultChecked
                                />
                                <Label className="text-sm">White</Label>
                            </Group>

                            <Group variant="horizontal">
                                <Input 
                                    type="checkbox"
                                    variant="black"
                                    defaultChecked
                                />
                                <Label className="text-sm">Black</Label>
                            </Group>

                            <Group variant="horizontal">
                                <Input 
                                    type="checkbox"
                                    variant="blue-500"
                                    defaultChecked
                                />
                                <Label className="text-sm">Blue-500</Label>
                            </Group>

                            <Group variant="horizontal">
                                <Input 
                                    type="checkbox"
                                    variant="blue-adaptive"
                                    defaultChecked
                                />
                                <Label className="text-sm">Blue Adaptive</Label>
                            </Group>
                        </div>
                    </div>

                    {/* Radio Variants */}
                    <div className="flow">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Radio Variants (Only one can be selected)</h4>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            <Group variant="horizontal">
                                <Input 
                                    type="radio"
                                    name="radio-variants"
                                    value="white"
                                    variant="white"
                                />
                                <Label className="text-sm">White</Label>
                            </Group>

                            <Group variant="horizontal">
                                <Input 
                                    type="radio"
                                    name="radio-variants"
                                    value="black"
                                    variant="black"
                                />
                                <Label className="text-sm">Black</Label>
                            </Group>

                            <Group variant="horizontal">
                                <Input 
                                    type="radio"
                                    name="radio-variants"
                                    value="blue-500"
                                    variant="blue-500"
                                />
                                <Label className="text-sm">Blue-500</Label>
                            </Group>

                            <Group variant="horizontal">
                                <Input 
                                    type="radio"
                                    name="radio-variants"
                                    value="blue-adaptive"
                                    variant="blue-adaptive"
                                    defaultChecked
                                />
                                <Label className="text-sm">Blue Adaptive</Label>
                            </Group>
                        </div>
                    </div>

                    {/* Font Size Responsiveness Demo */}
                    <div className="flow">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Font Size Responsiveness</h4>
                        <div className="flow">
                            <Group variant="horizontal" className="text-xs">
                                <Input 
                                    type="checkbox"
                                    variant="blue-adaptive"
                                    defaultChecked
                                />
                                <Label className="text-xs">Extra Small (text-xs)</Label>
                            </Group>

                            <Group variant="horizontal" className="text-sm">
                                <Input 
                                    type="checkbox"
                                    variant="blue-adaptive"
                                    defaultChecked
                                />
                                <Label className="text-sm">Small (text-sm)</Label>
                            </Group>

                            <Group variant="horizontal" className="text-base">
                                <Input 
                                    type="checkbox"
                                    variant="blue-adaptive"
                                    defaultChecked
                                />
                                <Label className="text-base">Base (text-base)</Label>
                            </Group>

                            <Group variant="horizontal" className="text-lg">
                                <Input 
                                    type="checkbox"
                                    variant="blue-adaptive"
                                    defaultChecked
                                />
                                <Label className="text-lg">Large (text-lg)</Label>
                            </Group>

                            <Group variant="horizontal" className="text-xl">
                                <Input 
                                    type="checkbox"
                                    variant="blue-adaptive"
                                    defaultChecked
                                />
                                <Label className="text-xl">Extra Large (text-xl)</Label>
                            </Group>

                            <Group variant="horizontal" className="text-2xl">
                                <Input 
                                    type="radio"
                                    name="size-demo"
                                    variant="blue-adaptive"
                                    defaultChecked
                                />
                                <Label className="text-2xl">Radio 2XL (text-2xl)</Label>
                            </Group>
                        </div>
                    </div>

                    {/* Interactive Groups */}
                    <div className="flow">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Interactive Radio Groups</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Group variant="vertical">
                                <Label className="font-medium">Choose your theme preference:</Label>
                                <Group variant="horizontal">
                                    <Input 
                                        type="radio"
                                        name="theme"
                                        value="light"
                                        variant="white"
                                    />
                                    <Label>Light Theme</Label>
                                </Group>
                                <Group variant="horizontal">
                                    <Input 
                                        type="radio"
                                        name="theme"
                                        value="dark"
                                        variant="black"
                                    />
                                    <Label>Dark Theme</Label>
                                </Group>
                                <Group variant="horizontal">
                                    <Input 
                                        type="radio"
                                        name="theme"
                                        value="auto"
                                        variant="blue-adaptive"
                                        defaultChecked
                                    />
                                    <Label>Auto (System)</Label>
                                </Group>
                            </Group>

                            <Group variant="vertical">
                                <Label className="font-medium">Select notification preferences:</Label>
                                <Group variant="horizontal">
                                    <Input 
                                        type="checkbox"
                                        name="notifications"
                                        value="email"
                                        variant="blue-500"
                                        defaultChecked
                                    />
                                    <Label>Email notifications</Label>
                                </Group>
                                <Group variant="horizontal">
                                    <Input 
                                        type="checkbox"
                                        name="notifications"
                                        value="push"
                                        variant="blue-adaptive"
                                        defaultChecked
                                    />
                                    <Label>Push notifications</Label>
                                </Group>
                                <Group variant="horizontal">
                                    <Input 
                                        type="checkbox"
                                        name="notifications"
                                        value="sms"
                                        variant="white"
                                    />
                                    <Label>SMS notifications</Label>
                                </Group>
                            </Group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}