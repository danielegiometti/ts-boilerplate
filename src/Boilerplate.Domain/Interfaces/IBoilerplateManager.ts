import IBoilerPayload from '../../Boilerplate.Models/Interfaces/IBoilerPayload';

interface IBoilerplateManager {
    Manage(payload: IBoilerPayload): Promise<void>;
}

export default IBoilerplateManager;
