import { MessagingProtocol } from "../classes/interfaces/messageProtocol";

export class Messaging implements MessagingProtocol {
  sendMessage(message: string): void {
    console.log("Messagem Recebida:", message);
  }
}
