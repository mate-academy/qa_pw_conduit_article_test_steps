class SignInPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[placeholder="Email"]');
    this.passwordInput = page.locator('input[placeholder="Password"]');
    this.signInButton = page.locator('button[type="submit"]');
  }

  async goToSignIn() {
    await this.page.goto('/login');
  }

  async signIn(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    await this.page.waitForURL('/');
  }
}

module.exports = { SignInPage };
