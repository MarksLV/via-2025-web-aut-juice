import { BasePage } from "./basePage";

export class PaymentOptionsPage extends BasePage {

    static selectPaymentPossibilities(pay) {
        cy.contains(pay).parent().find('input[type="radio"]').check();
    }

    static get continueButton() {
        return cy.contains("span", "Continue");
    }
}