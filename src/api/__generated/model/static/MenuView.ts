export interface MenuView {
    id: number;
    name: string;
    title: string;
    order: number;
    parentId?: number | undefined;
    children?: Array<MenuView> | undefined;
}
