import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const dto = {
    username: 'Hatem',
    password: '123',
    roles: [{ name: 'ADMIN' }],
  };

  const users = [
    {
      id: 1,
      username: 'Hatem',
      password: '123',
      roles: [{ name: 'ADMIN' }],
    },
    {
      id: 2,
      username: 'Chawki',
      password: '321',
      roles: [{ name: 'USER' }],
    },
    {
      id: 3,
      username: '3absi',
      password: 'messitheGOAT',
      roles: [{ name: 'USER' }],
    },
  ];

  const mockUsersService = {
    create: jest.fn().mockImplementation(async (dto) => {
      return await {
        id: Date.now(),
        ...dto,
      };
    }),
    findAll: jest.fn().mockImplementation(() => {
      return users;
    }),
    findOneById: jest.fn().mockImplementation((id) => {
      return users.filter((user) => user.id === id)[0];
    }),
    findOneByUsername: jest.fn().mockImplementation((username) => {
      return users.filter((user) => user.username === username)[0];
    }),
    update: jest.fn().mockImplementation((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
    remove: jest.fn().mockImplementation((id) => {
      return users.filter((user) => user.id === id)[0];
    }),
  };

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
    expect(await controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });

    expect(mockUsersService.create).toHaveBeenCalledWith(dto);
  });

  it('should get all the users', async () => {
    expect(await controller.findAll()).toEqual(users);

    expect(mockUsersService.findAll).toHaveBeenCalled();
  });

  it('should get a user by their id', async () => {
    expect(await controller.findOneById('1')).toEqual({
      id: 1,
      ...dto,
    });

    expect(mockUsersService.findOneById).toHaveBeenCalled();
  });

  it('should get a user by their name', async () => {
    expect(await controller.findOneByUsername('Hatem')).toEqual({
      id: 1,
      ...dto,
    });

    expect(mockUsersService.findOneByUsername).toHaveBeenCalled();
  });

  it('should update a user', async () => {
    expect(await controller.update('1', dto)).toEqual({
      id: 1,
      ...dto,
    });

    expect(mockUsersService.update).toHaveBeenCalled();
  });

  it('should delete a user', async () => {
    expect(await controller.remove('1')).toEqual({
      id: 1,
      ...dto,
    });

    expect(mockUsersService.remove).toHaveBeenCalled();
  });
});
