'use client'

import { notFound } from 'next/navigation'
import { useState } from 'react'
import Tab from '../components/Tab'
import TabFlex from '../components/TabFlex'
import TabPanel from '../components/TabPanel'

export default function Test() {
    // Prevent access in production
    if (process.env.NODE_ENV === 'production') {
        notFound()
    }

    const [activeTab, setActiveTab] = useState('overview')
    const [settingsTab, setSettingsTab] = useState('general')

    return (
        <div className="container mx-auto flow p-4">
            <h1 className="text-2xl lg:text-4xl font-bold mb-4">🧪 Test Page</h1>
            <p>This page is for testing components during development.</p>
            
            {/* Tab Components Demo */}
            <div className="flow border border-gray-200 dark:border-gray-800 p-4 rounded-sm">
                <h2 className="text-lg font-semibold">Tab Components Demo</h2>

                {/* Basic Tab Demo */}
                <div className="space-y-4">
                    <h3 className="text-md font-medium">Basic Tab Interface</h3>
                    
                    <TabFlex>
                        <Tab 
                            isActive={activeTab === 'overview'} 
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </Tab>
                        <Tab 
                            isActive={activeTab === 'analytics'} 
                            onClick={() => setActiveTab('analytics')}
                        >
                            Analytics
                        </Tab>
                        <Tab 
                            isActive={activeTab === 'reports'} 
                            onClick={() => setActiveTab('reports')}
                        >
                            Reports
                        </Tab>
                        <Tab 
                            isActive={activeTab === 'settings'} 
                            onClick={() => setActiveTab('settings')}
                        >
                            Settings
                        </Tab>
                        <Tab disabled>
                            Disabled Tab
                        </Tab>
                    </TabFlex>

                    <TabPanel isActive={activeTab === 'overview'}>
                        <h4 className="text-lg font-semibold mb-3">📊 Overview Dashboard</h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Welcome to your dashboard overview. Here you can see a summary of your key metrics and recent activity.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded border">
                                <h5 className="font-semibold text-blue-900 dark:text-blue-100">Total Users</h5>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,234</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-950 p-4 rounded border">
                                <h5 className="font-semibold text-green-900 dark:text-green-100">Revenue</h5>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">$45,678</p>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded border">
                                <h5 className="font-semibold text-purple-900 dark:text-purple-100">Conversion</h5>
                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">3.2%</p>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel isActive={activeTab === 'analytics'}>
                        <h4 className="text-lg font-semibold mb-3">📈 Analytics</h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Detailed analytics and performance metrics for your application.
                        </p>
                        <div className="space-y-4">
                            <div className="border border-gray-200 dark:border-gray-700 rounded p-4">
                                <h5 className="font-semibold mb-2">Traffic Sources</h5>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex justify-between">
                                        <span>Direct</span>
                                        <span className="font-mono">45%</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Search Engines</span>
                                        <span className="font-mono">32%</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Social Media</span>
                                        <span className="font-mono">23%</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel isActive={activeTab === 'reports'}>
                        <h4 className="text-lg font-semibold mb-3">📋 Reports</h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Generate and download various reports for your data analysis needs.
                        </p>
                        <div className="space-y-3">
                            <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                📊 Monthly Performance Report
                            </button>
                            <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                👥 User Engagement Report
                            </button>
                            <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                💰 Revenue Analysis Report
                            </button>
                        </div>
                    </TabPanel>

                    <TabPanel isActive={activeTab === 'settings'}>
                        <h4 className="text-lg font-semibold mb-3">⚙️ Settings</h4>
                        
                        {/* Nested Tab Demo */}
                        <div className="space-y-4">
                            <TabFlex className="border-b border-gray-200 dark:border-gray-700 pb-2">
                                <Tab 
                                    isActive={settingsTab === 'general'} 
                                    onClick={() => setSettingsTab('general')}
                                    className="text-sm"
                                >
                                    General
                                </Tab>
                                <Tab 
                                    isActive={settingsTab === 'security'} 
                                    onClick={() => setSettingsTab('security')}
                                    className="text-sm"
                                >
                                    Security
                                </Tab>
                                <Tab 
                                    isActive={settingsTab === 'notifications'} 
                                    onClick={() => setSettingsTab('notifications')}
                                    className="text-sm"
                                >
                                    Notifications
                                </Tab>
                            </TabFlex>

                            <div className="min-h-[200px]">
                                {settingsTab === 'general' && (
                                    <div className="space-y-4">
                                        <h5 className="font-semibold">General Settings</h5>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Site Name</label>
                                                <input 
                                                    type="text" 
                                                    className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-black"
                                                    defaultValue="My Application"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Language</label>
                                                <select className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-black">
                                                    <option>English</option>
                                                    <option>Spanish</option>
                                                    <option>French</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {settingsTab === 'security' && (
                                    <div className="space-y-4">
                                        <h5 className="font-semibold">Security Settings</h5>
                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="rounded" />
                                                <span className="text-sm">Enable two-factor authentication</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="rounded" defaultChecked />
                                                <span className="text-sm">Require password confirmation for sensitive actions</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="rounded" />
                                                <span className="text-sm">Auto-logout after 30 minutes of inactivity</span>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {settingsTab === 'notifications' && (
                                    <div className="space-y-4">
                                        <h5 className="font-semibold">Notification Preferences</h5>
                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="rounded" defaultChecked />
                                                <span className="text-sm">Email notifications</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="rounded" />
                                                <span className="text-sm">Push notifications</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="checkbox" className="rounded" defaultChecked />
                                                <span className="text-sm">Weekly digest</span>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabPanel>
                </div>

                {/* Scrollable Tabs Demo */}
                <div className="space-y-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-md font-medium">Scrollable Tabs Demo</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        When tabs overflow horizontally, they become scrollable.
                    </p>
                    
                    <TabFlex>
                        {Array.from({ length: 12 }, (_, i) => (
                            <Tab key={i} className="whitespace-nowrap">
                                Tab {i + 1}
                            </Tab>
                        ))}
                    </TabFlex>
                </div>
            </div>
        </div>
    )
}