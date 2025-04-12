import { Router } from 'express';
import { discover, getMovieDetailsById, addFavoriteMovie, getFavoriteMovies, deleteFavoriteMovie, search, getMovieGenres } from '../controllers/movies.controller';
const router = Router();

router.get('/discover', discover('/discover/movie'));

router.get('/movie/:movie_id', getMovieDetailsById);
router.post('/favorites', addFavoriteMovie);
router.get('/favorites', getFavoriteMovies);
router.delete('/favorites', deleteFavoriteMovie);
router.get('/search', search);

router.get('/genres', getMovieGenres);

export default router;
