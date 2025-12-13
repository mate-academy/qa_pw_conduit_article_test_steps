class SignUpPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[placeholder="Username"]');
    this.emailInput = page.locator('input[placeholder="Email"]');
    this.passwordInput = page.locator('input[placeholder="Password"]');
    this.signUpButton = page.locator('button[type="submit"]');
    this.errorMessages = page.locator('.error-messages li');
  }

  async goToSignUp() {
    await this.page.goto('/register');
  }

  async signUp({ username, email, password }) {
    if (username) await this.usernameInput.fill(username);
    if (email) await this.emailInput.fill(email);
    if (password) await this.passwordInput.fill(password);
    await this.signUpButton.click();
  }

  async getErrorMessages() {
    return this.errorMessages.allTextContents();
  }
}

module.exports = { SignUpPage };
