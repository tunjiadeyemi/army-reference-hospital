/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FileData {
  file_number: string;
  file_title: string;
  uploads: File | null;
}

export interface MainTableColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
}

export interface MainTableData {
  id: number;
  fileNumber: string;
  fileTitle: string;
  attachment?: boolean;
  [key: string]: any; // Allow additional properties
}

export interface MainDataTableProps<T> {
  data: any[];
  columns: MainTableColumn<T>[];
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
  showExportButtons?: boolean;
  searchable?: boolean;
  className?: string;
  onCellClick?: (params: {
    value: any;
    row: T;
    column: MainDataTableProps<T>['columns'][number];
    rowIndex: number;
    colIndex: number;
  }) => void;
}

export interface MainPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// --- modal side
export interface FileAttachment {
  id: string;
  name: string;
  size: string;
  date: string;
  type: 'pdf' | 'doc' | 'image';
}

export interface AttachedFileData {
  id: number | undefined;
  file_number: string;
  file_title: string;
  uploads: string[];
  dateCreated: string;
  timeCreated: string;
  attachments: FileAttachment[];
}


