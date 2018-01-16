export class Article
{
    name: string;
    storeName: string;
    currentAmount: number;
    minAmount: number;
    maxAmount: number;
    priority: string;

    constructor(name: string, storeName: string, currentAmount: number, minAmount: number, maxAmount: number, priority:string)
    {
        this.name = name;
        this.storeName = storeName;
        this.currentAmount = currentAmount;
        this.minAmount = minAmount;
        this.maxAmount = maxAmount;
        this.priority = priority;
    }
}
