export class Purchase
{
    date: string;
    store: string;
    name: string;
    purchaser: string;

    constructor(date: string, store: string, name: string, purchaser: string)
    {
        this.date = date;
        this.store = store;
        this.name = name;
        this.purchaser = purchaser;
    }
}
