export interface ICache {
    get(key: any): any;
    set(key: any, data: any): void;
    has(key: any): boolean;
    clear(): void;
}