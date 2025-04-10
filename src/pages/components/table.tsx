import React, { useState, useEffect } from 'react';
import { 
  ComponentDocTemplate, 
  SectionContentWrapper, 
  BestPracticeItem,
  DoIcon,
  DontIcon
} from '@/components/shared/ComponentDocTemplate';
import { Table, Column, CellContent } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Loader2, Search, MoreHorizontal, Eye, Edit, Trash2, Mail, User, Phone, Sun, Moon, RotateCcw, Copy, Download, RefreshCw, EyeOff } from 'lucide-react';
import { ComponentPlayground } from '@/components/shared/ComponentPlayground';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  phone?: string;
  department?: string;
  details?: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2023-03-15',
    phone: '(555) 123-4567',
    department: 'Engineering',
    details: 'Full-stack developer with 5+ years of experience. Works primarily on the authentication system.'
  },
  {
    id: '2',
    name: 'Alex Martinez',
    email: 'alex.m@example.com',
    role: 'User',
    status: 'inactive',
    lastLogin: '2023-02-28',
    phone: '(555) 234-5678',
    department: 'Marketing',
    details: 'Content strategist responsible for social media campaigns and email marketing.'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2023-03-14',
    phone: '(555) 345-6789',
    department: 'Product',
    details: 'Product designer who leads the UX research initiatives and design system implementation.'
  },
  {
    id: '4',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2023-03-10',
    phone: '(555) 456-7890',
    department: 'Engineering',
    details: 'Backend engineer focusing on API development and database optimization.'
  },
  {
    id: '5',
    name: 'Emily Wilson',
    email: 'emily.w@example.com',
    role: 'User',
    status: 'inactive',
    lastLogin: '2023-01-15',
    phone: '(555) 567-8901',
    department: 'Sales',
    details: 'Account executive managing relationships with enterprise clients in the finance sector.'
  }
];

// Enhanced column definitions with dual-line cell support
const columns: Column<User>[] = [
  {
    key: 'name',
    header: 'User',
    accessor: (row) => row.name,
    renderCell: (row) => ({
      primary: row.name,
      secondary: row.email,
    }),
    sortable: true,
    priority: 1,
  },
  {
    key: 'role',
    header: 'Role',
    accessor: (row) => row.role,
    renderCell: (row) => ({
      primary: row.role,
      secondary: row.department,
    }),
    sortable: true,
    priority: 2,
  },
  {
    key: 'status',
    header: 'Status',
    accessor: (row) => (
      <Badge variant="solid" color={row.status === 'active' ? 'success' : 'secondary'}>
        {row.status}
      </Badge>
    ),
    renderCell: (row) => ({
      primary: (
        <Badge variant="solid" color={row.status === 'active' ? 'success' : 'secondary'}>
          {row.status}
        </Badge>
      ),
      secondary: row.details ? row.details : undefined,
    }),
    sortable: true,
    priority: 1,
  },
  {
    key: 'lastLogin',
    header: 'Last Active',
    accessor: (row) => row.lastLogin,
    renderCell: (row) => ({
      primary: 'Last login',
      secondary: row.lastLogin,
    }),
    sortable: true,
    priority: 3,
  },
];

type ColumnKey = 'name' | 'email' | 'role' | 'status';

type ColumnVisibility = Record<ColumnKey, boolean>;

// --- Define separate components for each table example (Outside TablePage) ---

const BasicTableExample: React.FC = () => {
  // Assuming 'columns' and 'data' are defined or imported in the scope where this is used
  return (
    <SectionContentWrapper>
      <h3 className="text-lg font-semibold mb-4">Basic Table</h3>
      <div className="space-y-4">
        <Table columns={columns} data={mockUsers} />
      </div>
    </SectionContentWrapper>
  );
};

