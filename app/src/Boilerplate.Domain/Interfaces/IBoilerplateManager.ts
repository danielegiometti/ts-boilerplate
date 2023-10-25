import IBoilerPayload from '../../Boilerplate.Models/Interfaces/IBoilerPayload';
import ITodo from '../../Boilerplate.Models/Interfaces/ITodo';

interface IBoilerplateManager {
    Manage(payload: IBoilerPayload): Promise<ITodo>;
}

export default IBoilerplateManager;
