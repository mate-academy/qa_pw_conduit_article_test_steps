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
    this.articleBody = page.getByPlaceholder(
      'Write your article (in markdown)',
    );
    this.articleTag = page.getByPlaceholder('Enter tags');
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async fillArticleTitleField(title) {
    await test.step(`Fill 'Article Title' field`, async () => {
      await this.articleTitle.fill(title);
    });
  }

  async fillArticleDescriptionField(description) {
    await test.step(`Fill 'Article Description' field`, async () => {
      await this.articleDescription.fill(description);
    });
  }

  async fillArticleBodyField(body) {
    await test.step(`Fill 'Article Body' field`, async () => {
      await this.articleBody.fill(body);
    });
  }

  async fillArticleTagField(tag) {
    await test.step(`Fill 'Article Tag' field`, async () => {
      await this.articleTag.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert '${title}' article title is visible`, async () => {
      const articleTitleHeader = this.page.getByRole('heading', {
        name: title,
      });
      await expect(articleTitleHeader).toBeVisible();
    });
  }
}
