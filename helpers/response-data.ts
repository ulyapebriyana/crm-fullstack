export type MetaData = {
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SimpleData = Record<string, any>;

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type PaginatedData<T> = {
  meta: MetaData;
  result: T[];
};

export function createApiResponse<T>(
  success: boolean,
  message: string,
  data: SimpleData | PaginatedData<T>
): ApiResponse<SimpleData | PaginatedData<T>> {
  return {
    success,
    message,
    data,
  };
}
