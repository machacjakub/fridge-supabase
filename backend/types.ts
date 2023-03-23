export type TState = 'toBuy' | 'inFridge' | 'open' | 'deleted';
export type TCategory = 'dairy' | 'fruit' | 'vegetable' | 'meat' | 'egg' | 'other';
export interface IItem {
    id: number;
    name: string;
    expire: string;
    count: number;
    state: TState;
    category: TCategory;
    deletedAt?: string | null;
}
export interface IItemToAdd {
    name: string;
    expire: string;
    count: number;
    state: TState;
    category: TCategory;
}
export interface IFormData {
    name: string;
    expire: string;
    count: number;
    category: TCategory;
}

export type TItems = IItem[]