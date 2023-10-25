import axios, { AxiosRequestConfig } from 'axios';
import { injectable } from 'inversify';
import IHttpClient from './Interfaces/IHttpClient';
import KeyValuePair from '../../Boilerplate.Models/KeyValuePair';

@injectable()
class HttpClient implements IHttpClient {
    private _requestConfig = {} as AxiosRequestConfig;

    public SetHeaders(headers: KeyValuePair<string>[]): void {
        const headerCollection = headers.reduce((x, y) => ({ ...x, [y.Key]: y.Value }), {});
        this._requestConfig.headers = headerCollection;
    }

    public async Get<T>(url: string): Promise<T> {
        const response = await axios.get<T>(url, this._requestConfig);
        if (response.status !== 200) throw new Error(`Get was not successful, status code was ${response.status}`);
        return response.data;
    }

    public async Post<T, U>(url: string, body: T): Promise<U> {
        const response = await axios.post<U>(url, body, this._requestConfig);
        if (!response.status.toString().startsWith('2')) throw new Error(`Post was not successful, status code was ${response.status}`);
        return response.data;
    }
}

export default HttpClient;
