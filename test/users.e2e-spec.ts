import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ExecutionContext,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

// * This test integrates the users controller and service, making the components work together
describe('UsersController (e2e)', () => {
  let app: INestApplication;

  const userDTO = {
    username: 'Hatem',
    password: '123',
    roles: [{ name: 'ADMIN' }],
  };

  const faultyUserDTO = {
    username: 44645455,
    password: '123',
    roles: [{ name: 'ADMIN' }],
  };

  const mockUsers = [
    { id: 1, username: 'Hatem', password: '123', roles: [{ name: 'ADMIN' }] },
  ];

  const mockUsersRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation(
      async (dto) =>
        await {
          id: Date.now(),
          ...dto,
        },
    ),
    find: jest.fn().mockResolvedValue(mockUsers),
    findOneOrFail: jest
      .fn()
      .mockImplementation(async ({ where, relations }) => {
        const param = where.id || where.username;
        const roles = relations[0];
        try {
          if (param === where.id)
            return await {
              id: param,
              username: 'Hatem',
              password: '123',
              [roles]: [{ name: 'ADMIN' }],
            };
          if (param === where.username)
            return await {
              id: 1,
              username: param,
              password: '123',
              [roles]: [{ name: 'ADMIN' }],
            };
        } catch (err) {
          throw err;
        }
      }),
  };
  const mockAuthenticationGuard = {
    // * Here we have intercepted the request using execution context, replacing the old values
    // * with a new user with a specific role to bypass the role guard
    // TODO: figure out whether we need to also mock the roles guard or if using the actual guard is fine
    canActivate: jest.fn().mockImplementation((context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest();
      req.user = userDTO;
      return true;
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .overrideGuard(AuthGuard('jwt'))
      .useValue(mockAuthenticationGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  it('/users (POST)', async () => {
    return await request(app.getHttpServer())
      .post('/users')
      .send(userDTO)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          ...userDTO,
        });
      });
  });

  it('/users (POST) --> 400 on validation error', async () => {
    return await request(app.getHttpServer())
      .post('/users')
      .send(faultyUserDTO)
      .expect('Content-Type', /json/)
      .expect(400, {
        statusCode: 400,
        message: ['username must be a string'],
        error: 'Bad Request',
      });
  });

  it('/users (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(mockUsers);
  });

  it('/users/id/1 (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/users/id/1')
      .expect(200)
      .expect({ id: 1, ...userDTO });
  });
});
