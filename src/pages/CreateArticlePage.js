class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleInput = page.locator('[placeholder="Article Title"]');
    this.descriptionInput = page.locator(
      '[placeholder="What\'s this article about?"]',
    );
    this.bodyInput = page.locator(
      '[placeholder="Write your article (in markdown)"]',
    );
    this.tagsInput = page.locator('[placeholder="Enter tags"]');
    this.publishButton = page.locator('button', { hasText: 'Publish Article' });
    this.errorMessages = page.locator('.error-messages li');
  }

  async goToNewArticle() {
    await this.page.goto('/editor');
  }

  async setTitle(title) {
    await this.titleInput.fill(title);
  }

  async setDescription(desc) {
    await this.descriptionInput.fill(desc);
  }

  async setBody(body) {
    await this.bodyInput.fill(body);
  }

  async addTag(tag) {
    await this.tagsInput.fill(tag);
    await this.page.keyboard.press('Enter');
  }

  async submit() {
    await this.publishButton.click();
  }

  async getErrorMessages() {
    return this.errorMessages.allTextContents();
  }
}

module.exports = { CreateArticlePage };
