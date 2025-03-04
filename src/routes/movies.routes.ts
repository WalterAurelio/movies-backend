import { Router } from "express";
import { discover, getMovieDetailsById, addFavoriteMovie, getFavoriteMovies, deleteFavoriteMovie, search } from "../controllers/movies.controller";
const router = Router();

router.get('/discover', discover('/discover/movie'));

router.get('/movie/:movie_id', getMovieDetailsById);
router.post('/favorites', addFavoriteMovie);
router.get('/favorites', getFavoriteMovies);
router.delete('/favorites', deleteFavoriteMovie);
router.get('/search', search);

export default router;