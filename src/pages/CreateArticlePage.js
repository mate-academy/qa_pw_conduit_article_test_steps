import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleDescription = page.getByPlaceholder(
      "What's this article about?",
    );
    this.articleBody = page.getByPlaceholder('Write your article (in');
    this.articleTags = page.getByPlaceholder('Enter tags');
  }

  async fillArticleTitle(title) {
    await test.step(`Fill in the article title`, async () => {
      await this.articleTitle.fill(title);
    });
  }

  async fillArticleDescription(description) {
    await test.step(`Fill in the article description`, async () => {
      await this.articleDescription.fill(description);
    });
  }

  async fillArticleBody(body) {
    await test.step(`Fill in the article body`, async () => {
      await this.articleBody.fill(body);
    });
  }

  async addArticleTag(tag) {
    await test.step(`Fill in the article tag`, async () => {
      await this.articleTags.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }

  async clickArticleTag(tag) {
    await test.step(`Click article tag: ${tag}`, async () => {
      await this.page.getByText(tag, { exact: true }).click();
    });
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
}
