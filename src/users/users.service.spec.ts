import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  const dto = {
    username: 'Hatem',
    password: '123',
    roles: [{ name: 'ADMIN' }],
  };

  const mockUsersRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation(async (dto) => {
      return await {
        id: Date.now(),
        ...dto,
      };
    }),
    find: jest.fn().mockImplementation(async () => {
      return await [
        {
          id: Date.now(),
          ...dto,
        },
      ];
    }),
    findOneOrFail: jest.fn().mockImplementation(async ({ where }) => {
      const param = where.id || where.username;
      try {
        return await {
          param,
          ...dto,
        };
      } catch (err) {
        throw err;
      }
    }),
    remove: jest.fn().mockImplementation(async (id) => {
      return await {
        id,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return it', async () => {
    expect(await service.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });

    // * Asserting that the create and save methods are called would probably cause problems
    // * if we used insert from the repository instead of create, so better not assert
  });

  it('should return all users', async () => {
    expect(await service.findAll()).toEqual([
      {
        id: expect.any(Number),
        ...dto,
      },
    ]);
  });

  it('should find one user by its id', async () => {
    expect(await service.findOneById(1)).toEqual({
      id: 1,
      ...dto,
    });

    expect(mockUsersRepository.findOneOrFail).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should find one user by its username', async () => {
    expect(await service.findOneByUsername('Hatem')).toEqual({
      id: 1,
      ...dto,
    });

    expect(mockUsersRepository.findOneOrFail).toHaveBeenCalledWith({
      where: { username: 'Hatem' },
    });
  });

  it('should find a user by its id then update its information and return it', async () => {
    expect(await service.update(1, dto)).toEqual({
      id: 1,
      ...dto,
    });

    expect(mockUsersRepository.findOneOrFail).toHaveBeenCalledWith(1);
    expect(mockUsersRepository.save).toHaveBeenCalled();
  });

  it('should remove a user then return its record', async () => {
    expect(await service.remove(1)).toEqual({
      id: 1,
      ...dto,
    });
  });
});
