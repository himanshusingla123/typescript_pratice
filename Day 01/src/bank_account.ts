export class BankAccount{
    private balance: number= 0;
    deposit(amount: number)
    {
        // It is used to deposit the particular amount
        this.balance += amount;
    }

    getBalanace():number{
        return this.balance;
    }
}