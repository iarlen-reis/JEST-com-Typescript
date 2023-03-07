import { CartItem } from "./interfaces/cartIem";
import { CustomerOrder } from "./interfaces/customerProtocol";
import { MessagingProtocol } from "./interfaces/messageProtocol";
import { PersistencyProtocol } from "./interfaces/persistencyProtocol";
import { ShoppingCartProtocol } from "./interfaces/shoppingCartProtocol";
import { Order } from "./order";

class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): readonly CartItem[] {
    return [];
  }

  addItem(item: CartItem): void {}

  removeItem(index: number): void {}

  total(): number {
    return 1;
  }
  totalWithDiscount(): number {
    return 2;
  }
  isEmpty(): boolean {
    return false;
  }
  clear(): void {}
}

class MessagingMock implements MessagingProtocol {
  sendMessage(message: string): void {}
}

class PersistencyMock implements PersistencyProtocol {
  saveOrder(): void {}
}

class CustomerMock implements CustomerOrder {
  getName(): string {
    return "sim";
  }
  getIDN(): string {
    return "222";
  }
}

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistencyMock = new PersistencyMock();
  const customerMock = new CustomerMock();

  const sut = new Order(
    shoppingCartMock,
    messagingMock,
    persistencyMock,
    customerMock
  );

  return { sut, shoppingCartMock, messagingMock, persistencyMock };
};

describe("Order", () => {
  it("should not checkout if cart is empty", () => {
    const { sut, shoppingCartMock } = createSut();

    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, "isEmpty")
      .mockReturnValueOnce(true);

    sut.checkout();

    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe("open");
  });

  it("should checkout if cart is not empty", () => {
    const { sut, shoppingCartMock } = createSut();

    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, "isEmpty")
      .mockReturnValueOnce(false);

    sut.checkout();

    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe("closed");
  });

  it("should send a email to costumer", () => {
    const { sut, messagingMock } = createSut();

    const messagingMockSpy = jest.spyOn(messagingMock, "sendMessage");

    sut.checkout();

    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
  });

  it("should save order", () => {
    const { sut, persistencyMock } = createSut();

    const persistencyMockSpy = jest.spyOn(persistencyMock, "saveOrder");

    sut.checkout();

    expect(persistencyMockSpy).toHaveBeenCalledTimes(1);
  });

  it("should clear cart", () => {
    const { sut, shoppingCartMock } = createSut();

    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, "clear");

    sut.checkout();

    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });
});
