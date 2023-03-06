import {
  IndivdualCustomerProtocol,
  EnterpriseCustomerProtocol,
  CustomerOrder,
} from "./customerProtocol";

// Pessoa fisica
export class IndivdualCustomer
  implements IndivdualCustomerProtocol, CustomerOrder
{
  fistName: string;
  lastName: string;
  cpf: string;

  constructor(fistName: string, lastName: string, cpf: string) {
    this.fistName = fistName;
    this.lastName = lastName;
    this.cpf = cpf;
  }
  getName(): string {
    return `${this.fistName} ${this.lastName}`;
  }
  getIDN(): string {
    return this.cpf;
  }
}

// Pessoa física:
export class EnterpriseCustomer
  implements EnterpriseCustomerProtocol, CustomerOrder
{
  name: string;
  cnpj: string;

  constructor(name: string, cnpj: string) {
    this.name = name;
    this.cnpj = cnpj;
  }
  getName(): string {
    return this.name;
  }
  getIDN(): string {
    return this.cnpj;
  }
}
