type Result<T,E> = 
    |{ok:  true; value:T}
    |{ok: false; error: E};

function Ok<T>(value: T): Result<T,never>{
    return {ok: true , value};
}

function Err<T>(error: T): Result<never , T>{
    return {ok:false , error};
}

export function safeJsonParse<T>(text: string):Result<T, Error>{
    try{
        const parsed = JSON.parse(text);
        return Ok(parsed);
    }
    catch(err)
    {
        return Err(err instanceof Error ? err : new Error(String(err)));
    }
}