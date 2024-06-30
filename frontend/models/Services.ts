import { ObjectId } from "bson";

export default interface JsonApiResponse<T> {
  data: T[];
  meta: Meta;
}

export interface Meta {
  page: number;
  pages: number;
  count: number;
}

export interface BaseFilters {
  pageNumber?: number;
  pageSize?: number;
}

export type ServiceListFn<T, Filters = {}, Params = {}> = (
  filters?: Filters,
  params?: Params
) => Promise<JsonApiResponse<T>>;

export type ServiceDetailFn<T, Filters = {}, Params = {}> = (
  id?: ObjectId,
  filters?: Filters,
  params?: Params
) => Promise<T>;
