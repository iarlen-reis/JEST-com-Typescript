import {
  Discount,
  TenPercentDiscount,
  FiftyPercentDiscount,
  NoDiscount,
} from "./discount";

// Fecture for create sut:
const createSut = (className: new () => Discount): Discount => {
  return new className();
};

describe("Discount", () => {
  afterEach(() => jest.clearAllMocks());

  it("should have no discount", () => {
    const sut = createSut(NoDiscount);

    expect(sut.calculate(10.45)).toBe(10.45);
  });

  it("should apply 10% percent discount on price", () => {
    const sut = createSut(TenPercentDiscount);

    expect(sut.calculate(90)).toBe(81);
  });

  it("should apply 50% percent discount on price", () => {
    const sut = createSut(FiftyPercentDiscount);

    expect(sut.calculate(200)).toBe(100);
  });
});
