export interface DataObj {
    [propName: string]: any;
}

export type DataItem = DataObj | number;
export type HeapData = DataItem[];
export type HeapDataArguments = undefined | HeapData;
