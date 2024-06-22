export default interface JsonApiResponse<T> {
  results: T[];
  meta: Meta;
}

export interface Meta {
  page: number;
  pages: number;
  count: number;
}
