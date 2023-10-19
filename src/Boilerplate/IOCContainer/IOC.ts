import 'reflect-metadata';
import { ExceptionlessClient } from 'exceptionless';
import { Container } from 'inversify';
import * as appSettings from '../Settings/appSettings.json';
import Symbols from '../../Boilerplate.Models/Symbols';
import Calendar from '../../Boilerplate.Domain/Common/Calendar';
import ICalendar from '../../Boilerplate.Domain/Common/Interfaces/ICalendar';
import AppSettings from '../../Boilerplate.Models/AppSettings';
import IAppSettings from '../../Boilerplate.Models/Interfaces/IAppSettings';
import ILogger from '../../Boilerplate.Logging/Interfaces/ILogger';
import Logger from '../../Boilerplate.Logging/Logger';
import IHttpClient from '../../Boilerplate.Repositories/WebClient/Interfaces/IHttpClient';
import HttpClient from '../../Boilerplate.Repositories/WebClient/HttpClient';
import BoilerplateManager from '../../Boilerplate.Domain/BoilerplateManager';
import IBoilerplateManager from '../../Boilerplate.Domain/Interfaces/IBoilerplateManager';
import IBoilerplateRepository from '../../Boilerplate.Repositories/Interfaces/IBoilerplateRepository';
import BoilerplateRepository from '../../Boilerplate.Repositories/BoilerplateRepository';

class IOC {
    private _container: Container;

    public GetInstance() {
        if (this._container != null) return this._container;
        const container = new Container();
        this.ConfigureExceptionless(container);
        container.bind<IHttpClient>(Symbols.HttpClient).to(HttpClient);
        container.bind<IAppSettings>(Symbols.AppSettings).toConstantValue(new AppSettings(appSettings));
        container.bind<ICalendar>(Symbols.Calendar).to(Calendar);
        container.bind<IBoilerplateRepository>(Symbols.BoilerplateRepository).to(BoilerplateRepository);
        container.bind<IBoilerplateManager>(Symbols.BoilerplateManager).to(BoilerplateManager);
        this._container = container;
        return container;
    }

    private ConfigureExceptionless(container: Container): void {
        const client = new ExceptionlessClient({
            apiKey: appSettings.Exceptionless.ApiKey,
            serverUrl: appSettings.Exceptionless.ServerUrl,
            submissionBatchSize: 100,
        });
        container.bind<ILogger>(Symbols.Logger).toConstantValue(new Logger(client));
    }
}

export default IOC;
