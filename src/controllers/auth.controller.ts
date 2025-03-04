import User from "../models/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { RegisterBody, LoginBody, RequestCookies } from "../interfaces/auth.interfaces";

export const registerUser = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const duplicated = await User.findOne({ email });
    if (duplicated) return res.status(409).json({ message: 'Ya existe un usuario registrado con este correo electrónico' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    const message = error instanceof Error ? `Error en la creación del usuario. ${error.message}` : 'Error en la creación del usuario.';
    res.status(500).json({ message });
  }
};

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { email, password } = req.body;
  const cookies: RequestCookies = req.cookies;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) return res.status(401).json({ message: 'No existe un usuario registrado con este email.' });
  
    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword) return res.status(401).json({ message: 'La contraseña ingresada es incorrecta.' });
  
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { email: foundUser.email, roles },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '10m' }
    );
    const newRefreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '1d' }
    );
  
    let newRefreshTokenArray = !cookies?.jwt ? foundUser.refreshToken : foundUser.refreshToken?.filter(rt => rt !== cookies.jwt);
  
    if (cookies.jwt) {
      const refreshToken = cookies.jwt;
      const foundUser = await User.findOne({ refreshToken });
      if (!foundUser) {
        newRefreshTokenArray = [];
      }
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'none' });
    }
  
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await foundUser.save();
    res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'none', maxAge: 1000 * 60 * 60 * 24 });
    res.json({ accessToken, roles });
  } catch (error) {
    const message = error instanceof Error ? `Error en el inicio de sesión. ${error.message}` : 'Error en el inicio de sesión.';
    res.status(500).json({ message });
  }
};

export const logout = async (req: Request, res: Response) => {
  const cookies: RequestCookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none' });

  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(204);

  foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
  await foundUser.save();
  res.sendStatus(204);
};

export const refresh = async (req: Request, res: Response) => {
  const cookies: RequestCookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none' });

  try {
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (err, decoded) => {
        if (err) return res.sendStatus(401);

        const decodedPayload = decoded as { email: string };
        const hackedUser = await User.findOne({ email: decodedPayload?.email });
        if (hackedUser) {
          hackedUser.refreshToken = [];
          await hackedUser.save();
        }
      });
      return res.sendStatus(401);
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (err, decoded) => {
      const decodedPayload = decoded as { email: string };
      if (err || foundUser.email !== decodedPayload?.email) {
        foundUser.refreshToken = newRefreshTokenArray;
        await foundUser.save();
        return res.sendStatus(401);
      }

      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        { email: foundUser.email, roles },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: '10m' }
      );
      const newRefreshToken = jwt.sign(
        { email: foundUser.refreshToken },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: '1d' }
      );

      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.save();
      res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'none', maxAge: 1000 * 60 * 60 * 24 });
      res.json({ accessToken, roles });
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido.';
    res.status(500).json({ message });
  }
};