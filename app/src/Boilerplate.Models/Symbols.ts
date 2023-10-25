abstract class Symbols {
    public static HttpClient: symbol = Symbol.for('HttpClient');
    public static Logger: symbol = Symbol.for('Logger');
    public static AppSettings: symbol = Symbol.for('AppSettings');
    public static BoilerplateManager: symbol = Symbol.for('BoilerplateManager');
    public static BoilerplateRepository: symbol = Symbol.for('BoilerplateRepository');
    public static Calendar: symbol = Symbol.for('Calendar');
}

export default Symbols;
