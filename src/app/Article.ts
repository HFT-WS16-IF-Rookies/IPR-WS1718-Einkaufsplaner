export class Article
{
    name: string;
    storeName: string;
    currentAmount: number;
    minAmount: number;
    maxAmount: number;
    priority: string;
    id: number;

    constructor(name: string, storeName: string, currentAmount: number, minAmount: number, maxAmount: number, priority: string, id: number)
    {
        this.name = name;
        this.storeName = storeName;
        this.currentAmount = currentAmount;
        this.minAmount = minAmount;
        this.maxAmount = maxAmount;
        this.priority = priority;
        this.id = id;
    }
    getID(): number
    {
        return this.id;
    }
}
