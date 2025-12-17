'use client'

import { notFound } from 'next/navigation'
import Table from '../components/Table'

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
                <h2 className="text-lg font-semibold">Table Component Showcase</h2>

                {/* Basic Table with all variants */}
                <div className="space-y-8">
                    {/* Default striped table */}
                    <div>
                        <h3 className="text-md font-medium mb-2">Default Striped Table</h3>
                        <Table styles={['striped', 'bordered']} caption="User Management">
                            <Table.Head>
                                <Table.Row>
                                    <Table.Header>Name</Table.Header>
                                    <Table.Header>Email</Table.Header>
                                    <Table.Header>Role</Table.Header>
                                    <Table.Header>Status</Table.Header>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>John Doe</Table.Cell>
                                    <Table.Cell>john@example.com</Table.Cell>
                                    <Table.Cell>Admin</Table.Cell>
                                    <Table.Cell>Active</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Jane Smith</Table.Cell>
                                    <Table.Cell>jane@example.com</Table.Cell>
                                    <Table.Cell>Editor</Table.Cell>
                                    <Table.Cell>Active</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Bob Johnson</Table.Cell>
                                    <Table.Cell>bob@example.com</Table.Cell>
                                    <Table.Cell>Viewer</Table.Cell>
                                    <Table.Cell>Inactive</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                            <Table.Foot>
                                <Table.Row>
                                    <Table.Cell colSpan={3}>Total Users</Table.Cell>
                                    <Table.Cell>3</Table.Cell>
                                </Table.Row>
                            </Table.Foot>
                        </Table>
                    </div>

                    {/* Interactive bordered table */}
                    <div>
                        <h3 className="text-md font-medium mb-2">Interactive Bordered Table (Alt Variant)</h3>
                        <Table styles={['bordered', 'interactive']}>
                            <Table.Head>
                                <Table.Row>
                                    <Table.Header>Product</Table.Header>
                                    <Table.Header>Price</Table.Header>
                                    <Table.Header>Stock</Table.Header>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>MacBook Pro</Table.Cell>
                                    <Table.Cell>$2,399</Table.Cell>
                                    <Table.Cell>12</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>iPhone 15</Table.Cell>
                                    <Table.Cell>$999</Table.Cell>
                                    <Table.Cell>45</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>

                    {/* All styles combined */}
                    <div>
                        <h3 className="text-md font-medium mb-2">All Styles Combined</h3>
                        <Table styles={['striped', 'bordered', 'interactive']} caption="Sales Report Q4 2024">
                            <Table.Head>
                                <Table.Row>
                                    <Table.Header>Month</Table.Header>
                                    <Table.Header>Revenue</Table.Header>
                                    <Table.Header>Growth</Table.Header>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>October</Table.Cell>
                                    <Table.Cell>$125,000</Table.Cell>
                                    <Table.Cell>+12%</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>November</Table.Cell>
                                    <Table.Cell>$140,000</Table.Cell>
                                    <Table.Cell>+18%</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>December</Table.Cell>
                                    <Table.Cell>$185,000</Table.Cell>
                                    <Table.Cell>+25%</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                            <Table.Foot>
                                <Table.Row>
                                    <Table.Cell>Total</Table.Cell>
                                    <Table.Cell>$450,000</Table.Cell>
                                    <Table.Cell>+18% avg</Table.Cell>
                                </Table.Row>
                            </Table.Foot>
                        </Table>
                    </div>

                    {/* Sortable table demo */}
                    <div>
                        <h3 className="text-md font-medium mb-2">Sortable Table Demo</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Click on column headers to sort. Try clicking multiple times to cycle through ascending, descending, and unsorted states.
                        </p>
                        <Table 
                            styles={['striped', 'bordered']} 
                            sortable 
                            caption="Employee Performance Dashboard"
                            data={[
                                {
                                    name: 'Alice Johnson',
                                    department: 'Engineering',
                                    salary: 95000,
                                    performance: 4.8,
                                    joinDate: '2021-03-15'
                                },
                                {
                                    name: 'Bob Smith',
                                    department: 'Marketing',
                                    salary: 72000,
                                    performance: 4.2,
                                    joinDate: '2020-07-22'
                                },
                                {
                                    name: 'Carol Davis',
                                    department: 'Design',
                                    salary: 85000,
                                    performance: 4.9,
                                    joinDate: '2022-01-10'
                                },
                                {
                                    name: 'David Wilson',
                                    department: 'Engineering',
                                    salary: 110000,
                                    performance: 4.6,
                                    joinDate: '2019-11-05'
                                },
                                {
                                    name: 'Eva Martinez',
                                    department: 'Sales',
                                    salary: 68000,
                                    performance: 4.4,
                                    joinDate: '2023-05-18'
                                },
                                {
                                    name: 'Frank Brown',
                                    department: 'HR',
                                    salary: 78000,
                                    performance: 4.1,
                                    joinDate: '2021-09-30'
                                }
                            ]}
                            columns={[
                                { key: 'name', label: 'Employee Name', sortable: true },
                                { key: 'department', label: 'Department', sortable: true },
                                { 
                                    key: 'salary', 
                                    label: 'Salary', 
                                    sortable: true,
                                    render: (value) => `$${value.toLocaleString()}`
                                },
                                { key: 'performance', label: 'Performance Score', sortable: true },
                                { key: 'joinDate', label: 'Join Date', sortable: true },
                                { 
                                    key: 'actions', 
                                    label: 'Actions', 
                                    sortable: false,
                                    render: () => (
                                        <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">Edit</span>
                                    )
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}