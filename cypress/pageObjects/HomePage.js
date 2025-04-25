import { BasePage } from "../pageObjects/basePage";

export class HomePage extends BasePage {
  static get url() {
    return "/#/";
  }

  static get dismissButton() {
    return cy.get("[aria-label='Close Welcome Banner']");
  }

  static get meWantItButton() {
    return cy.get("[aria-label='dismiss cookie message']");
  }

  static get accountButton() {
    return cy.get("button#navbarAccount");
  }

  static get loginButton() {
    return cy.get("button#navbarLoginButton");
  }

  static get userProfileButton() {
    return cy.get("button[aria-label='Go to user profile']");
  }

  static get searchIcon() {
    return cy.get("#searchQuery");
  }

  static get searchField() {
    return cy.get("#searchQuery input");
  }

  static get productBox() {
    return cy.get("div.mdc-card");
  }

  static get ProductInfo() {
    return cy.get("app-product-details");
  }

  static get closeButton() {
    return cy.get("button[aria-label='Close Dialog']");
  }

  static get clickReview() {
    return cy.get("mat-expansion-panel-header.mat-expansion-panel-header");
  }

  static get validateInfoOfProduct() {
    return cy.get("p");
  }

  static get writeReview() {
    return cy.get("textarea#mat-input-2");
  }

  static get submitReview() {
    return cy.get("button:contains(' Submit ')");
  }

  static get validCardsAmmount() {
    return cy.get('mat-grid-tile');
  }

  static get cardDisplayChange() {
    return cy.get('.mat-mdc-paginator-touch-target');
  }

  static get cardDisplayChangeSelector() {
    return cy.get('.mat-mdc-option');
  }

  static get addToBasketButton() {
    return cy.get("button[aria-label='Add to Basket']");
  }

  static get basketButton() {
    return cy.get("button[aria-label='Show the shopping cart']");
  }

  static get ordandpayButton() {
    return cy.get("button[aria-label='Show Orders and Payment Menu']");
  }

  static get mySavAddresses() {
    return cy.get("button[aria-label='Go to saved address page']");
  }

  static get myPayment() {
    return cy.get("button[aria-label='Go to saved payment methods page']");
  }
}
