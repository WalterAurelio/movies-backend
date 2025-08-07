/* import makeApp from '../app';
import makeController from '../controllers/auth.controller';
import request from 'supertest';
import { jest } from '@jest/globals';
import { RegisterBody } from '../interfaces/auth.interfaces';
import UserResponseDTO from '../dtos/UserResponseDTO';
 */

import { IUserService } from '../services/user.service';
import { jest } from '@jest/globals';
import makeApp from '../app';
import makeController from '../controllers/auth.controller';
import request from 'supertest';
import { RegisterBody } from '../interfaces/auth.interfaces';
import UserResponseDTO from '../dtos/UserResponseDTO';

const mockService: IUserService = {
  registerUser: jest.fn<IUserService['registerUser']>().mockResolvedValue({
    userId: '2'
  }),
  getUserByEmail: jest.fn<IUserService['getUserByEmail']>()
}

const controller = makeController(mockService);
const app = makeApp(controller);

describe('POST /register', () => {
  describe('given a valid body', () => {

    test('responds with 200 status code', async () => {
      const payload: RegisterBody = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com',
        password: '12345678'
      };
      const response = await request(app).post('/api/auth/register').send(payload);
      const body = response.body as { data: UserResponseDTO };

      expect(response.statusCode).toBe(200);
      expect(body.data.userId).toBe('2');
      expect(mockService.registerUser).toHaveBeenCalledWith(payload);
    });
  });
});