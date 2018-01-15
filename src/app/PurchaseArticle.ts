export class PurchaseArticle
{
    name: string;
    amount: number;
    found: number;
    id: number;

    constructor(name: string, amount: number, found: number, id: number)
    {
        this.name = name;
        this.amount = amount;
        this.found = found;
        this.id = id;
    }
}
