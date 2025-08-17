import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.aboutField = page.getByPlaceholder(`What's this article about?`);
    this.articleBody = page.getByPlaceholder(
      'Write your article (in markdown)');
    this.enterTags = page.getByPlaceholder('Enter tags');
    this.articleTitle = page.locator('h1');
    this.articlePage = page.locator('.article-page');
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async fillArticleTitle(articleTitle) {
    await test.step(`Fill in the article title`, async () => {
      await this.articleTitleField.fill(articleTitle);
    });
  }

  async fillAboutField(about) {
    await test.step(`Fill in the about field`, async () => {
      await this.aboutField.fill(about);
    });
  }

  async fillArticleBody(articleBody) {
    await test.step(`Fill in the article body`, async () => {
      await this.articleBody.fill(articleBody);
    });
  }

  async fillEnterTags(tags) {
    await test.step(`Fill in the tags`, async () => {
      await this.enterTags.fill(tags);
    });
  }

  async assertArticleIsCreated(title) {
    await test.step(`Assert the article page and title`, async () => {
      await expect(this.articlePage).toBeVisible();
      await expect(this.articleTitle).toContainText(title);
    });
  }

}
