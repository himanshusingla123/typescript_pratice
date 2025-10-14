abstract class Shape{
    abstract area():number;
}

export class Circle extends Shape{
    constructor(private radius: number)
    {
        super();
    }
    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}