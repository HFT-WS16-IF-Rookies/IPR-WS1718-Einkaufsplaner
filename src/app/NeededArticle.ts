export class NeededArticle
{
    storeName: string;
    articleName: string;
    neededAmount: number;

    constructor(storeName: string, articleName: string, neededAmount: number)
    {
        this.storeName = storeName;
        this.articleName = articleName;
        this.neededAmount = neededAmount;
    }
}
