/*
Aprendendo principio da inversão de dependência:
- Modulos de alto nivel não devem depender de modulos de baixo nivel.
  Ambos devem depender de abstrações.

- Abstrações não devem depender de detalhes, detalhes devem depender 
    de abstrações.

- Classes de baixo nivel são classes que executam tarefas (os detalhes).

- Classes de alto nivel são classes que gerenciam as classes de baixo nivel.
*/

import { Discount } from "./discount";
import { CartItem } from "./interfaces/cartIem";
import { ShoppingCartProtocol } from "./interfaces/shoppingCartProtocol";

export class ShoppingCart implements ShoppingCartProtocol {
  private readonly _items: CartItem[] = [];

  constructor(private readonly discount: Discount) {}

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  total(): number {
    return +this._items
      .reduce((total, next) => total + next.price, 0)
      .toFixed(2);
  }

  totalWithDiscount(): number {
    return this.discount.calculate(this.total());
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  clear(): void {
    this._items.length = 0;
  }
}
