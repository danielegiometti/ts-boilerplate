/* eslint-disable @typescript-eslint/no-explicit-any */
import IAppSettings from './Interfaces/IAppSettings';

class AppSettings implements IAppSettings {
    public TestSetting1: string;
    public TestSetting2: string;
    public BoilerplateEndpoint: string;

    constructor(appSettings: any) {
        this.TestSetting1 = appSettings.TestSetting1;
        this.TestSetting2 = appSettings.TestSetting2;
        this.BoilerplateEndpoint = appSettings.BoilerplateEndpoint;
    }
}

export default AppSettings;
