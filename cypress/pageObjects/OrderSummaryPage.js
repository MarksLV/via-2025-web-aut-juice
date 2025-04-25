import { BasePage } from "./basePage";

export class OrderCompletionPage extends BasePage {

    static get placeOrder() {
        return cy.contains("span", "Place your order and pay");
    }
}