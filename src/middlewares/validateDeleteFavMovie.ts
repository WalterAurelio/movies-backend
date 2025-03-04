import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ApiResponse } from "../interfaces/movies.interfaces";

const DeleteFavMovieBody = z.object({
  id: z.number()
});

type TDeleteFavMovieBody = z.infer<typeof DeleteFavMovieBody>;

export const validateDeleteFavMovie = (req: Request<{}, {}, TDeleteFavMovieBody>, res: Response<ApiResponse>, next: NextFunction) => {
  const result = DeleteFavMovieBody.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ success: false, errors: result.error.errors });
  }
  next();
}