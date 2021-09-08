export interface PaginationOptions {
  sortBy?: 'name' | 'country' | 'winnings' | '';
  sortOrder?: 'asc' | 'desc';
  from?: number;
  size?: number;
}

export interface PaginationResponse<T> {
  size: number;
  from: number;
  total: number;
  items: readonly T[];
}
