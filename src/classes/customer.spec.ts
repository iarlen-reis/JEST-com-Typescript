import { EnterpriseCustomer, IndivdualCustomer } from "./customer";

const createIndivdualCustomer = (
  firstName: string,
  lastName: string,
  cpf: string
): IndivdualCustomer => {
  return new IndivdualCustomer(firstName, lastName, cpf);
};

afterEach(() => jest.clearAllMocks());

describe("IndivdualCustomer", () => {
  it("should have fistname, lastName and CPF", () => {
    const sut = createIndivdualCustomer("Addam", "Smith", "999.999.999.99");

    expect(sut).toHaveProperty("fistName", "Addam");

    expect(sut).toHaveProperty("lastName", "Smith");

    expect(sut.cpf).not.toBeUndefined();
  });

  it("should have methods to get name and IDN", () => {
    const sut = createIndivdualCustomer("Addam", "Smith", "999.999.999.99");

    expect(sut.getName()).toBe("Addam Smith");

    expect(sut.getIDN()).toBe("999.999.999.99");
  });
});

const createEnterpriseCustomer = (
  name: string,
  cnpj: string
): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

describe("EnterpriseCustomer", () => {
  it("should have name and CNPJ", () => {
    const sut = createEnterpriseCustomer("Aladin, LTS", "79.220.143/0001-69");

    expect(sut).toHaveProperty("name", "Aladin, LTS");

    expect(sut).toHaveProperty("cnpj", "79.220.143/0001-69");
  });

  it("should have methods name and IDN", () => {
    const sut = createEnterpriseCustomer("Aladin, LTS", "79.220.143/0001-69");

    expect(sut.getName()).toBe("Aladin, LTS");

    expect(sut.getIDN()).toBe("79.220.143/0001-69");
  });
});
