export type NumberItem = number;
export interface ObjectItem {
    [propName: string]: any;
}

export type DataItem = NumberItem | ObjectItem;

export type HeapData = DataItem[];
export type HeapDataArguments = undefined | HeapData;
