import { Router } from 'express';
import { discover, getMovieDetailsById, addFavoriteMovie, getFavoriteMovies, deleteFavoriteMovie, search, getMovieGenres, getMovieVideosById } from '../controllers/movies.controller';
const router = Router();

router.get('/discover', discover('/discover/movie'));

router.get('/movie/:movie_id', getMovieDetailsById);
router.post('/favorites', addFavoriteMovie);
router.get('/favorites', getFavoriteMovies);
router.delete('/favorites', deleteFavoriteMovie);
router.get('/search', search);

router.get('/genres', getMovieGenres);
router.get('/videos/:movie_id', getMovieVideosById);

export default router;
