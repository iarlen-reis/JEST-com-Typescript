import { Product } from "./product";

// Fecture for create sut:
const createSut = (name: string, price: number): Product => {
  return new Product(name, price);
};

describe("Product", () => {
  afterEach(() => jest.clearAllMocks());

  // check if return a object with name e price:
  it("should return a object with name: Camiseta e price: 40.9", () => {
    const sut = createSut("Camiseta", 40.9);

    expect(sut).toHaveProperty("name", "Camiseta");
    expect(sut.price).toBeCloseTo(40.9);
  });
});
