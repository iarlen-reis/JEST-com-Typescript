describe("Primitive values", () => {
  it("should test jest assertions", () => {
    const number = 10;

    expect(number).toBe(10);

    expect(number).toEqual(10);

    expect(number).not.toBeFalsy();
    expect(number).toBeTruthy();

    expect(number).toBeGreaterThan(9);
    expect(number).toBeLessThan(11);
    expect(number).toBeGreaterThanOrEqual(10);

    expect(number).toHaveProperty("toString");
  });
});

describe("Objects Test", () => {
  it("should test jest assertions object", () => {
    const person = {
      name: "Iarlen",
      age: 21,
    };

    const anotherPerson = { ...person };

    expect(person).toEqual(anotherPerson);

    expect(person).toHaveProperty("name");
  });
});
