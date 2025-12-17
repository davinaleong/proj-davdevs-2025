'use client'

import React from 'react'

type TableStyle = 'striped' | 'bordered' | 'interactive'

interface TableProps {
  children: React.ReactNode
  className?: string
  styles?: TableStyle[]
  caption?: string
}

interface TableSectionProps {
  children: React.ReactNode
  className?: string
}

interface ExtendedTableSectionProps extends TableSectionProps {
  tableStyles?: TableStyle[]
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
}

interface TableCellProps {
  children: React.ReactNode
  className?: string
  as?: 'th' | 'td'
  colSpan?: number
  rowSpan?: number
  tableStyles?: TableStyle[]
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
function Table({ children, className = '', styles = [], caption }: TableProps) {
  const styleClasses = getTableStyles(styles)
  
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
              tableStyles: styles 
            })
          }
          return child
        })}
      </table>
    </div>
  )
}

// Table Head Component
function TableHead({ children, className = '', tableStyles = [] }: ExtendedTableSectionProps) {
  return (
    <thead className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ExtendedTableRowProps>(child)) {
          return React.cloneElement(child, {
            ...child.props,
            tableStyles,
            isHeader: true
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
  isFooter = false
}: ExtendedTableRowProps) {
  const rowClasses = getRowStyles(tableStyles, isEven)
  const headerFooterClasses = (isHeader || isFooter) ? 'font-medium' : ''
  
  return (
    <tr className={`${rowClasses} ${headerFooterClasses} ${className}`.trim()}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<TableCellProps>(child)) {
          return React.cloneElement(child, {
            ...child.props,
            tableStyles
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
  ..._props 
}: TableCellProps) {
  const baseClasses = 'px-4 py-3 text-left'
  const headerClasses = Component === 'th' ? 'font-semibold text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'
  const borderClasses = tableStyles?.includes('bordered') ? 'border-r border-gray-200 dark:border-gray-700 last:border-r-0' : ''
  
  return (
    <Component 
      className={`${baseClasses} ${headerClasses} ${borderClasses} ${className}`.trim()}
      colSpan={colSpan}
      rowSpan={rowSpan}
      {..._props}
    >
      {children}
    </Component>
  )
}

function TableHeader({ children, className = '', tableStyles, ..._props }: Omit<TableCellProps, 'as'>) {
  return (
    <TableCell as="th" className={className} tableStyles={tableStyles} {..._props}>
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