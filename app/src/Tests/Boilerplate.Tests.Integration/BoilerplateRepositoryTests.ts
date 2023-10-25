import ITodo from '../../Boilerplate.Models/Interfaces/ITodo';
import Symbols from '../../Boilerplate.Models/Symbols';
import IBoilerplateRepository from '../../Boilerplate.Repositories/Interfaces/IBoilerplateRepository';
import IOC from '../../Boilerplate/IOCContainer/IOC';

describe('BoilerplateRepository Integration Tests', () => {
    let sut: IBoilerplateRepository;

    beforeEach(() => {
        const ioc = new IOC();
        const instance = ioc.GetInstance();
        sut = instance.get<IBoilerplateRepository>(Symbols.BoilerplateRepository);
    });

    it('GetTodo should successfully get Todo', async () => {
        // Arrange
        const todoNo = 1;

        // Act
        const response = await sut.GetTodo(todoNo);

        // Assert
        expect(response).not.toBeNull();
        expect(response.id).toBe(todoNo);
    });

    it('SendTodo should successfully POST Todo', async () => {
        // Arrange
        const todo = { completed: true, id: 1000, userId: 1000, title: 'this is a title' } as ITodo;

        // Act
        const response = await sut.SendTodo(todo);

        // Assert
        expect(response).not.toBeNull();
    });
});
