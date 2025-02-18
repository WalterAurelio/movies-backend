import { paths } from "../schemas/schema";

export interface LoginBody {
  email: string;
  password: string;
};

export interface RegisterBody extends LoginBody {
  firstname: string;
  lastname: string;
}

export interface RequestCookies {
  jwt?: string;
}

// Query Interface

export type QueryParams = paths['/3/search/movie']['get']['parameters']['query'];