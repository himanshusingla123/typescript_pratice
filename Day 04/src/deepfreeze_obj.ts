type DeepFreeze<T> = {
  [k in keyof T]: T[k] extends object ? DeepFreeze<T[k]> : T[k];
};
export function deepFreezeObjects<T>(obj:T):DeepFreeze<T>{
    let result:any= Array.isArray(obj) ? [] : {};;
    for (const key in obj){
        let val = obj[key];
        if(val && typeof val == "object")
        {
            result[key] = deepFreezeObjects(obj[key]);
        }
        else{
            result[key] = val;
        }
    }
    return Object.freeze(result);
}
