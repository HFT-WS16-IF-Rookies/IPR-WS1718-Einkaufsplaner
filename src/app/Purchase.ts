export class Purchase
{
    date: string;
    store: string;
    name: string;
    purchaser: string;
    id: number;

    constructor(date: string, store: string, name: string, purchaser: string, id?: number)
    {
        this.date = date;
        this.store = store;
        this.name = name;
        this.purchaser = purchaser;
        if (id)
        {
            this.id = id;
        }
        else
        {
            this.id = -1;
        }
    }
}
