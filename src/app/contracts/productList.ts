import { ProductImage } from "./productImage";

export interface ProductList {
    id:string;
    name:string;
    unitInStock:number;
    price:number;
    createdDate:Date;
    updatedDate:Date;
    images?:ProductImage[]
    imagePath: string;
}
