import { inject, injectable } from 'inversify';
import IBoilerplateRepository from './Interfaces/IBoilerplateRepository';
import Symbols from '../Boilerplate.Models/Symbols';
import IAppSettings from '../Boilerplate.Models/Interfaces/IAppSettings';
import IHttpClient from './WebClient/Interfaces/IHttpClient';
import ITodo from '../Boilerplate.Models/Interfaces/ITodo';

@injectable()
class BoilerplateRepository implements IBoilerplateRepository {
    private readonly _appSettings: IAppSettings;
    private readonly _httpClient: IHttpClient;

    constructor(@inject(Symbols.AppSettings) appSettings: IAppSettings, @inject(Symbols.HttpClient) httpClient: IHttpClient) {
        this._appSettings = appSettings;
        this._httpClient = httpClient;
    }

    public async GetTodo(todoNumber: number): Promise<ITodo> {
        const url = `${this._appSettings.BoilerplateEndpoint}/todos/${todoNumber}`;
        const response = await this._httpClient.Get<ITodo>(url);
        return response;
    }
    
    public async SendTodo(todo: ITodo): Promise<ITodo> {
        const url = `${this._appSettings.BoilerplateEndpoint}/todos`;
        const response = await this._httpClient.Post<ITodo, ITodo>(url, todo);
        return response;
    }
}

export default BoilerplateRepository;
