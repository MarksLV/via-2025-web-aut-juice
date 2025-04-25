import { BasePage } from "./basePage";

export class SelectAddressPage extends BasePage {

    static selectRadioButton(labelText) {
        cy.contains(labelText).parent().find('input[type="radio"]').check();
    }

    static get continueButton() {
        return cy.contains("span", "Continue");
      }   
}