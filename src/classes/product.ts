import { CartItem } from "./interfaces/cartIem";

export class Product implements CartItem {
  constructor(public name: string, public price: number) {}
}
