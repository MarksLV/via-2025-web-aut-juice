import { BasePage } from "./basePage";

export class SavedPaymentMethodsPage extends BasePage {
    static get addCardNew() {
        return cy.contains("span", " Add new card ");
    }

    static get nameField() {
        return cy.get("input#mat-input-2");
    }

    static get cardNumberField() {
        return cy.get("input#mat-input-3");
    }

    static get expiryMonthField() {
        return cy.get("select#mat-input-4");
    }

    static get expiryYearField() {
        return cy.get("select#mat-input-5");
    }

    static get submitPaymentNew() {
        return cy.contains("span", "Submit");
    }

    static get cardDisplayField() {
        return cy.get("mat-cell.cdk-column-Number");
    }
}
