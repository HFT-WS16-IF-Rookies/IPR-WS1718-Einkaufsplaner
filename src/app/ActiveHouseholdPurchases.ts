export class ActiveHouseholdPurchases
{
    date: string;
    store: string;
    name: string;
    amount: number;

    constructor(date: string, name: string, amount: number)
    {
        this.date = date;
        this.store = store;
        this.name = name;
        this.amount = amount;
    }
}
