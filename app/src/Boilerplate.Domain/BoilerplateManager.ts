import { inject, injectable } from 'inversify';
import ILogger from '../Boilerplate.Logging/Interfaces/ILogger';
import IBoilerPayload from '../Boilerplate.Models/Interfaces/IBoilerPayload';
import Symbols from '../Boilerplate.Models/Symbols';
import IBoilerplateRepository from '../Boilerplate.Repositories/Interfaces/IBoilerplateRepository';
import ICalendar from './Common/Interfaces/ICalendar';
import IBoilerplateManager from './Interfaces/IBoilerplateManager';
import ITodo from '../Boilerplate.Models/Interfaces/ITodo';

@injectable()
class BoilerplateManager implements IBoilerplateManager {
    private readonly _calendar: ICalendar;
    private readonly _logger: ILogger;
    private readonly _boilerplateRepository: IBoilerplateRepository;

    constructor(
        @inject(Symbols.Calendar) calendar: ICalendar,
        @inject(Symbols.Logger) logger: ILogger,
        @inject(Symbols.BoilerplateRepository) boilerplateRepository: IBoilerplateRepository
    ) {
        this._calendar = calendar;
        this._logger = logger;
        this._boilerplateRepository = boilerplateRepository;
    }

    public async Manage(payload: IBoilerPayload): Promise<ITodo> {
        try {
            this._logger.LogInfo('BoilerplateManager: Doing boilerplate things');
            const response = await this._boilerplateRepository.GetTodo(payload.prop1);

            // await this._boilerplateRepository.SendTodo(response);
            
            this._logger.Commit(`BoilerplateManager: Just boilerplate things at time: ${this._calendar.Now().toISOString()}`, payload);

            return response;
        } catch (e) {
            let error = e as Error;
            this._logger.LogError(error.message);
            this._logger.LogException(error);
            this._logger.Commit('BoilerplateManager: Just boilerplate things', payload);
            throw error;
        }
    }
}

export default BoilerplateManager;
