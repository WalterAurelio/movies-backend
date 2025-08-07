import { IUserService } from '../services/user.service';
import { jest } from '@jest/globals';
import makeApp from '../app';
import makeController from '../controllers/auth.controller';
import request, { Response } from 'supertest';
import { RegisterBody } from '../interfaces/auth.interfaces';
import UserResponseDTO from '../dtos/UserResponseDTO';

const mockService = {
  registerUser: jest.fn<IUserService['registerUser']>(),
  getUserByEmail: jest.fn<IUserService['getUserByEmail']>()
};

const controller = makeController(mockService);
const app = makeApp(controller);
const payloadMain: RegisterBody = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'johndoe@gmail.com',
  password: '12345678'
};

describe('POST /register', () => {

  describe('given a body containing valid new user data', () => {
    let response: Response;
    const payload = payloadMain;

    beforeEach(async () => {
      jest.resetAllMocks();
      mockService.registerUser.mockResolvedValue({ userId: '2' });
      response = await request(app).post('/api/auth/register').send(payload);
    });
    
    test('response has status code 200', () => {
      expect(response.statusCode).toBe(200);
    });

    test('response specifies "json" in "content-type" header', () => {
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
    
    test('response has userId defined', () => {
      const body = response.body as { data: UserResponseDTO };      
      expect(body.data.userId).toBeDefined();
    });
  });

  describe('given a body containing existing user data', () => {
    let response: Response;
    const payload = payloadMain;

    beforeEach(async () => {
      jest.resetAllMocks();
      mockService.getUserByEmail.mockResolvedValue({ userId: '2' });
      response = await request(app).post('/api/auth/register').send(payload);
    });

    test('response has status code 409', () => {
      expect(response.statusCode).toBe(409);
    });
  });

  /* describe('given a body that has missing fields', () => {
    let response: Response;
    const payloadArr: Partial<RegisterBody>[] = [
      {},
      { firstname: payloadMain.firstname },
      { lastname: payloadMain.lastname },
      { email: payloadMain.email },
      { password: payloadMain.password },
    ];

    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('response has status code 400', async () => {
      for(const payload of payloadArr) {
        response = await request(app).post('/api/auth/register').send(payload);
        expect(response.statusCode).toBe(400);
      }
    });
  }); */
});