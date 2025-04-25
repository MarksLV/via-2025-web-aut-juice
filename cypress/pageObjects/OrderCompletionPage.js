import { BasePage } from "./basePage";

export class OrderCompletionPage extends BasePage {

    static checkConfirmationMessage() {
        cy.contains("h1", "Thank you for your purchase!").should("be.visible");
    }
}