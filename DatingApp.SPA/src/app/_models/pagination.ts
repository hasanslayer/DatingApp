export interface Pagination {
  currentPage: number;
  itemsPerpage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  result: T; // store the users here
  pagination: Pagination;
}