const ExpandableRowsExample: React.FC = () => {
  // Assuming 'columns', 'data', 'Mail', 'Phone' are defined/imported
  return (
    <SectionContentWrapper>
      <h3 className="text-lg font-semibold mb-4">Expandable Rows</h3>
      <div className="space-y-4">
        <p className="text-sm text-gray-500 mb-4 px-4">
          Click the arrow icon to expand rows and view additional information.
        </p>
        <Table
          columns={columns}
          data={mockUsers}
          expandableContent={(row: User) => (
            <div className="p-2">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail size={14} />
                        <span>{row.email}</span>
                      </div>
                      {row.phone && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone size={14} />
                          <span>{row.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Details</h4>
                    <p className="text-sm text-gray-600">{row.details || 'No details available.'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </SectionContentWrapper>
  );
};

const StickyHeaderExample: React.FC = () => {
  // Assuming 'columns', 'data' are defined/imported
  return (
    <SectionContentWrapper>
      <h3 className="text-lg font-semibold mb-4">Sticky Header & First Column</h3>
      <div className="space-y-4">
        <p className="text-sm text-gray-500 mb-4 px-4">
          Scroll horizontally and vertically to see the sticky header and first column in action.
        </p>
        <div className="sticky-table-container border rounded-lg">
          <Table
            columns={columns}
            data={mockUsers}
            stickyHeader
            stickyFirstColumn
          />
        </div>
      </div>
    </SectionContentWrapper>
  );
};

const SelectableExample: React.FC = () => {
  // Assuming 'columns', 'data', 'User' are defined/imported
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const handleRowSelect = (rows: User[]) => {
    setSelectedRows(rows);
  };
  return (
    <SectionContentWrapper>
      <h3 className="text-lg font-semibold mb-4">Selectable Rows</h3>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Selected rows: {selectedRows.length}
        </p>
        <Table
          columns={columns}
          data={mockUsers}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
        />
      </div>
    </SectionContentWrapper>
  );
};

const ResizableColumnsExample: React.FC = () => {
  // Assuming 'columns', 'data' are defined/imported
  return (
    <SectionContentWrapper>
      <h3 className="text-lg font-semibold mb-4">Resizable Columns</h3>
      <div className="space-y-4">
        <p className="text-sm text-gray-500 mb-4 px-4">
          Hover over column edges and drag to resize. Double-click to auto-fit (placeholder).
        </p>
        <Table
          columns={columns}
          data={mockUsers}
          resizableColumns
        />
      </div>
    </SectionContentWrapper>
  );
};

const RowActionsExample: React.FC = () => {
  // Assuming 'columns', 'data', 'User', 'Eye', 'Edit', 'Trash2' are defined/imported
  const rowActions = (row: User) => [
    <button
      key="view"
      className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
      title="View details"
      onClick={() => console.log('View', row)}
    >
      <Eye size={16} />
    </button>,
    <button
      key="edit"
      className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded"
      title="Edit user"
      onClick={() => console.log('Edit', row)}
    >
      <Edit size={16} />
    </button>,
    <button
      key="delete"
      className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
      title="Delete user"
      onClick={() => console.log('Delete', row)}
    >
      <Trash2 size={16} />
    </button>
  ];
  return (
    <SectionContentWrapper>
      <h3 className="text-lg font-semibold mb-4">Row Actions</h3>
      <div className="space-y-4">
        <p className="text-sm text-gray-500 mb-4 px-4">
          Each row has action buttons for common operations.
        </p>
        <Table
          columns={columns}
          data={mockUsers}
          rowActions={rowActions}
        />
      </div>
    </SectionContentWrapper>
  );
};

const LoadingExample: React.FC = () => {
  // Assuming 'columns', 'data', 'Button', 'Loader2', 'RefreshCw' are defined/imported
  const [loading, setLoading] = useState(false);
  const handleToggleLoading = () => setLoading(!loading);
  return (
    <SectionContentWrapper>
      <h3 className="text-lg font-semibold mb-4">Loading State</h3>
      <div className="space-y-4">
        <Button
          variant="outlined"
          onClick={handleToggleLoading}
          leftIcon={loading ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
        >
          {loading ? 'Loading...' : 'Toggle Loading'}
        </Button>
        <Table
          columns={columns}
          data={mockUsers}
          isLoading={loading}
        />
      </div>
    </SectionContentWrapper>
  );
};

const EmptyStateExample: React.FC = () => {
  // Assuming 'columns' are defined/imported
  return (
    <SectionContentWrapper>
      <h3 className="text-lg font-semibold mb-4">Empty State</h3>
      <div className="space-y-4">
        <Table
          columns={columns}
          data={[]}
          emptyState={<p className="text-center text-gray-500 py-8">No users found.</p>}
        />
      </div>
    </SectionContentWrapper>
  );
};

const MobileViewExample: React.FC = () => {
  // Assuming 'data', 'Badge', 'Button' are defined/imported
  return (
    <SectionContentWrapper>
      <h3 className="text-lg font-semibold mb-4">Mobile View (Card Layout)</h3>
      <div className="space-y-4">
        <p className="text-sm text-gray-500 mb-4 px-4">
          On mobile devices, tables transform into card views. This example shows the pattern:
        </p>
        <div className="table-to-cards">
          {mockUsers.slice(0, 3).map((row: User) => (
            <div key={row.id} className="table-row-card">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium">{row.name}</div>
                  <div className="text-sm text-gray-500">{row.email}</div>
                </div>
                <Badge variant="solid" color={row.status === 'active' ? 'success' : 'secondary'}>
                  {row.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="table-cell-label">Role</div>
                  <div className="table-cell-content">{row.role}</div>
                </div>
                <div>
                  <div className="table-cell-label">Last Active</div>
                  <div className="table-cell-content">{row.lastLogin}</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t flex justify-end space-x-2">
                <Button variant="ghost" size="sm">View</Button>
                <Button variant="outlined" size="sm">Edit</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContentWrapper>
  );
};

// --- End of separate components ---

export default function TablePage() {
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<User[]>(mockUsers);

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    const sortedData = [...data].sort((a, b) => {
      const aValue = a[key as keyof User];
      const bValue = b[key as keyof User];
      
      // Handle potentially undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;
      
      if (direction === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    });
    setData(sortedData);
  };

  const handleRowClick = (row: User) => {
    console.log('Row clicked:', row);
  };

  // Update render functions to use the new components
  const renderBasicExample = () => <BasicTableExample />;
  const renderExpandableRowsExample = () => <ExpandableRowsExample />;
  const renderStickyHeaderExample = () => <StickyHeaderExample />;
  const renderSelectableExample = () => <SelectableExample />;
  const renderResizableColumnsExample = () => <ResizableColumnsExample />;
  const renderRowActionsExample = () => <RowActionsExample />;
  const renderLoadingExample = () => <LoadingExample />;
  const renderEmptyStateExample = () => <EmptyStateExample />;
  const renderMobileViewExample = () => <MobileViewExample />;

  // Update renderAllExamples to call the updated render functions
  const renderAllExamples = () => (
    <div className="space-y-8">
      {renderBasicExample()}
      {renderExpandableRowsExample()}
      {renderStickyHeaderExample()}
      {renderSelectableExample()}
      {renderResizableColumnsExample()}
      {renderRowActionsExample()}
      {renderLoadingExample()}
      {renderEmptyStateExample()}
      {renderMobileViewExample()}
    </div>
  );

  const renderAccessibility = () => {
    return (
      <SectionContentWrapper>
        <h3 className="text-lg font-semibold mb-4">Accessibility Guidelines</h3>
        <div className="space-y-4 text-gray-700 text-sm">
          <ul className="list-disc list-outside space-y-2 pl-5">
            <li>The table uses semantic HTML with proper ARIA attributes.</li>
            <li>Sortable columns have appropriate aria-sort attributes.</li>
            <li>Row selection is keyboard accessible.</li>
            <li>Loading states are announced to screen readers.</li>
            <li>Empty states provide clear feedback.</li>
          </ul>
        </div>
      </SectionContentWrapper>
    );
  };

  const renderApiReference = () => {
    return (
      <SectionContentWrapper>
        <h3 className="text-lg font-semibold mb-4">Props</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="pb-2">Prop</th>
                <th className="pb-2">Type</th>
                <th className="pb-2">Default</th>
                <th className="pb-2">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-2 font-mono text-xs">columns</td>
                <td className="py-2 font-mono text-xs">Column[]</td>
                <td className="py-2 font-mono text-xs">required</td>
                <td className="py-2">Array of column definitions.</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">data</td>
                <td className="py-2 font-mono text-xs">T[]</td>
                <td className="py-2 font-mono text-xs">required</td>
                <td className="py-2">Array of data to display.</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">isLoading</td>
                <td className="py-2 font-mono text-xs">boolean</td>
                <td className="py-2 font-mono text-xs">false</td>
                <td className="py-2">Shows loading state when true.</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">onSort</td>
                <td className="py-2 font-mono text-xs">function</td>
                <td className="py-2 font-mono text-xs">undefined</td>
                <td className="py-2">Callback for sort events.</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">onRowClick</td>
                <td className="py-2 font-mono text-xs">function</td>
                <td className="py-2 font-mono text-xs">undefined</td>
                <td className="py-2">Callback for row click events.</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">selectedRows</td>
                <td className="py-2 font-mono text-xs">T[]</td>
                <td className="py-2 font-mono text-xs">[]</td>
                <td className="py-2">Array of selected rows.</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs">onRowSelect</td>
                <td className="py-2 font-mono text-xs">function</td>
                <td className="py-2 font-mono text-xs">undefined</td>
                <td className="py-2">Callback for row selection events.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SectionContentWrapper>
    );
  };

  const renderPatterns = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SectionContentWrapper>
          <h3 className="text-lg font-semibold text-green-600 mb-4">Do's</h3>
          <ul className="space-y-4">
            <BestPracticeItem
              icon={<DoIcon />}
              title="Clear headers"
              description="Use clear, descriptive column headers"
              example={
                <div className="mt-2 border p-2 rounded">
                  <Table
                    columns={columns.slice(0, 3)}
                    data={data.slice(0, 1)}
                  />
                </div>
              }
            />
            <BestPracticeItem
              icon={<DoIcon />}
              title="Consistent alignment"
              description="Align content consistently (text left, numbers right)"
              example={
                <div className="mt-2 border p-2 rounded">
                  <Table
                    columns={[
                      { key: 'name', header: 'Name', accessor: (row) => row.name },
                    ]}
                    data={data.slice(0, 1)}
                  />
                </div>
              }
            />
          </ul>
        </SectionContentWrapper>
        <SectionContentWrapper>
          <h3 className="text-lg font-semibold text-red-600 mb-4">Don'ts</h3>
          <ul className="space-y-4">
            <BestPracticeItem
              icon={<DontIcon />}
              title="Overcrowded tables"
              description="Don't include too many columns on mobile"
              example={
                <div className="mt-2 border p-2 rounded overflow-x-auto max-w-[250px]">
                  <Table
                    columns={columns}
                    data={data.slice(0, 1)}
                  />
                </div>
              }
            />
            <BestPracticeItem
              icon={<DontIcon />}
              title="Missing empty states"
              description="Don't leave tables empty without explanation"
              example={
                <div className="mt-2 border p-2 rounded">
                  <Table
                    columns={columns.slice(0, 3)}
                    data={[]}
                  />
                </div>
              }
            />
          </ul>
        </SectionContentWrapper>
      </div>
    );
  };

  const renderPlayground = () => {
    const [activeTab, setActiveTab] = useState('basic');
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    const [tableData, setTableData] = useState<User[]>(mockUsers);
    const [filters, setFilters] = useState({
      role: '',
      status: '',
      search: ''
    });
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [expandedRow, setExpandedRow] = useState<User | null>(null);
    const [showCode, setShowCode] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [tableDensity, setTableDensity] = useState<'compact' | 'normal' | 'relaxed'>('normal');
    const [showBorders, setShowBorders] = useState(true);
    const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [rowCount, setRowCount] = useState(10);
    const [visibleColumns, setVisibleColumns] = useState<ColumnVisibility>({
      name: true,
      email: true,
      role: true,
      status: true
    });
    const [isLoading, setIsLoading] = useState(false);
    const [cellLayout, setCellLayout] = useState<'single' | 'dual'>('single');

    const handleSort = (key: string, direction: 'asc' | 'desc') => {
      const sortedData = [...tableData].sort((a, b) => {
        const aValue = a[key as keyof User] || '';
        const bValue = b[key as keyof User] || '';
        
        if (direction === 'asc') {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        }
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      });
      setTableData(sortedData);
    };

    const handleRowSelect = (rows: User[]) => {
      setSelectedRows(rows);
    };

    const handleFilterChange = (key: string, value: string) => {
      setFilters(prev => ({ ...prev, [key]: value }));
      setPage(1);
    };

    const handleLoadMore = () => {
      if (hasMore) {
        setPage(prev => prev + 1);
        // Simulate loading more data
        setTimeout(() => {
          setTableData(prev => [...prev, ...mockUsers]);
          setHasMore(page < 3); // Simulate having more data
        }, 1000);
      }
    };

    const handleRowExpand = (row: User) => {
      setExpandedRow(prev => prev?.id === row.id ? null : row);
    };

    const handleReset = () => {
      // Reset all controls to their default values
      setTableDensity('normal');
      setCellLayout('single');
      setPreviewMode('desktop');
      setRowCount(10);
      setIsLoading(false);
      // Reset all columns to visible
      setVisibleColumns({
        name: true,
        email: true,
        role: true,
        status: true
      });
      // Reset filters and pagination
      setFilters({
        role: '',
        status: '',
        search: ''
      });
      setPage(1);
      setHasMore(true);
      // Reset expanded row
      setExpandedRow(null);
      // Reset code view
      setShowCode(false);
      
      // Reset column layout/widths
      // This would trigger a DOM event to reset column widths if implemented
      const event = new CustomEvent('reset-column-layout', { detail: {} });
      document.dispatchEvent(event);
    };

    const handleCopyCode = () => {
      const code = generateTableCode();
      navigator.clipboard.writeText(code);
    };

    const handleDownloadData = () => {
      const data = JSON.stringify(tableData, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'table-data.json';
      a.click();
      URL.revokeObjectURL(url);
    };

    const handlePreviewModeChange = (value: string | string[]) => {
      setPreviewMode(value as 'desktop' | 'tablet' | 'mobile');
    };

    const handleRowCountChange = (value: string | string[]) => {
      setRowCount(parseInt(value as string));
      setTableData(mockUsers.slice(0, parseInt(value as string)));
    };

    const handleColumnVisibility = (column: ColumnKey) => {
      setVisibleColumns(prev => ({
        ...prev,
        [column]: !prev[column]
      }));
    };

    const handleLoadingToggle = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    const generateTableCode = () => {
      const visibleColumnsCode = columns
        .filter(column => visibleColumns[column.key as ColumnKey])
        .map(column => {
          // Create a simplified version of the column for code display
          const columnCode = { ...column } as any;
          if (cellLayout === 'dual' && columnCode.renderCell) {
            delete columnCode.renderCell;
            columnCode.render = '(row) => JSX'; // Simplify render function
          } else if (columnCode.render) {
            columnCode.render = '(row) => JSX'; // Simplify render function
          }
          return columnCode;
        });

      // Determine which features to show based on the active tab
      const includeRowActions = activeTab === 'actions';
      const includeSticky = activeTab === 'sticky';
      const includeResizable = activeTab === 'resizable';
      const includeMobileCards = activeTab === 'mobile';
      const includeExpandable = activeTab === 'expandable';
      const includePagination = activeTab === 'pagination';
      const includeInfiniteScroll = activeTab === 'infinite';
      const includeFilters = activeTab === 'filters';

      return `import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
${includeRowActions ? 'import { Button } from \'@/components/ui/Button\';' : ''}
${includeRowActions ? 'import { Eye, Edit, Trash2 } from \'lucide-react\';' : ''}
      
// Column definitions
const columns = ${JSON.stringify(visibleColumnsCode, null, 2)
        .replace(/"render": "(row) => JSX"/g, '"render": (row) => JSX')
        .replace(/"(\w+)":/g, '$1:')};

// Data
const data = ${JSON.stringify(tableData.slice(0, 2), null, 2)};

// Render the table
export function DataTable() {
  ${includeFilters ? 'const [filters, setFilters] = useState({ search: \'\', role: \'\', status: \'\' });' : ''}
  ${includePagination ? 'const [page, setPage] = useState(1);' : ''}
  ${includeInfiniteScroll ? 'const [hasMore, setHasMore] = useState(true);' : ''}

  ${includeFilters ? `
  // Filter the data based on the filters
  const filteredData = data.filter(user => {
    const matchesRole = !filters.role || user.role === filters.role;
    const matchesStatus = !filters.status || user.status === filters.status;
    const matchesSearch = !filters.search || 
      user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.search.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });
  ` : ''}

  ${includePagination ? 'const paginatedData = data.slice(0, page * 5);' : ''}

  return (
    <div className="space-y-4">
      ${includeFilters ? `
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Search..."
          prefixIcon={<Search size={16} />}
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
          size="sm"
        />
        <Select
          placeholder="All Roles"
          value={filters.role}
          onChange={(value) => setFilters({...filters, role: value})}
          options={[
            { value: '', label: 'All Roles' },
            { value: 'Admin', label: 'Admin' },
            { value: 'User', label: 'User' }
          ]}
          size="sm"
        />
        <Select
          placeholder="All Statuses"
          value={filters.status}
          onChange={(value) => setFilters({...filters, status: value})}
          options={[
            { value: '', label: 'All Statuses' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
          ]}
          size="sm"
        />
      </div>
      ` : ''}

      ${includeSticky || includeMobileCards ? '<div className="' + (includeSticky ? 'h-72 overflow-auto' : includeMobileCards ? 'table-to-cards' : '') + '">' : ''}
      <Table
        columns={columns}
        data={${includeFilters ? 'filteredData' : includePagination || includeInfiniteScroll ? 'paginatedData' : 'data'}}
        className="${tableDensity === 'compact' ? 'text-xs' : tableDensity === 'relaxed' ? 'text-base' : ''}"
        ${isLoading ? 'isLoading={true}' : ''}
        ${includeRowActions ? `rowActions={(row) => [
          <button
            key="view"
            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
            title="View details"
            onClick={() => console.log('View', row)}
          >
            <Eye size={16} />
          </button>,
          <button
            key="edit"
            className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded"
            title="Edit user"
            onClick={() => console.log('Edit', row)}
          >
            <Edit size={16} />
          </button>,
          <button
            key="delete"
            className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
            title="Delete user"
            onClick={() => console.log('Delete', row)}
          >
            <Trash2 size={16} />
          </button>
        ]}` : ''}
        ${includeSticky ? 'stickyHeader={true}\n        stickyFirstColumn={true}' : ''}
        ${includeResizable ? 'resizableColumns={true}' : ''}
        ${includeExpandable ? `expandableContent={(row) => (
          <div className="p-4 bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Contact Details</h4>
                <p className="text-sm text-gray-600">{row.email}</p>
                <p className="text-sm text-gray-600">{row.phone}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Department</h4>
                <p className="text-sm text-gray-600">{row.department}</p>
              </div>
            </div>
          </div>
        )}` : ''}
        onSort={(key, direction) => {
          // Add your sorting logic here
        }}
      />
      ${includeSticky || includeMobileCards ? '</div>' : ''}

      ${includePagination ? `
      <div className="flex justify-center gap-2">
        <Button
          variant="outlined"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          leftIcon={<ChevronLeft size={16} />}
        >
          Previous
        </Button>
        <span className="px-3 py-1 flex items-center">Page {page}</span>
        <Button
          variant="outlined"
          size="sm"
          disabled={paginatedData.length >= filteredData.length}
          onClick={() => setPage(prev => prev + 1)}
          rightIcon={<ChevronRight size={16} />}
        >
          Next
        </Button>
      </div>
      ` : ''}

      ${includeInfiniteScroll ? `
      <div className="text-center mb-6 px-4">
        {hasMore ? (
          <Button
            variant="primary"
            onClick={handleLoadMore}
            className="mb-8"
          >
            Load More
          </Button>
        ) : (
          <p className="text-gray-500 mb-8">No more data to load</p>
        )}
      </div>
      ` : ''}
    </div>
  );
}`;
    };

    const filteredData = tableData.filter(user => {
      const matchesRole = !filters.role || user.role === filters.role;
      const matchesStatus = !filters.status || user.status === filters.status;
      const matchesSearch = !filters.search || 
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase());
      return matchesRole && matchesStatus && matchesSearch;
    });

    const paginatedData = filteredData.slice(0, page * 5);

    const baseColumns = [
      {
        key: 'name',
        header: 'Name',
        accessor: (row: User) => row.name,
        sortable: true,
        ...(cellLayout === 'dual' ? {
          renderCell: (row: User) => ({
            primary: (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  {row.name.charAt(0)}
                </div>
                <span className="font-medium">{row.name}</span>
              </div>
            ),
            secondary: `ID: ${row.id}`
          })
        } : {
          render: (row: User) => (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                {row.name.charAt(0)}
              </div>
              <span className="font-medium">{row.name}</span>
            </div>
          )
        })
      },
      {
        key: 'email',
        header: 'Contact',
        accessor: (row: User) => row.email,
        sortable: true,
        ...(cellLayout === 'dual' ? {
          renderCell: (row: User) => ({
            primary: (
              <div className="flex items-center gap-1">
                <Mail size={14} />
                <span>{row.email}</span>
              </div>
            ),
            secondary: row.phone ? (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Phone size={12} />
                <span>{row.phone}</span>
              </div>
            ) : undefined
          })
        } : {
          render: (row: User) => (
            <div className="flex items-center gap-1">
              <Mail size={14} />
              <span>{row.email}</span>
            </div>
          )
        })
      },
      {
        key: 'role',
        header: 'Role',
        accessor: (row: User) => row.role,
        sortable: true,
        ...(cellLayout === 'dual' ? {
          renderCell: (row: User) => ({
            primary: row.role,
            secondary: row.department
          })
        } : {})
      },
      {
        key: 'status',
        header: 'Status',
        accessor: (row: User) => row.status,
        sortable: true,
        ...(cellLayout === 'dual' ? {
          renderCell: (row: User) => ({
            primary: (
              <Badge variant={row.status === 'active' ? 'solid' : 'outline'}>
                {row.status}
              </Badge>
            ),
            secondary: `Last login: ${row.lastLogin}`
          })
        } : {
          render: (row: User) => (
            <Badge variant={row.status === 'active' ? 'solid' : 'outline'}>
              {row.status}
            </Badge>
          )
        })
      }
    ];

    const filteredColumns = baseColumns.filter(column => visibleColumns[column.key as ColumnKey]);

    return (
      <SectionContentWrapper>
        <div className="space-y-6">
          {/* Tabs and Actions */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2 border-b w-full">
              {[
                { id: 'basic', label: 'Basic Table' },
                { id: 'expandable', label: 'Expandable Rows' },
                { id: 'filters', label: 'With Filters' },
                { id: 'pagination', label: 'With Pagination' },
                { id: 'infinite', label: 'Infinite Scroll' },
                { id: 'actions', label: 'Row Actions' },
                { id: 'sticky', label: 'Sticky Columns' },
                { id: 'resizable', label: 'Resizable' },
                { id: 'mobile', label: 'Mobile Cards' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Table Preview */}
            <div className="col-span-12">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Table Preview</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outlined"
                      size="sm"
                      onClick={handleReset}
                      leftIcon={<RotateCcw size={16} />}
                    >
                      Reset
                    </Button>
                    <Button
                      variant="outlined"
                      size="sm"
                      onClick={handleDownloadData}
                      leftIcon={<Download size={16} />}
                    >
                      Download Data
                    </Button>
                  </div>
                </div>
                <div className={cn(
                  'border rounded-lg overflow-hidden',
                  previewMode === 'tablet' && 'max-w-2xl mx-auto',
                  previewMode === 'mobile' && 'max-w-sm mx-auto'
                )}>
                  <div className="space-y-4">
                    {activeTab === 'basic' && (
                      <Table
                        columns={filteredColumns}
                        data={tableData}
                        onSort={handleSort}
                        selectedRows={selectedRows}
                        onRowSelect={handleRowSelect}
                        isLoading={isLoading}
                        className={cn(
                          tableDensity === 'compact' && 'text-xs',
                          tableDensity === 'relaxed' && 'text-base'
                        )}
                      />
                    )}

                    {activeTab === 'expandable' && (
                      <Table
                        columns={filteredColumns}
                        data={tableData}
                        onSort={handleSort}
                        isLoading={isLoading}
                        className={cn(
                          tableDensity === 'compact' && 'text-xs',
                          tableDensity === 'relaxed' && 'text-base'
                        )}
                        expandableContent={(row: User) => (
                          <div className="p-4 bg-gray-50 mx-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Contact Details</h4>
                                <p className="text-sm text-gray-600">{row.email}</p>
                                <p className="text-sm text-gray-600">{row.phone}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Department</h4>
                                <p className="text-sm text-gray-600">{row.department}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        onExpandRow={handleRowExpand}
                      />
                    )}

                    {activeTab === 'filters' && (
                      <div className="space-y-4 mt-4">
                        <div className="flex gap-4 px-4">
                          <Input
                            type="text"
                            placeholder="Search..."
                            prefixIcon={<Search size={16} />}
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            size="sm"
                          />
                          <Select
                            placeholder="All Roles"
                            value={filters.role}
                            onChange={(value) => handleFilterChange('role', value as string)}
                            options={[
                              { value: '', label: 'All Roles' },
                              { value: 'Admin', label: 'Admin' },
                              { value: 'User', label: 'User' }
                            ]}
                            size="sm"
                          />
                          <Select
                            placeholder="All Statuses"
                            value={filters.status}
                            onChange={(value) => handleFilterChange('status', value as string)}
                            options={[
                              { value: '', label: 'All Statuses' },
                              { value: 'active', label: 'Active' },
                              { value: 'inactive', label: 'Inactive' }
                            ]}
                            size="sm"
                          />
                        </div>
                        <Table
                          columns={filteredColumns}
                          data={filteredData}
                          onSort={handleSort}
                          isLoading={isLoading}
                          className={cn(
                            tableDensity === 'compact' && 'text-xs',
                            tableDensity === 'relaxed' && 'text-base'
                          )}
                        />
                      </div>
                    )}

                    {activeTab === 'pagination' && (
                      <div className="space-y-4 mb-4">
                        <Table
                          columns={filteredColumns}
                          data={paginatedData}
                          onSort={handleSort}
                          isLoading={isLoading}
                          className={cn(
                            tableDensity === 'compact' && 'text-xs',
                            tableDensity === 'relaxed' && 'text-base'
                          )}
                        />
                        <div className="flex justify-center gap-2 px-4">
                          <Button
                            variant="outlined"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => setPage(prev => prev - 1)}
                            leftIcon={<ChevronLeft size={16} />}
                          >
                            Previous
                          </Button>
                          <span className="px-3 py-1 flex items-center">Page {page}</span>
                          <Button
                            variant="outlined"
                            size="sm"
                            disabled={paginatedData.length >= filteredData.length}
                            onClick={() => setPage(prev => prev + 1)}
                            rightIcon={<ChevronRight size={16} />}
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    )}

                    {activeTab === 'infinite' && (
                      <div className="space-y-4">
                        <Table
                          columns={filteredColumns}
                          data={paginatedData}
                          onSort={handleSort}
                          isLoading={isLoading}
                          className={cn(
                            tableDensity === 'compact' && 'text-xs',
                            tableDensity === 'relaxed' && 'text-base'
                          )}
                        />
                        <div className="text-center mb-6 px-4">
                          {hasMore ? (
                            <Button
                              variant="primary"
                              onClick={handleLoadMore}
                              className="mb-8"
                            >
                              Load More
                            </Button>
                          ) : (
                            <p className="text-gray-500 mb-8">No more data to load</p>
                          )}
                        </div>
                      </div>
                    )}

                    {activeTab === 'actions' && (
                      <div className="space-y-4 mx-4">
                        <Table
                          columns={filteredColumns}
                          data={paginatedData}
                          onSort={handleSort}
                          isLoading={isLoading}
                          className={cn(
                            tableDensity === 'compact' && 'text-xs',
                            tableDensity === 'relaxed' && 'text-base'
                          )}
                          rowActions={(row: User) => [
                            <button
                              key="view"
                              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                              title="View details"
                              onClick={() => console.log('View', row)}
                            >
                              <Eye size={16} />
                            </button>,
                            <button
                              key="edit"
                              className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded"
                              title="Edit user"
                              onClick={() => console.log('Edit', row)}
                            >
                              <Edit size={16} />
                            </button>,
                            <button
                              key="delete"
                              className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                              title="Delete user"
                              onClick={() => console.log('Delete', row)}
                            >
                              <Trash2 size={16} />
                            </button>
                          ]}
                        />
                      </div>
                    )}

                    {activeTab === 'sticky' && (
                      <div className="space-y-4 mt-4">
                        <p className="text-sm text-gray-500 mb-2 px-4">Scroll horizontally and vertically to see sticky headers and columns</p>
                        <div className="h-72 border overflow-auto">
                          <Table
                            columns={[
                              ...filteredColumns,
                              // Additional columns for horizontal scrolling
                              {
                                key: 'department',
                                header: 'Department',
                                accessor: (row: User) => row.department || '-',
                                sortable: true
                              },
                              {
                                key: 'lastLogin',
                                header: 'Last Login',
                                accessor: (row: User) => row.lastLogin,
                                sortable: true
                              },
                              {
                                key: 'details',
                                header: 'Details',
                                accessor: (row: User) => row.details || 'No details available',
                                sortable: false
                              }
                            ]}
                            data={tableData.slice(0, rowCount)}
                            onSort={handleSort}
                            isLoading={isLoading}
                            className={cn(
                              tableDensity === 'compact' && 'text-xs',
                              tableDensity === 'relaxed' && 'text-base',
                              'w-full'
                            )}
                            stickyHeader={true}
                            stickyFirstColumn={true}
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'resizable' && (
                      <div className="space-y-4 mt-4">
                        <p className="text-sm text-gray-500 mb-2 px-4">Drag column edges to resize them</p>
                        <Table
                          columns={filteredColumns}
                          data={paginatedData}
                          onSort={handleSort}
                          isLoading={isLoading}
                          className={cn(
                            tableDensity === 'compact' && 'text-xs',
                            tableDensity === 'relaxed' && 'text-base'
                          )}
                          resizableColumns={true}
                        />
                      </div>
                    )}

                    {activeTab === 'mobile' && (
                      <div className="space-y-4 mx-4">
                        <p className="text-sm text-gray-500 mb-2 px-4">On small screens, the table transforms into cards</p>
                        <div className={cn(
                          'table-to-cards',
                          previewMode === 'mobile' ? 'max-w-sm' : 'max-w-full'
                        )}>
                          <Table
                            columns={filteredColumns}
                            data={paginatedData.slice(0, 3)}
                            onSort={handleSort}
                            isLoading={isLoading}
                            className={cn(
                              tableDensity === 'compact' && 'text-xs',
                              tableDensity === 'relaxed' && 'text-base'
                            )}
                          />
                        </div>
                        <div className="text-center mt-4">
                          <Button 
                            variant="outlined"
                            size="sm"
                            onClick={() => setPreviewMode('mobile')}
                            className={cn(previewMode === 'mobile' && 'bg-blue-50')}
                          >
                            Switch to Mobile View
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Code Preview */}
                <div className="mt-6">
                  <Button
                    variant={showCode ? 'primary' : 'outlined'}
                    size="sm"
                    onClick={() => setShowCode(!showCode)}
                    className={cn(
                      'w-full',
                      !showCode && 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100'
                    )}
                  >
                    {showCode ? 'Hide Code' : 'Show Code'}
                  </Button>
                  {showCode && (
                    <div className="mt-4">
                      <CodeBlock language="tsx">
                        {generateTableCode()}
                      </CodeBlock>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Controls Bottom Bar */}
            <div className="col-span-12 mt-6 border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Layout Controls */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700">Layout</h3>
                  <Select
                    placeholder="Table Density"
                    value={tableDensity}
                    onChange={(value) => setTableDensity(value as 'compact' | 'normal' | 'relaxed')}
                    options={[
                      { value: 'compact', label: 'Compact' },
                      { value: 'normal', label: 'Normal' },
                      { value: 'relaxed', label: 'Relaxed' }
                    ]}
                    size="sm"
                  />
                  <div className="flex gap-2">
                    <Badge
                      variant={cellLayout === 'single' ? 'default' : 'outline'}
                      onClick={() => setCellLayout('single')}
                      className="cursor-pointer"
                    >
                      1 Line
                    </Badge>
                    <Badge
                      variant={cellLayout === 'dual' ? 'default' : 'outline'}
                      onClick={() => setCellLayout('dual')}
                      className="cursor-pointer"
                    >
                      2 Lines
                    </Badge>
                  </div>
                  <Select
                    placeholder="Preview Mode"
                    value={previewMode}
                    onChange={handlePreviewModeChange}
                    options={[
                      { value: 'desktop', label: 'Desktop' },
                      { value: 'tablet', label: 'Tablet' },
                      { value: 'mobile', label: 'Mobile' }
                    ]}
                    size="sm"
                  />
                </div>

                {/* Data Controls */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700">Data</h3>
                  <Select
                    placeholder="Row Count"
                    value={rowCount.toString()}
                    onChange={handleRowCountChange}
                    options={[
                      { value: '5', label: '5 Rows' },
                      { value: '10', label: '10 Rows' },
                      { value: '20', label: '20 Rows' },
                      { value: '50', label: '50 Rows' }
                    ]}
                    size="sm"
                  />
                  <Button
                    variant="outlined"
                    size="sm"
                    onClick={handleLoadingToggle}
                    leftIcon={isLoading ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
                    className="w-full"
                  >
                    {isLoading ? 'Loading...' : 'Toggle Loading'}
                  </Button>
                </div>

                {/* Column Controls */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700">Columns</h3>
                  <div className="flex flex-wrap gap-2">
                    {baseColumns.map(column => (
                      <Badge
                        key={column.key}
                        variant={visibleColumns[column.key as ColumnKey] ? 'default' : 'outline'}
                        onClick={() => handleColumnVisibility(column.key as ColumnKey)}
                        className="cursor-pointer flex items-center gap-1"
                      >
                        <span>{column.header}</span>
                        {visibleColumns[column.key as ColumnKey] ? <Eye size={14} /> : <EyeOff size={14} />}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContentWrapper>
    );
  };

  return (
    <ComponentDocTemplate
      title="Table"
      description="A responsive table component for displaying tabular data with support for sorting, selection, expansion, resizing, and mobile optimization."
      status={{ label: 'Stable', color: 'blue' }}
      importCode="import { Table } from '@/components/ui/Table';"
      rightNavItems={{
        items: [
          { id: 'core-variants', label: 'Core Variants' },
          { id: 'accessibility', label: 'Accessibility' },
          { id: 'api-reference', label: 'API Reference' },
          { id: 'playground', label: 'Playground' },
          { id: 'patterns', label: 'Best Practices' },
        ]
      }}
      renderCoreVariants={renderAllExamples}
      renderAccessibility={renderAccessibility}
      renderApiReference={renderApiReference}
      renderPlayground={renderPlayground}
      renderPatterns={renderPatterns}
      renderCompositions={() => null}
      renderUseCases={() => null}
    />
  );
} 