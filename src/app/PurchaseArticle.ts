export class PurchaseArticle
{
    name: string;
    amount: number;
    found: number;

    constructor(name: string, amount: number, found: number)
    {
        this.name = name;
        this.amount = amount;
        this.found = found;
    }
}
