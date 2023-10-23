import { APIGatewayEvent, ProxyResult, SQSEvent } from 'aws-lambda';
import Symbols from '../Boilerplate.Models/Symbols';
import IOC from './IOCContainer/IOC';
import IBoilerplateManager from '../Boilerplate.Domain/Interfaces/IBoilerplateManager';
import IBoilerPayload from '../Boilerplate.Models/Interfaces/IBoilerPayload';

const initialiseContainer = async () => await new IOC().GetInstance();

export const handler = async (event: SQSEvent): Promise<void> => {
    const containerInstance = await initialiseContainer();
    const mutationManager = containerInstance.get<IBoilerplateManager>(Symbols.BoilerplateManager);

    for (const record of event.Records) {
        const order = JSON.parse(record.body) as IBoilerPayload;
        await mutationManager.Manage(order);
    }
};

export const createBoiler = async (event: APIGatewayEvent): Promise<void | ProxyResult> => {

    const containerInstance = await initialiseContainer();
    const mutationManager = containerInstance.get<IBoilerplateManager>(Symbols.BoilerplateManager);

    const payload: IBoilerPayload = JSON.parse(event.body!) as IBoilerPayload;
    
    return await mutationManager.Manage(payload);
};
