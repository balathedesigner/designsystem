import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Loader2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Cell renderer for dual-line content
export interface CellContent {
  primary: React.ReactNode;
  secondary?: React.ReactNode;
}

export interface Column<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  // Allow providing dual-line content
  renderCell?: (row: T) => CellContent;
  // For responsive hiding
  priority?: number; // 1 = highest priority, should always show
}

export interface ExpandedContent<T> {
  row: T;
  content: React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  onRowClick?: (row: T) => void;
  selectedRows?: T[];
  onRowSelect?: (rows: T[]) => void;
  className?: string;
  emptyState?: React.ReactNode;
  // New props
  stickyHeader?: boolean;
  stickyFirstColumn?: boolean;
  expandableContent?: (row: T) => React.ReactNode;
  onExpandRow?: (row: T) => void;
  resizableColumns?: boolean;
  rowActions?: (row: T) => React.ReactNode[];
}

export function Table<T>({
  columns,
  data,
  isLoading = false,
  onSort,
  onRowClick,
  selectedRows = [],
  onRowSelect,
  className,
  emptyState,
  stickyHeader = false,
  stickyFirstColumn = false,
  expandableContent,
  onExpandRow,
  resizableColumns = false,
  rowActions,
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const tableRef = useRef<HTMLTableElement>(null);
  const resizingColumnRef = useRef<string | null>(null);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);

  // Initialize column widths from props
  useEffect(() => {
    if (resizableColumns && tableRef.current) {
      const newWidths: Record<string, number> = {};
      columns.forEach((column) => {
        if (column.width) {
          newWidths[column.key] = parseInt(column.width.replace('px', ''));
        } else {
          // Default width
          newWidths[column.key] = 150;
        }
      });
      setColumnWidths(newWidths);
    }
  }, [columns, resizableColumns]);

  const handleSort = (key: string) => {
    if (!columns.find(col => col.key === key)?.sortable) return;

    const direction = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    onSort?.(key, direction);
  };

  const handleRowSelect = (row: T) => {
    if (!onRowSelect) return;

    const isSelected = selectedRows.includes(row);
    const newSelection = isSelected
      ? selectedRows.filter(r => r !== row)
      : [...selectedRows, row];
    onRowSelect(newSelection);
  };

  const isAllSelected = data.length > 0 && selectedRows.length === data.length;
  const handleSelectAll = () => {
    if (!onRowSelect) return;
    onRowSelect(isAllSelected ? [] : [...data]);
  };

  const toggleRowExpand = (rowIndex: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const rowKey = `row-${rowIndex}`;
    setExpandedRows(prev => ({
      ...prev,
      [rowKey]: !prev[rowKey]
    }));
    
    if (onExpandRow && data[rowIndex]) {
      onExpandRow(data[rowIndex]);
    }
  };

  // Column resizing handlers
  const handleResizeStart = (columnKey: string, e: React.MouseEvent) => {
    if (!resizableColumns) return;
    e.preventDefault();
    resizingColumnRef.current = columnKey;
    startXRef.current = e.clientX;
    startWidthRef.current = columnWidths[columnKey] || 150;
    
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!resizingColumnRef.current) return;
    
    const diff = e.clientX - startXRef.current;
    const newWidth = Math.max(50, startWidthRef.current + diff); // Min width 50px
    
    setColumnWidths(prev => ({
      ...prev,
      [resizingColumnRef.current!]: newWidth
    }));
  };

  const handleResizeEnd = () => {
    resizingColumnRef.current = null;
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  const handleAutoResize = (columnKey: string) => {
    // Would calculate based on content width - this is a placeholder
    const newWidth = 200; // Ideally calculated from content
    setColumnWidths(prev => ({
      ...prev,
      [columnKey]: newWidth
    }));
  };

  const resetColumnWidths = () => {
    const defaultWidths: Record<string, number> = {};
    columns.forEach(col => {
      defaultWidths[col.key] = 150; // Default width
    });
    setColumnWidths(defaultWidths);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (data.length === 0) {
    return emptyState || (
      <div className="flex items-center justify-center p-8 text-gray-500">
        No data available
      </div>
    );
  }

  // Cell renderer function
  const renderCellContent = (column: Column<T>, row: T) => {
    if (column.renderCell) {
      const content = column.renderCell(row);
      return (
        <div className="flex flex-col">
          <div className="font-medium">{content.primary}</div>
          {content.secondary && (
            <div className="text-xs text-gray-500 mt-1">{content.secondary}</div>
          )}
        </div>
      );
    }
    return column.accessor(row);
  };

  return (
    <div className={cn("overflow-x-auto relative", className)}>
      <table ref={tableRef} className="min-w-full divide-y divide-gray-200">
        <thead className={cn(
          "bg-gray-50",
          stickyHeader && "sticky top-0 z-10"
        )}>
          <tr>
            {/* Expand/Collapse column */}
            {expandableContent && (
              <th className="w-10 px-2 py-3 text-left">
                <span className="sr-only">Expand/Collapse</span>
              </th>
            )}
            
            {/* Checkbox column */}
            {onRowSelect && (
              <th className={cn(
                "w-12 px-6 py-3 text-left",
                stickyFirstColumn && "sticky left-0 z-20 bg-gray-50"
              )}>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
            )}
            
            {/* Data columns */}
            {columns.map((column, colIndex) => (
              <th
                key={column.key}
                className={cn(
                  "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                  column.sortable && "cursor-pointer hover:bg-gray-100",
                  resizableColumns && "relative group",
                  colIndex === 0 && stickyFirstColumn && !onRowSelect && "sticky left-0 z-20 bg-gray-50"
                )}
                style={resizableColumns ? { width: `${columnWidths[column.key] || 150}px` } : undefined}
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {column.sortable && sortConfig?.key === column.key && (
                    sortConfig.direction === 'asc' ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  )}
                </div>
                
                {/* Resizable column handle */}
                {resizableColumns && (
                  <div 
                    className="absolute top-0 right-0 h-full w-2 bg-transparent cursor-col-resize group-hover:bg-blue-400 group-hover:opacity-50"
                    onMouseDown={(e) => handleResizeStart(column.key, e)}
                    onDoubleClick={() => handleAutoResize(column.key)}
                  />
                )}
              </th>
            ))}
            
            {/* Actions column */}
            {rowActions && (
              <th className="w-16 px-4 py-3 text-right">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => {
            const isExpanded = expandedRows[`row-${rowIndex}`];
            return (
              <React.Fragment key={rowIndex}>
                <tr
                  className={cn(
                    "hover:bg-gray-50",
                    onRowClick && "cursor-pointer",
                    isExpanded && "bg-gray-50"
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {/* Expand/Collapse cell */}
                  {expandableContent && (
                    <td className="px-2 py-4 whitespace-nowrap">
                      <button
                        onClick={(e) => toggleRowExpand(rowIndex, e)}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <ChevronRight 
                          className={cn(
                            "h-4 w-4 transition-transform", 
                            isExpanded && "transform rotate-90"
                          )} 
                        />
                      </button>
                    </td>
                  )}
                  
                  {/* Checkbox cell */}
                  {onRowSelect && (
                    <td className={cn(
                      "px-6 py-4 whitespace-nowrap",
                      stickyFirstColumn && "sticky left-0 z-10 bg-white"
                    )}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row)}
                        onChange={() => handleRowSelect(row)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}
                  
                  {/* Data cells */}
                  {columns.map((column, colIndex) => (
                    <td
                      key={column.key}
                      className={cn(
                        "px-6 py-4 text-sm text-gray-900",
                        colIndex === 0 && stickyFirstColumn && !onRowSelect && "sticky left-0 z-10 bg-white"
                      )}
                    >
                      {renderCellContent(column, row)}
                    </td>
                  ))}
                  
                  {/* Actions cell */}
                  {rowActions && (
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end space-x-2">
                        {rowActions(row).map((action, actionIndex) => (
                          <div key={actionIndex} onClick={(e) => e.stopPropagation()}>
                            {action}
                          </div>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
                
                {/* Expanded content row */}
                {expandableContent && isExpanded && (
                  <tr className="bg-gray-50">
                    <td colSpan={columns.length + (onRowSelect ? 1 : 0) + (rowActions ? 1 : 0) + 1}>
                      <div className="px-8 py-4 animate-expandHeight">
                        {expandableContent(row)}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      
      {/* Reset layout button for resizable columns */}
      {resizableColumns && (
        <div className="mt-2 text-right pr-4 pb-4">
          <button 
            onClick={resetColumnWidths}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            Reset layout
          </button>
        </div>
      )}
    </div>
  );
} 