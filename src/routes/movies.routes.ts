import { Router } from "express";
import { discoverMovies, searchMovies } from "../controllers/movies.controller";
const router = Router();

router.get('/discover', discoverMovies);
router.get('/search', searchMovies);

export default router;
