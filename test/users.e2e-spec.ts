import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ExecutionContext } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  const dto = {
    username: 'Hatem',
    password: '123',
    roles: [{ name: 'ADMIN' }],
  };

  const mockUsers = [
    { id: 1, username: 'Hatem', password: '123', roles: [{ name: 'ADMIN' }] },
  ];

  const mockUsersRepository = {
    find: jest.fn().mockResolvedValue(mockUsers),
    findOneOrFail: jest.fn().mockImplementation(async ({ where }) => {
      const param = where.id || where.username;
      try {
        if (param === where.id)
          return await {
            id: param,
            ...dto,
          };
        if (param === where.username)
          return await {
            username: param,
            ...dto,
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
      req.user = dto;
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
    await app.init();
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
      .expect({ id: 1, ...dto });
  });
});
