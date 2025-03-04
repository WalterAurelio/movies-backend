import { paths } from '../schemas/schema';
import { ZodIssue } from 'zod';

// My Api Response
export interface ApiResponse {
  success: boolean;
  data?: unknown;
  message?: string;
  errors?: unknown;
}

// Movies Types
export type DiscoverMoviesQueryParams = paths['/3/discover/movie']['get']['parameters']['query'];
export type MovieDetailsPathParams = paths['/3/movie/{movie_id}']['get']['parameters']['path'];
export type MovieDetailsQueryParams = paths['/3/movie/{movie_id}']['get']['parameters']['query'];

// Add Favorite Movie Body Type
type DiscoverMovieResults = paths['/3/discover/movie']['get']['responses'][200]['content']['application/json']['results'];
type ExtractFromArray<T> = T extends Array<infer U> ? U : never;
type DiscoverMovie = ExtractFromArray<DiscoverMovieResults>;
export type AddFavMovieBody = Omit<DiscoverMovie, 'backdrop_path' | 'original_language' | 'original_title' | 'overview' | 'popularity' | 'video' | 'vote_count'>;

// Delete Favorite Movie Type
export type DeleteFavMovieBody = {
  id: number;
}

// Search Types
export type SearchQueryParams = paths['/3/search/movie']['get']['parameters']['query'];