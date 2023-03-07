import { Discount } from "./discount";
import { ShoppingCart } from "./shoppingCart";
import { CartItem } from "./interfaces/cartIem";

// Criando mocks (Testes isolados):
const createSut = () => {
  const discountMock = createDiscontMock();
  const sut = new ShoppingCart(discountMock);

  return { sut, discountMock };
};

const createDiscontMock = () => {
  class DiscountMock extends Discount {}

  return new DiscountMock();
};

const createCartItem = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number) {}
  }

  return new CartItemMock(name, price);
};

const createCartItemWithItems = () => {
  const { sut, discountMock } = createSut();

  const camiseta = createCartItem("Camiseta", 30);
  const short = createCartItem("Short", 20);

  sut.addItem(camiseta);
  sut.addItem(short);

  return { sut, discountMock };
};

describe("ShoppingCart", () => {
  it("should be an empty cart when no product id added", () => {
    const { sut } = createSut();

    expect(sut.isEmpty()).toBeTruthy();
  });

  it("should have 2 cart items", () => {
    const { sut } = createCartItemWithItems();

    expect(sut.items.length).toBe(2);
  });

  it("should test and totalWithDiscount", () => {
    const { sut } = createCartItemWithItems();

    expect(sut.total()).toBe(50);
    expect(sut.totalWithDiscount()).toBe(50);
  });

  it("should add products and clear cart.", () => {
    const { sut } = createCartItemWithItems();

    expect(sut.items.length).toBe(2);

    sut.clear();

    expect(sut.items.length).toBe(0);
  });

  it("should return total price.", () => {
    const { sut } = createCartItemWithItems();

    expect(sut.total()).toBe(50);
  });

  it("should remove a product.", () => {
    const { sut } = createCartItemWithItems();

    expect(sut.items.length).toBe(2);

    sut.removeItem(0);

    expect(sut.items.length).toBe(1);
  });

  it("should call discount.calculate once when totalWithDiscount is called.", () => {
    const { sut, discountMock } = createCartItemWithItems();

    const discountMockSpy = jest.spyOn(discountMock, "calculate");

    sut.totalWithDiscount();

    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });

  it("should call discount.calculate with total price when totalWithDiscount is called.", () => {
    const { sut, discountMock } = createCartItemWithItems();

    const discountMockSpy = jest.spyOn(discountMock, "calculate");

    sut.totalWithDiscount();

    expect(discountMockSpy).toHaveBeenCalledWith(50);
  });
});
