export class inputContent {
    private static _baseURL: string;
    private static _productName: string;
    private static _productDescription: string;
    private static _productPrice: string;

    public static get baseUrl(): string {
        return this._baseURL;
    }
    public static set baseUrl(value: string) {
        this._baseURL = value;
    }

    public static get productName(): string {
        return this._productName;
    }
    public static set productName(value: string) {
        this._productName = value;
    }

    public static get productDescription(): string {
        return this._productDescription;
    }
    public static set productDescription(value: string) {
        this._productDescription = value;
    }
    public static get productPrice(): string {
        return this._productPrice;
    }
    public static set productPrice(value: string) {
        this._productPrice = value;
    }

    public static ResetInputData(): void {
        // Values of Input data variables set to null
        this._productName = null;
        this._productDescription = null;
        this._productPrice = null;
    }
}
