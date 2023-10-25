import ITodo from '../../Boilerplate.Models/Interfaces/ITodo';

interface IBoilerplateRepository {
    GetTodo(todoNumber: number): Promise<ITodo>;
    SendTodo(todo: ITodo): Promise<ITodo>;
}

export default IBoilerplateRepository;
