import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
  };
  const mockRole = () => ({
    findAndCountAll: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    expect(
      await controller.create({
        username: 'Hatem',
        password: '123',
        roles: [{ name: 'ADMIN' }],
      }),
    ).toEqual({
      id: expect.any(Number),
      username: 'Hatem',
      password: '123',
      roles: [{ name: 'ADMIN' }],
    });
  });
});
