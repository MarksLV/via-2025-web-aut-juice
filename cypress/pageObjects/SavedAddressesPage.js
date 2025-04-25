import { BasePage } from "./basePage";

export class SavedAddressesPage extends BasePage {

    static get addAddressNew() {
        return cy.contains("span", "Add New Address");
    }
}