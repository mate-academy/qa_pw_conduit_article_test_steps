import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.titleArticleField = page.getByPlaceholder('Article Title');
    this.descriptionArticleField = page.getByPlaceholder('What\'s this article about?');
    this.textArticleField = page.getByPlaceholder('Write your article (in');
    this.tagArticleField = page.getByPlaceholder('Enter tags');
    this.titleArticle = page.getByRole('heading');
  }

  async fillArticleTitleField(title) {
    await test.step(`Fill the 'Article Title' field`, async () => {
      await this.titleArticleField.fill(title);
    });

  }

  async fillArticleDescriptionField(description) {
    await test.step(`Fill the 'Article Description' field`, async () => {
      await this.descriptionArticleField.fill(description);
    });
  }

  async fillArticleTextField(text) {
    await test.step(`Fill the 'Article Text' field`, async () => {
      await this.textArticleField.fill(text);
    });
  }

  async fillArticleTagField(tag) {
    await test.step(`Fill the 'Article Tag' field`, async () => {
      await this.tagArticleField.fill(tag);
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

  async assertArticleTitleToVisible(title) {
    await test.step(`Assert the '${title}' is visible`, async () => {
      await expect(this.page.getByRole('heading', { name: title })).toBeVisible();
    });
  }
  
}
