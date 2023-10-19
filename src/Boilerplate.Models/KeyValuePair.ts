class KeyValuePair<U> {
    public Key: string;
    public Value: U;

    constructor(key: string, value: U) {
        this.Key = key;
        this.Value = value;
    }
}

export default KeyValuePair;
