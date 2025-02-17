import { Router } from "express";
import { discoverMovies } from "../controllers/movies.controller";
const router = Router();

router.get('/', discoverMovies);

export default router;
