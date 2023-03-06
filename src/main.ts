import { ShoppingCart } from "./classes/dependencyInversion";
import { Order } from "./classes/order";
import { Messaging } from "./services/message";
import { Persistency } from "./services/persistency";
import { Product } from "./classes/product";
import {
  FiftyPercentDiscount,
  TenPercentDiscount,
  NoDiscount,
} from "./classes/discount";
import {
  EnterpriseCustomer,
  IndivdualCustomer,
} from "./classes/interfaces/customer";
import { MessagingProtocol } from "./classes/interfaces/messageProtocol";

//discounts
const fiftyPercentDiscount = new FiftyPercentDiscount();
const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();

// cart:
const shoppingCart = new ShoppingCart(noDiscount);

//dependences order:
const persistency = new Persistency();
const message = new Messaging();
const individualCustomer = new IndivdualCustomer(
  "Iarlen",
  "Reis",
  "214.865.254-07"
);

const entepriseCustomer = new EnterpriseCustomer(
  "Aladin, LTS",
  "14.711.273/0001-59"
);

// add itens in cart:
shoppingCart.addItem(new Product("Caderno", 20.65));
shoppingCart.addItem(new Product("Camiseta", 45.2));
shoppingCart.addItem(new Product("Mochila", 101.0));

// learn create mock:
class MessagingMock implements MessagingProtocol {
  sendMessage(message: string): void {
    console.log("MessagemMock enviada com sucesso!");
  }
}

const messageMock = new MessagingMock();

// order and injected of dependences:
const order = new Order(shoppingCart, message, persistency, individualCustomer);

// verify order status, is open now:
console.log(order.orderStatus);

// verify price with discount:
console.log(shoppingCart.totalWithDiscount());

// verify e checkout the order of shopping e close order:
order.checkout();

// verify itens of carts is empty now:
console.log(shoppingCart.items);

// verify price total of shopping is 0 now:
console.log(shoppingCart.total());

// verifiy order status, is closed now:
console.log(order.orderStatus);
