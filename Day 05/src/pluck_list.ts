export function pluck<T,K extends keyof T>(objs: T[], key:K):T[K][]
{
    return objs.map(o=>o[key]);
}