import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';

describe('TodoService', () => {
  let service: TodoService;
  let repo: jest.Mocked<TodoRepository>;

  beforeEach(async () => {
    repo = {
      findTodos: jest.fn(),
      createTodo: jest.fn(),
      findOne: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService, { provide: TodoRepository, useValue: repo }],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('finds all todos', async () => {
    const todos = [
      {
        id: 1,
        title: 'todo 1',
        description: 'todo description',
        completed: false,
      },
    ];

    repo.findTodos.mockResolvedValue(todos);

    const result = await service.findAll();

    expect(repo.findTodos).toHaveBeenCalled();
    expect(result).toEqual(todos);
  });

  it('create todos', async () => {
    const todos = {
      id: '1',
      title: 'todos',
      description: 'create todo',
      completed: false,
    };

    repo.createTodo.mockResolvedValue(todos);
    const dto = {
      title: 'todos',
      description: 'create todo',
    };

    const result = await service.create(dto);

    expect(result.completed).toBe(false);
    // expect(result).toEqual(todos);
    expect(repo.createTodo).toHaveBeenCalledWith(dto);
  });
});
