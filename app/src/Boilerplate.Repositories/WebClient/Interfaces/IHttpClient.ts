import KeyValuePair from '../../../Boilerplate.Models/KeyValuePair';

interface IHttpClient {
    Get<T>(url: string): Promise<T>;
    Post<T, U>(url: string, body: T): Promise<U>;
    SetHeaders(headers: KeyValuePair<string>[]): void;
}

export default IHttpClient;
