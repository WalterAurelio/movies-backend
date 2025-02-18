import { Request, Response } from "express";
import axiosClient from "../api/axios";
import { paths } from '../schemas/schema';
import { QueryParams } from "../interfaces/interfaces";

// Response obj
type SuccessResponse = paths['/3/discover/movie']['get']['responses'][200]['content']['application/json'];
type SuccessSearchMoviesResponse = paths['/3/search/movie']['get']['responses'][200]['content']['application/json'];

export const discoverMovies = async (req: Request, res: Response) => {
  try {
    const response = await axiosClient.get<SuccessResponse>('/discover/movie');
    res.json({ data: response.data });
  } catch (error) {
    const message = error instanceof Error ? `Error en la petición. ${error.message}` : 'Error en la petición.';
    res.status(500).json({ message });
  }
};

export const searchMovies = async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
  const { query } = req.query;

  try {
    const response = await axiosClient.get('/search/movie', {
      params: { query } as QueryParams
    });
    res.json({ data: response.data });
  } catch (error) {
    const message = error instanceof Error ? `Error en la petición. ${error.message}` : 'Error en la petición.';
    res.status(500).json({ message });
  }
}