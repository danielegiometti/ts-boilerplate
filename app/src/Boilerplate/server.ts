/*
    This is only used locally for testing purposes
*/
import 'reflect-metadata';
import {urlencoded, json} from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';

import "./Controllers/HomeController";
import IOC from './IOCContainer/IOC';

const initialiseContainer = async () => await new IOC().GetInstance();

initialiseContainer().then((container) => {
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
    
        app.get('/', (req, res) => {
            res.send('Hello from BoilerPlate :D');
        });    
    
        // add body parser
        app.use(urlencoded({
            extended: true
        }));
        app.use(json());
    });
    
    const app = server.build();
    
    app.listen(5000, () => console.log('Server running on port 5000...'))
})


