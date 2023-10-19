import { SQSEvent } from 'aws-lambda';
import Symbols from '../Boilerplate.Models/Symbols';
import IOC from './IOCContainer/IOC';
import IBoilerplateManager from '../Boilerplate.Domain/Interfaces/IBoilerplateManager';
import IBoilerPayload from '../Boilerplate.Models/Interfaces/IBoilerPayload';

export const initialiseContainer = () => {
    const ioc = new IOC();
    return ioc.GetInstance();
};

export const handler = async (event: SQSEvent): Promise<void> => {
    const containerInstance = initialiseContainer();
    const mutationManager = containerInstance.get<IBoilerplateManager>(Symbols.BoilerplateManager);

    for (const record of event.Records) {
        const order = JSON.parse(record.body) as IBoilerPayload;
        await mutationManager.Manage(order);
    }
};
