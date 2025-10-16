import { EventEmitter } from "./event_emitter.js";
import type { EventMap } from "./event_emitter.js";

interface MyEvents extends EventMap{
    message: (text: string)=> void;
    add: (a:number , b:number) => number;
}

const ee  = new EventEmitter<MyEvents>();

const unsub = ee.on('message', (t)=> console.log('msg: ',t));

ee.on('add', (a , b)=>
{
    console.log('sum', a+b);
    return a+b;
})

ee.emit('message', 'hello world');