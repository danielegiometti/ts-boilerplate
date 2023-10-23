/*
    This is only used locally for testing purposes
*/
import 'reflect-metadata';
import * as express from 'express';
import { interfaces, controller, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import Symbols from '../../Boilerplate.Models/Symbols';
import IBoilerplateManager from '../../Boilerplate.Domain/Interfaces/IBoilerplateManager';
import IBoilerPayload from '../../Boilerplate.Models/Interfaces/IBoilerPayload';

@controller("/home")
export class HomeController implements interfaces.Controller {

    constructor(@inject(Symbols.BoilerplateManager) private readonly boilerplateManager: IBoilerplateManager) { }

    @httpPost("/boiler")
    public async boiler (@request() req: express.Request, @response() res: express.Response) {
        try {

            console.log(`BODY REQUEST: ${JSON.stringify(req.body)}`);

            const payload = req.body as IBoilerPayload;

            const response = await this.boilerplateManager.Manage(payload);

            return response;
        } catch(error) {
            res.status(400).json(error);
        }
    }  
}