import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ApiResponse } from "../interfaces/movies.interfaces";

const AddFavMovieBody = z.object({
  adult: z.boolean(),
  genre_ids: z.optional(z.array(z.number())),
  id: z.number(),
  poster_path: z.optional(z.string()),
  release_date: z.optional(z.string()),
  title: z.optional(z.string()),
  vote_average: z.number()
});

type TAddFavMovieBody = z.infer<typeof AddFavMovieBody>;

export const validateAddFavMovie = (req: Request<{}, {}, TAddFavMovieBody>, res: Response<ApiResponse>, next: NextFunction) => {
  const result = AddFavMovieBody.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ success: false, errors: result.error.errors });
  }
  next();
};