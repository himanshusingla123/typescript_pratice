export class Engine{
    start()
    {
        console.log("Engine started");
    }
}
export class  car2{
    constructor(private engine:Engine){}

    drive()
    {
        this.engine.start();
        console.log("Car is moving!!!")
    }
}