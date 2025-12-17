'use client'

import React, { useState } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'

type TableStyle = 'striped' | 'bordered' | 'interactive'
type SortDirection = 'asc' | 'desc' | null

interface SortConfig {
  key: string | null
  direction: SortDirection
}

interface TableData {
  [key: string]: any
}

interface TableProps {
  children?: React.ReactNode
  className?: string
  styles?: TableStyle[]
  caption?: string
  sortable?: boolean
  onSort?: (key: string, direction: SortDirection) => void
  sortConfig?: SortConfig
  data?: TableData[]
  columns?: Array<{
    key: string
    label: string
    sortable?: boolean
    render?: (value: any, row: TableData) => React.ReactNode
  }>
}

interface TableSectionProps {
  children: React.ReactNode
  className?: string
}

interface ExtendedTableSectionProps extends TableSectionProps {
  tableStyles?: TableStyle[]
  sortable?: boolean
  onSort?: (key: string, direction: SortDirection) => void
  sortConfig?: SortConfig
}

interface TableRowProps {
  children: React.ReactNode
  className?: string
}

interface ExtendedTableRowProps extends TableRowProps {
  tableStyles?: TableStyle[]
  isEven?: boolean
  isHeader?: boolean
  isFooter?: boolean
  rowIndex?: number
  sortable?: boolean
  onSort?: (key: string, direction: SortDirection) => void
  sortConfig?: SortConfig
}

interface TableCellProps {
  children: React.ReactNode
  className?: string
  as?: 'th' | 'td'
  colSpan?: number
  rowSpan?: number
  tableStyles?: TableStyle[]
  sortable?: boolean
  sortKey?: string
  onSort?: (key: string, direction: SortDirection) => void
  sortConfig?: SortConfig
}

const getTableStyles = (styles: TableStyle[]) => {
  const styleClasses: string[] = ['bg-white dark:bg-black'] // Base table styling
  
  if (styles.includes('bordered')) {
    styleClasses.push('border border-gray-200 dark:border-gray-800')
  }
  
  return styleClasses.join(' ')
}

const getRowStyles = (styles: TableStyle[], isEven: boolean = false) => {
  const styleClasses: string[] = ['border-b border-gray-200 dark:border-gray-700'] // Default bottom border
  
  if (styles.includes('striped') && isEven) {
    styleClasses.push('bg-gray-50 dark:bg-gray-950')
  }
  
  if (styles.includes('interactive')) {
    styleClasses.push('hover:opacity-60 cursor-pointer transition-opacity')
  }
  
  return styleClasses.join(' ')
}

// Main Table Component
function Table({ 
  children, 
  className = '', 
  styles = [], 
  caption, 
  sortable = false,
  onSort,
  sortConfig,
  data,
  columns
}: TableProps) {
  const [internalSortConfig, setInternalSortConfig] = useState<SortConfig>({ key: null, direction: null })
  
  const currentSortConfig = sortConfig || internalSortConfig
  
  const handleSort = (key: string, direction: SortDirection) => {
    if (onSort) {
      onSort(key, direction)
    } else {
      setInternalSortConfig({ key, direction })
    }
  }
  
  // Sort data if provided
  const sortedData = React.useMemo(() => {
    if (!data || !currentSortConfig.key || !currentSortConfig.direction) {
      return data
    }
    
    const sorted = [...data].sort((a, b) => {
      const aVal = a[currentSortConfig.key!]
      const bVal = b[currentSortConfig.key!]
      
      // Handle different data types
      let comparison = 0
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal)
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal
      } else {
        // Convert to string for comparison
        comparison = String(aVal).localeCompare(String(bVal))
      }
      
      return currentSortConfig.direction === 'desc' ? -comparison : comparison
    })
    
    return sorted
  }, [data, currentSortConfig])
  
  const styleClasses = getTableStyles(styles)
  
  // If data and columns are provided, render data-driven table
  if (data && columns) {
    return (
      <div className={`overflow-x-auto ${className}`}>
        <table className={`w-full ${styleClasses}`.trim()}>
          {caption && (
            <caption className="text-sm uppercase font-medium text-gray-700 dark:text-gray-300 mb-3 text-left">
              {caption}
            </caption>
          )}
          <TableHead tableStyles={styles} sortable={sortable} onSort={handleSort} sortConfig={currentSortConfig}>
            <TableRow tableStyles={styles} isHeader={true} sortable={sortable} onSort={handleSort} sortConfig={currentSortConfig}>
              {columns.map((column) => (
                <TableHeader 
                  key={column.key}
                  sortKey={column.sortable !== false ? column.key : undefined}
                  tableStyles={styles}
                  sortable={sortable && column.sortable !== false}
                  onSort={handleSort}
                  sortConfig={currentSortConfig}
                >
                  {column.label}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody tableStyles={styles}>
            {sortedData?.map((row, index) => (
              <TableRow 
                key={index} 
                tableStyles={styles} 
                isEven={index % 2 === 0}
                rowIndex={index}
              >
                {columns.map((column) => (
                  <TableCell key={column.key} tableStyles={styles}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </table>
      </div>
    )
  }
  
  // Fall back to children-based rendering
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className={`w-full ${styleClasses}`.trim()}>
        {caption && (
          <caption className="text-sm uppercase font-medium text-gray-700 dark:text-gray-300 mb-3 text-left">
            {caption}
          </caption>
        )}
        {React.Children.map(children, (child) => {
          if (React.isValidElement<ExtendedTableSectionProps>(child)) {
            return React.cloneElement(child, { 
              ...child.props,
              tableStyles: styles,
              sortable,
              onSort: handleSort,
              sortConfig: currentSortConfig
            })
          }
          return child
        })}
      </table>
    </div>
  )
}

// Table Head Component
function TableHead({ 
  children, 
  className = '', 
  tableStyles = [], 
  sortable = false, 
  onSort, 
  sortConfig 
}: ExtendedTableSectionProps) {
  return (
    <thead className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ExtendedTableRowProps>(child)) {
          return React.cloneElement(child, {
            ...child.props,
            tableStyles,
            isHeader: true,
            sortable,
            onSort,
            sortConfig
          })
        }
        return child
      })}
    </thead>
  )
}

// Table Body Component  
function TableBody({ children, className = '', tableStyles = [] }: ExtendedTableSectionProps) {
  return (
    <tbody className={className}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<ExtendedTableRowProps>(child)) {
          return React.cloneElement(child, {
            ...child.props,
            tableStyles,
            rowIndex: index,
            isEven: index % 2 === 0
          })
        }
        return child
      })}
    </tbody>
  )
}

