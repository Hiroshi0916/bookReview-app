// login.spec.js in cypress/integration folder
describe("Login page tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001"); // あなたのアプリケーションのURLに置き換えてください
  });

  it("displays error message when there is an error in the input form", () => {
    // ここでは仮に無効なemailとpasswordを入力します。
    // 具体的な無効な値は、あなたのアプリケーションがどのような入力を無効とするかによります。
    cy.get('input[type="email"]').type("invalid email");
    cy.get('input[type="password"]').type("123");
    cy.get('button[type="submit"]').click();

    // エラーメッセージが表示されることを検証します。
    // これはあなたのエラーメッセージの具体的な内容と、そのメッセージがどのように表示されるかによります。
    cy.get(".error").should("contain", "Invalid email or password"); // '.error'をあなたのエラーメッセージのセレクタに置き換えてください
  });

  it("does not display error message when the input is correct", () => {
    // ここでは仮に有効なemailとpasswordを入力します。
    cy.get('input[type="email"]').type("valid@email.com");
    cy.get('input[type="password"]').type("validpassword");
    cy.get('button[type="submit"]').click();

    // エラーメッセージが表示されないことを検証します。
    cy.get(".error").should("not.exist"); // '.error'をあなたのエラーメッセージのセレクタに置き換えてください
  });
});
