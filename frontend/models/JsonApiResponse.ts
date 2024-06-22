export default interface JsonApiResponse<T> {
  data: T[];
  meta: Meta;
}

export interface Meta {
  page: number;
  pages: number;
  count: number;
}
