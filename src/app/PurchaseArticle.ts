export class PurchaseArticle
{
    name: string;
    amount: number;
    found: number;
    id: string;

    constructor(name: string, amount: number, found: number, id: string)
    {
        this.name = name;
        this.amount = amount;
        this.found = found;
        this.id = id;
    }
}
