/*
Exemplo de segregação de interfaces:
- A interface CustomerProtocol é uma interface muito "gorda", ela faz
    muita coisa e vai forçar a utilizar coisas que não precisária necessáriamente.

- Para resolver isso, criamos duas interfaces distintas, onde cada uma
    é responsavel apenas por um tipo.
*/

// Não serve para pessoa física e nem para pessoa júridica:
export interface CustomerProtocol {
  fistName: string;
  lastName: string;
  cpf: string;
  cnpj: string;
}

// Uma interface que será implementada pelas classes customer:
export interface CustomerOrder {
  getName(): string;
  getIDN(): string;
}

// Serve para pessoa física:
export interface IndivdualCustomerProtocol {
  fistName: string;
  lastName: string;
  cpf: string;
}

// Serve para pessoa júridica:
export interface EnterpriseCustomerProtocol {
  name: string;
  cnpj: string;
}
