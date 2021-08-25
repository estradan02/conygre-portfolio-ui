export class Holding {
    id!: number;
    accountId!: number;
    type!: string;
    symbol!: string;
    buyPrice!: number;
    amount!: number;
    curPrice!: number;
    buyDate!: Date;
    percentChange!: number;
}