export function filterByProperty<T,k extends keyof T>(array: T[] , key:k , val: T[k]  ):T[]
{
    return array.filter(item => item[key] == val );
}