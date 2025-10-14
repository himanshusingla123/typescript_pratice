export class Animal{
    constructor(public name: String){}
    makeSound():void
    {
        console.log("Some generic sound ...");
    }
}

export class Dog extends Animal{
    makeSound()
    {
        console.log("Woof!..")
    }
}

export class Cat extends Animal{
    makeSound(): void {
        console.log("Meow!..")
    }
}
