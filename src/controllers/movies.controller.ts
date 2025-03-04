import { Request, Response } from "express";
import axiosClient from "../api/axios";
import { ApiResponse, DiscoverMoviesQueryParams, MovieDetailsPathParams, MovieDetailsQueryParams, AddFavMovieBody, DeleteFavMovieBody, SearchQueryParams } from "../interfaces/movies.interfaces";
import User from "../models/User";

export const discover = (path: string) => {
  return async (req: Request<{}, {}, {}, DiscoverMoviesQueryParams>, res: Response<ApiResponse>) => {

    try {
      const response = await axiosClient.get(path, {
        params: {
          language: 'es-US',
          page: req.query?.page,
          sort_by: req.query?.sort_by,
          with_genres: req.query?.with_genres,
          "vote_average.gte": req.query?.["vote_average.gte"]
        } as DiscoverMoviesQueryParams
      });
      res.json({ success: true, data: response.data });
    } catch (error) {
      const message = error instanceof Error ? `Error en la petición. ${error.message}` : 'Error en la petición.';
      res.status(500).json({ success: false, message });
    }
  };
};

export const getMovieDetailsById = async (req: Request<MovieDetailsPathParams, {}, {}, MovieDetailsQueryParams>, res: Response<ApiResponse>) => {
  const { movie_id } = req.params;

  try {
    const response = await axiosClient.get(`movie/${movie_id}`, {
      params: {
        language: 'es-US',
        append_to_response: req.query?.append_to_response
      } as MovieDetailsQueryParams
    });
    res.json({ success: true, data: response.data });
  } catch (error) {
    const message = error instanceof Error ? `Error en la petición. ${error.message}` : 'Error en la petición.';
    res.status(500).json({ success: false, message });
  }
};

export const addFavoriteMovie = async (req: Request<{}, {}, AddFavMovieBody>, res: Response<ApiResponse>) => {
  const { id } = req.body;
  const email = req.email;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.sendStatus(401);

    // Chequeamos si la película ya pertenece a favoritos
    const alreadyInFavorites = foundUser.favorites.movies.some(movie => movie.id === id);
    if (alreadyInFavorites) return res.status(409).json({ success: false, message: 'La película ya pertenece a su lista de favoritos.' });

    const newFavorite = { ...req.body };
    foundUser.favorites.movies.push(newFavorite);
    await foundUser.save();
    res.json({ success: true, message: 'Añadido a favoritos con éxito.', data: foundUser.favorites.movies });
  } catch (error) {
    const message = error instanceof Error ? `Error al agregar a favoritos. ${error.message}` : 'Error al agregar a favoritos.';
    res.status(500).json({ success: false, message });
  }
};

export const getFavoriteMovies = async (req: Request, res: Response<ApiResponse>) => {
  const email = req.email;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.sendStatus(401);

    res.json({ success: true, data: foundUser.favorites.movies });
  } catch (error) {
    const message = error instanceof Error ? `Error en la petición. ${error.message}` : 'Error en la petición.';
    res.status(500).json({ success: false, message });
  }
};

export const deleteFavoriteMovie = async (req: Request<{}, {}, DeleteFavMovieBody>, res: Response<ApiResponse>) => {
  const { id } = req.body;
  const email = req.email;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.sendStatus(401);

    const inFavorites = foundUser.favorites.movies.some(movie => movie.id === id);
    if (!inFavorites) return res.status(409).json({ success: false, message: 'La película no pertenece a su lista de favoritos. ' });

    const newFavoritesArray = foundUser.favorites.movies.filter(movie => movie.id !== id);
    foundUser.favorites.movies = [...newFavoritesArray];
    await foundUser.save();
    res.json({ success: true, message: 'Eliminado de favoritos con éxito.', data: foundUser.favorites.movies });
  } catch (error) {
    const message = error instanceof Error ? `Error al eliminar de favoritos. ${error.message}` : 'Error al eliminar de favoritos.';
    res.status(500).json({ success: false, message });
  }

}

export const search = async (req: Request<{}, {}, {}, SearchQueryParams>, res: Response<ApiResponse>) => {
  const { query, page } = req.query;

  try {
    const response = await axiosClient.get('search/movie', {
      params: {
        query,
        language: 'es-US',
        page
      } as SearchQueryParams
    });
    /* const tvshows = axiosClient.get('/search/tv', {
      params: {
        query,
        language: 'es-US',
        page
      } as SearchQueryParams
    });
    const people = axiosClient.get('/search/person', {
      params: {
        query,
        language: 'es-US',
        page
      } as SearchQueryParams
    }); */

    /* const result = await Promise.all([movies, tvshows, people]);
    const data = result.map(r => r.data); */
    res.json({ success: true, data: response.data });
  } catch (error) {
    const message = error instanceof Error ? `Error en la petición. ${error.message}` : 'Error en la petición.';
    res.status(500).json({ success: false, message });
  }
};