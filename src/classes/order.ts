import { OrderStatus } from "./interfaces/oderStatus";
import { CustomerOrder } from "./interfaces/customerProtocol";
import { ShoppingCartProtocol } from "./interfaces/shoppingCartProtocol";
import { MessagingProtocol } from "./interfaces/messageProtocol";
import { PersistencyProtocol } from "./interfaces/persistencyProtocol";

export class Order {
  private _orderStatus: OrderStatus = "open";

  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly messaging: MessagingProtocol,
    private readonly persistency: PersistencyProtocol,
    private readonly cutomerOrder: CustomerOrder
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      console.log("Seu carrinho está vázio.");
      return;
    }

    this.messaging.sendMessage(
      `Seu pedido com total de ${
        this.cart.items.length
      } item(s) e valor de R$${this.cart.totalWithDiscount()} foi recebido com sucesso.`
    );

    this._orderStatus = "closed";

    this.persistency.saveOrder();
    this.cart.clear();

    console.log("O cliente é: ", this.cutomerOrder.getName());
    console.log("CPF/CNPJ: ", this.cutomerOrder.getIDN());
  }
}
