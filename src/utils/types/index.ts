/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SubmenuItem {
  label: string;
  action: string;
  rout?: string;
}

export interface HandleSubmenuClick {
  (parentId: string, action: string): void;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  hasSubmenu: boolean;
  submenuItems?: SubmenuItem[];
  rout?: string;
}

export type ExpandedItems = Record<string, boolean>;

export interface TableColumn<T> {
  header: string;
  accessKey: keyof T;
  className?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  className?: string;
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
}

export interface Officer {
  name: string;
  rank: string;
  date: string;
}

export interface Accommodation {
  blockNo: string;
  roomNo: string;
}

export interface SickLeave {
  name: string;
  rank: string;
  date_expired: string;
}

export interface SignalMember {
  name: string;
  rank: string;
  marital_status: string;
  army_number: string;
}
