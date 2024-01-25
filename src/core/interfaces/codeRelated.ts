export type VoidFunction = () => void;
export type CarriedFunction<T, T2> = (arg: T) => () => T2;
