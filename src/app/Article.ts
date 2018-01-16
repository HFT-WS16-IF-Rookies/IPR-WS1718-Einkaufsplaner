export class Article
{
    name: string;
    currentAmount: number;
    minAmount: number;
    maxAmount: number;
    priority: string;

    constructor(name: string, currentAmount: number, minAmount: number, maxAmount: number, priority:string)
    {
        this.name = name;
        this.currentAmount = currentAmount;
        this.minAmount = minAmount;
        this.maxAmount = maxAmount;
        this.priority = priority;
    }
}
