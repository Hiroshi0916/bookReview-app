describe("Login Page Test", () => {
  // 初期設定
  beforeEach(() => {
    cy.visit("http://localhost:3001/login"); // アプリケーションのURLを適宜設定してください
  });

  it("should trigger HTML5 validation if mail is invalid", () => {
    cy.get('input[type="email"]').type("invalidemail");
    cy.get('input[type="email"]:invalid').should('exist');
  });

  // it("should display HTML5 form validation error if mail is invalid", () => {
  //   cy.get('input[type ="email"]').type("invalidemail");
  //   cy.get('input[type = "email"]')
  //     .invoke("prop", "validationMessage")
  //     .should('not.be.empty');
  // });

  it("should display 'Password invalid' message if password is invalid", () => {
    // 入力を行います
    cy.get('input[type="email"]').type("validemail@example.com"); // メールアドレスを入力
    cy.get('input[type="password"]').type("invalidpassword"); // 無効なパスワードを入力

    // ログインボタンをクリックします
    cy.get('button[type="submit"]').click();

    // "Password invalid"というエラーメッセージが表示されることを確認します
    cy.contains("Password invalid").should("be.visible"); // エラーメッセージが表示されることを確認
  });

  // 不備がなければホーム画面に遷移する
  it("should navigate to the home page if form inputs are correct", () => {
    // 入力を行います
    cy.get('input[type="email"]').type('hiroshi.obata@gmail.com'); // 正しいメールアドレスを入力
    cy.get('input[type="password"]').type('hobata'); // 正しいパスワードを入力

    // ログインボタンをクリックします
    cy.get('button[type="submit"]').click();

    // ホーム画面のURLに遷移していることを確認します
    cy.url().should("eq", "http://localhost:3001/"); // ホーム画面のURLに遷移していることを確認
  });
});