// Table Foot Component
function TableFoot({ children, className = '', tableStyles = [] }: ExtendedTableSectionProps) {
  return (
    <tfoot className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ExtendedTableRowProps>(child)) {
          return React.cloneElement(child, {
            ...child.props,
            tableStyles,
            isFooter: true
          })
        }
        return child
      })}
    </tfoot>
  )
}

// Table Row Component
function TableRow({ 
  children, 
  className = '', 
  tableStyles = [],
  isEven = false,
  isHeader = false,
  isFooter = false,
  sortable = false,
  onSort,
  sortConfig
}: ExtendedTableRowProps) {
  const rowClasses = getRowStyles(tableStyles, isEven)
  const headerFooterClasses = (isHeader || isFooter) ? 'font-medium' : ''
  
  return (
    <tr className={`${rowClasses} ${headerFooterClasses} ${className}`.trim()}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<TableCellProps>(child)) {
          return React.cloneElement(child, {
            ...child.props,
            tableStyles,
            sortable: isHeader ? sortable : false,
            onSort,
            sortConfig
          })
        }
        return child
      })}
    </tr>
  )
}

// Table Cell Components
function TableCell({ 
  children, 
  className = '', 
  as: Component = 'td',
  colSpan,
  rowSpan,
  tableStyles,
  sortable = false,
  sortKey,
  onSort,
  sortConfig,
  ..._props 
}: TableCellProps) {
  const baseClasses = 'px-4 py-3 text-left'
  const headerClasses = Component === 'th' ? 'font-semibold text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'
  const borderClasses = tableStyles?.includes('bordered') ? 'border-r border-gray-200 dark:border-gray-700 last:border-r-0' : ''
  const sortableClasses = sortable && sortKey ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 select-none' : ''
  
  const handleClick = () => {
    if (sortable && sortKey && onSort) {
      const currentDirection = sortConfig?.key === sortKey ? sortConfig.direction : null
      const newDirection: SortDirection = 
        currentDirection === 'asc' ? 'desc' : 
        currentDirection === 'desc' ? null : 'asc'
      onSort(sortKey, newDirection)
    }
  }
  
  const getSortIcon = () => {
    if (!sortable || !sortKey || !sortConfig) return null
    
    const isActive = sortConfig.key === sortKey
    const iconClass = "w-4 h-4 ml-1 inline-block"
    
    if (!isActive) {
      return <ChevronsUpDown className={`${iconClass} text-gray-400`} />
    }
    
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className={`${iconClass} text-gray-600 dark:text-gray-300`} /> : 
      <ChevronDown className={`${iconClass} text-gray-600 dark:text-gray-300`} />
  }
  
  return (
    <Component 
      className={`${baseClasses} ${headerClasses} ${borderClasses} ${sortableClasses} ${className}`.trim()}
      colSpan={colSpan}
      rowSpan={rowSpan}
      onClick={handleClick}
      {..._props}
    >
      <div className="flex items-center justify-between">
        <span>{children}</span>
        {getSortIcon()}
      </div>
    </Component>
  )
}

function TableHeader({ 
  children, 
  className = '', 
  tableStyles, 
  sortable, 
  sortKey, 
  onSort, 
  sortConfig, 
  ..._props 
}: Omit<TableCellProps, 'as'>) {
  return (
    <TableCell 
      as="th" 
      className={className} 
      tableStyles={tableStyles} 
      sortable={sortable}
      sortKey={sortKey}
      onSort={onSort}
      sortConfig={sortConfig}
      {..._props}
    >
      {children}
    </TableCell>
  )
}

// Compound component structure
const TableComponent = Object.assign(Table, {
  Head: TableHead,
  Body: TableBody,
  Foot: TableFoot,
  Row: TableRow,
  Cell: TableCell,
  Header: TableHeader,
})

export default TableComponent