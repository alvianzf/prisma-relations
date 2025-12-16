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
    } as jest.Mocked<TodoRepository>;

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

  it('creates a todo', async () => {
    const todo = {
      id: 1,
      title: 'todos',
      description: 'create todo',
      completed: false,
    };

    repo.createTodo.mockResolvedValue(todo);

    const dto = {
      title: 'todos',
      description: 'create todo',
    };

    const result = await service.create(dto);

    expect(repo.createTodo).toHaveBeenCalledWith(dto);
    expect(result).toEqual(todo);
    expect(result.completed).toBe(false);
  });
});
