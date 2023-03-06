import { Messaging } from "./message";

// Fecture for create sut:
const createSut = () => {
  return new Messaging();
};

describe("Messaging", () => {
  afterEach(() => jest.clearAllMocks());

  // check if return is undefined:
  it("should return undefined", () => {
    // System under test
    const sut = createSut();

    expect(sut.sendMessage("message")).toBeUndefined();
  });

  // check if console.log is called once:
  it("should call console.log once", () => {
    const sut = createSut();

    const consoleSpy = jest.spyOn(console, "log");

    sut.sendMessage("message");
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  // check if console.log show (messagem recebida + message: Params):
  it("should call console.log with 'Messagem Recebida:'and message ", () => {
    const sut = createSut();

    const consoleSpy = jest.spyOn(console, "log");

    sut.sendMessage("message");
    expect(consoleSpy).toHaveBeenCalledWith("Messagem Recebida:", "message");
  });
});
