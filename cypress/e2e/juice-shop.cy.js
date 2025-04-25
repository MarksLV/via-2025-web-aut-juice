import { BasketPage } from "../pageObjects/BasketPage.JS";
import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { RegistrationPage } from "../pageObjects/registrationPage";
import { SelectAddressPage } from "../pageObjects/SelectAddressPage";
import { DeliveryMethodPage } from "../pageObjects/DeliveryMethodPage";
import { OrderCompletionPage } from "../pageObjects/OrderSummaryPage";
import { SavedAddressesPage } from "../pageObjects/SavedAddressesPage";
import { CreateAddressPage } from "../pageObjects/CreateAddressPage";
import { SavedPaymentMethodsPage } from "../pageObjects/SavedPaymentMethodsPage";


describe("Juice-shop scenarios", () => {
  context("Without auto login", () => {
    beforeEach(() => {
      HomePage.visit();
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });

    it("Login", () => {
      // Click Account button
      HomePage.accountButton.click();
      // Click Login button
      HomePage.loginButton.click();
      // Set email value to "demo"
      LoginPage.emailInput.type("demo");
      // Set password value to "demo"
      LoginPage.passwordInput.type("demo");
      // Click Log in
      LoginPage.loginButton.click();
      // Click Account button
      HomePage.accountButton.click()
      // Validate that "demo" account name appears in the menu section
      HomePage.userProfileButton.should("contain.text", "demo");
    });

    it("Registration", () => {
      // Click Account button
      HomePage.accountButton.click();
      // Login button
      HomePage.loginButton.click();
      // Click "Not yet a customer?"
      LoginPage.notYetACustomer.click();
      // Find - how to generate random number in JS
      // Use that number to genarate unique email address, e.g.: email_7584@ebox.com
      const randomNumber = Math.floor(Math.random() * 900000) + 100000;

      // Save that email address to some variable
      const emailAddress = `email_${randomNumber}@ebox.com`;
      const password = "ABC123#()";
      RegistrationPage.emailField.type(emailAddress);
      // Fill in password field and repeat password field with same password
      RegistrationPage.passwordField.type(password);
      RegistrationPage.repeatPasswordField.type(password);
      // Click on Security Question menu
      RegistrationPage.securityQuestionField.click();
      // Select  "Name of your favorite pet?"
      RegistrationPage.securityQuestionOptions
        .contains("Name of your favorite pet?")
        .click();
      // Fill in answer
      RegistrationPage.securityAnswerField.type("Beethoven");
      // Click Register button
      RegistrationPage.registrationButton.click();
      // Set email value to previously created email
      LoginPage.emailInput.type(emailAddress);
      // Set password value to previously used password value
      LoginPage.passwordInput.type(password);
      // Click login button
      LoginPage.loginButton.click();
      // Click Account button
      HomePage.accountButton.click();
      // Validate that account name (with previously created email address) appears in the menu section
      HomePage.userProfileButton.should("contain.text", emailAddress);
    });
  });

  context("With auto login", () => {
    beforeEach(() => {
      cy.login("demo", "demo");
      HomePage.visit();
    });

    it("Search and validate Lemon", () => {
      // Click on search icon
      HomePage.searchIcon.click();
      // Search for Lemon
      HomePage.searchField.type("Lemon{enter}");
      // Select a product card - Lemon Juice (500ml)
      HomePage.productBox.contains("Lemon Juice (500ml)")
      .click();
      // Validate that the card (should) contains "Sour but full of vitamins."
      HomePage.ProductInfo.should("contain.text", "Sour but full of vitamins.");
    });

    // Create scenario - Search 500ml and validate Lemon, while having multiple cards
    it("Search 500ml and validate Lemon, while having multiple cards", () => {
      // Click on search icon
      HomePage.searchIcon.click();
      // Search for 500ml
      HomePage.searchField.type("500ml{enter}");
      // Select a product card - Lemon Juice (500ml)
      HomePage.productBox.contains("Lemon Juice (500ml)")
      .click();
      // Validate that the card (should) contains "Sour but full of vitamins."
      HomePage.ProductInfo.should("contain.text", "Sour but full of vitamins.");
    });

    // Create scenario - Search 500ml and validate cards
    it("Create scenario - Search 500ml and validate cards", () => {
      // Click on search icon
      HomePage.searchIcon.click();
      // Search for 500ml
      HomePage.searchField.type("500ml{enter}");
      // Select a product card - Eggfruit Juice (500ml)
      HomePage.productBox.contains("Eggfruit Juice (500ml)").click();
      // Validate that the card (should) contains "Now with even more exotic flavour."
      HomePage.ProductInfo.should("contain.text", "Now with even more exotic flavour.");
      // Close the card
      HomePage.closeButton.click();
      // Select a product card - Lemon Juice (500ml)
      HomePage.productBox.contains("Lemon Juice (500ml)").click();
      // Validate that the card (should) contains "Sour but full of vitamins."
      HomePage.ProductInfo.should("contain.text", "Sour but full of vitamins.");
      // Close the card
      HomePage.closeButton.click();
      // Select a product card - Strawberry Juice (500ml)
      HomePage.productBox.contains("Strawberry Juice (500ml)").click();
      // Validate that the card (should) contains "Sweet & tasty!"
      HomePage.ProductInfo.should("contain.text", "Sweet & tasty!");
    });

    // Create scenario - Read a review
    it("Read a review", () => {
      // Click on search icon
      HomePage.searchIcon.click();
      // Search for King
      HomePage.searchField.type("King{enter}");
      // Select a product card - OWASP Juice Shop "King of the Hill" Facemask
      // Click expand reviews button/icon (wait for reviews to appear)
      HomePage.productBox.contains("OWASP Juice Shop \"King of the Hill\" Facemask").click();
      // Validate review - K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!
      HomePage.clickReview.click();
      HomePage.validateInfoOfProduct.should("contain.text", "K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!");
    });

    // Create scenario - Add a review
    it("Add a review", () => {
      // Click on search icon
      HomePage.searchIcon.click();
      // Search for Raspberry
      HomePage.searchField.type("Raspberry{enter}");
      // Select a product card - Raspberry Juice (1000ml)
      HomePage.productBox.contains("Raspberry Juice (1000ml)").click();
      // Type in review - "Tastes like metal"
      HomePage.writeReview.type("Tastes like metal", { force: true });
      // Click Submit
      HomePage.submitReview.click();
      // Click expand reviews button/icon (wait for reviews to appear)
      HomePage.clickReview.click();
      // Validate review -  "Tastes like metal"
      HomePage.validateInfoOfProduct.should("contain.text", "Tastes like metal");
    });

    // Create scenario - Validate product card amount
    it("Validate product card amount", () => {
      // Validate that the default amount of cards is 12
      HomePage.validCardsAmmount.should('have.length', 12);
      // Change items per page (at the bottom of page) to 24
      HomePage.cardDisplayChange.click();
      HomePage.cardDisplayChangeSelector.contains("24").click();
      // Validate that the amount of cards is 24
      HomePage.validCardsAmmount.should('have.length', 24);
      // Change items per page (at the bottom of page) to 36
      HomePage.cardDisplayChange.click();
      HomePage.cardDisplayChangeSelector.contains("36").click();
      // Validate that the amount of cards is 36
      HomePage.validCardsAmmount.should('have.length', 36);
    });

    // Create scenario - Buy Girlie T-shirt
    it("Buy Girlie T-shirt", () => {
      // Click on search icon
      HomePage.searchIcon.click();
      // Search for Girlie
      HomePage.searchField.type("Girlie{enter}");
      // Add to basket "Girlie"
      HomePage.addToBasketButton.click();
      // Click on "Your Basket" button
      HomePage.basketButton.click();

      // Create page object - BasketPage [CREATED]

      // Click on "Checkout" button
      BasketPage.checkoutButton.click();

      // Create page object - SelectAddressPage [CREATED]

      // Select address containing "United Fakedom"
      SelectAddressPage.selectRadioButton('United Fakedom');
      // Click Continue button
      SelectAddressPage.continueButton.click();

      // Create page object - DeliveryMethodPage [CREATED]

      // Select delivery speed Standard Delivery
      DeliveryMethodPage.selectDeliverySpeed("Standard Delivery");

      // Click Continue button
      DeliveryMethodPage.continueButton.click();

      // Create page object - PaymentOptionsPage [CREATED]

      // Select card that ends with "5678"
      SelectAddressPage.selectRadioButton('5678');

      // Click Continue button
      SelectAddressPage.continueButton.click();

      // Create page object - OrderSummaryPage [CREATED]

      // Click on "Place your order and pay"
      OrderCompletionPage.placeOrder.click();

      // Create page object - OrderCompletionPage [CREATED]

      // Validate confirmation - "Thank you for your purchase!"
      OrderCompletionPage.confOrder;
    });

    // Create scenario - Add address
    it("Add address", () => {
      // Click on Account
      HomePage.accountButton.click();
      // Click on Orders & Payment
      HomePage.ordandpayButton.click();
      // Click on My saved addresses
      HomePage.mySavAddresses.click();

      // Create page object - SavedAddressesPage [CREATED]

      // Click on Add New Address
      SavedAddressesPage.addAddressNew.click();

      // Create page object - CreateAddressPage [CREATED]

      // Fill in the necessary information
      const randomNumber = Math.floor(Math.random() * 90000) + 1000;

      const country = "Prussia";
      const name = `TesterMark${randomNumber}`;
      const mobileNumber = `521'${randomNumber}`;
      const zipCode = `12${randomNumber}`;
      const address = `1 Test Street Apt ${randomNumber}`;
      const city = `TesterCity`;

      CreateAddressPage.countryField.type(country);
      CreateAddressPage.nameField.type(name);
      CreateAddressPage.mobileField.type(mobileNumber);
      CreateAddressPage.zipCodeField.type(zipCode);
      CreateAddressPage.addressField.type(address);
      CreateAddressPage.cityField.type(city);

      // Click Submit button
      CreateAddressPage.submitAddressNew.click();
      // Validate that previously added address is visible
      CreateAddressPage.confirmAddedAddress.should("contain.text", `${address}, ${city}, , ${zipCode}`);
    });

    // Create scenario - Add payment option
    it("Add payment option", () => {
      // Click on Account
      HomePage.accountButton.click();
      // Click on Orders & Payment
      HomePage.ordandpayButton.click();
      // Click on My payment options
      HomePage.myPayment.click();

      // Create page object - SavedPaymentMethodsPage [CREATED]

      // Click Add new card
      SavedPaymentMethodsPage.addCardNew.click();
      // Fill in Name
      const cardholderName = "TesterMark";
      SavedPaymentMethodsPage.nameField.type(cardholderName);
      // Fill in Card Number
      const randomCardNumber = Math.floor(Math.random() * 9000000000000000) + 1000000000000000;
      SavedPaymentMethodsPage.cardNumberField.type(randomCardNumber.toString());
      // Set expiry month to 7
      const expiryMonth = "7";
      SavedPaymentMethodsPage.expiryMonthField.select(expiryMonth);
      // Set expiry year to 2090
      const expiryYear = "2090";
      SavedPaymentMethodsPage.expiryYearField.select(expiryYear);
      // Click Submit button
      SavedPaymentMethodsPage.submitPaymentNew.click();
      // Validate that the card shows up in the list
      const lastFourDigits = randomCardNumber.toString().slice(-4);
      SavedPaymentMethodsPage.cardDisplayField.should("contain.text", lastFourDigits);
    });
  });
});
