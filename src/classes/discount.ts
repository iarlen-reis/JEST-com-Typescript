export abstract class Discount {
  protected discount = 0;

  calculate(price: number): number {
    return price - price * this.discount;
  }
}

export class FiftyPercentDiscount extends Discount {
  protected readonly discount = 0.5;
}

export class TenPercentDiscount extends Discount {
  protected readonly discount = 0.1;
}

/*
Quebei o metódo de substituição de lisvok ao 
modificar o retorno da função:
- Não estou utilizando o atributo discount para aplicar um
  desconto.
- Estou retornando o preço e não um desconto.

- Mudei o comportamento do metódo abstrato.
*/
export class NoDiscount extends Discount {
  calculate(price: number): number {
    return price;
  }
}
