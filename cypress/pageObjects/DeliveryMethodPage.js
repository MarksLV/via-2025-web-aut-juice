import { BasePage } from "./basePage";

export class DeliveryMethodPage extends BasePage {

    static selectDeliverySpeed(speed) {
        cy.contains(speed).parent().find('input[type="radio"]').check();
    }

    static get continueButton() {
        return cy.contains("span", "Continue");
      }
}