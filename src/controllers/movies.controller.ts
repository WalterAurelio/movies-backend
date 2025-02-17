import { Request, Response } from "express";
import axiosClient from "../api/axios";
import { paths } from '../schemas/schema';

// Response obj
type SuccessResponse = paths['/3/discover/movie']['get']['responses'][200]['content']['application/json'];

export const discoverMovies = async (req: Request, res: Response) => {
  try {
    const response = await axiosClient.get<SuccessResponse>('/discover/movie');
    res.json({ data: response.data });
  } catch (error) {
    const message = error instanceof Error ? `Error en la petición. ${error.message}` : 'Error en la petición.';
    res.status(500).json({ message });
  }
};