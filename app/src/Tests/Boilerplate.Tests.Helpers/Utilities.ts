const toPromiseResponse = <T>(arg: T): Promise<T> =>
    new Promise((resolve) => {
        resolve(arg);
    });

export default toPromiseResponse;
