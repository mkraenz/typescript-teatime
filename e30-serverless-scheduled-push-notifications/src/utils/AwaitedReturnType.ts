export type AwaitedReturnType<X extends (...args: any) => Promise<any>> =
    ReturnType<X> extends Promise<infer P> ? P : never;
