import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
    this.articleDescription = page.getByRole('textbox', {
      name: "What's this article about?",
    });
    this.articleText = page.getByRole('textbox', {
      name: 'Write your article',
    });
    this.articleTag = page.getByRole('textbox', { name: 'Enter tags' });
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async fillArticleTitle(articleTitle) {
    await test.step(`Fill the 'Article Title' field`, async () => {
      await this.articleTitle.fill(articleTitle);
    });
  }

  async fillArticleDescription(articleDescription) {
    await test.step(`Fill the 'Article Description' field`, async () => {
      await this.articleDescription.fill(articleDescription);
    });
  }

  async fillArticleText(articleText) {
    await test.step(`Fill the 'Article Text' field`, async () => {
      await this.articleText.fill(articleText);
    });
  }

  async fillArticleTag(articleTag) {
    await test.step(`Fill the 'Article Tag' field`, async () => {
      await this.articleTag.fill(articleTag);
      await this.page.keyboard.press('Enter');
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
