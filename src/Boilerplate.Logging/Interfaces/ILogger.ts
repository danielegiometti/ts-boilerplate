interface ILogger {
    LogInfo(info: string): void;
    Commit<T>(executionContext: string, payload: T): void;
    LogException(error: Error): void;
    LogError(info: string): void;
}

export default ILogger;
