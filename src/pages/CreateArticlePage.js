import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
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
  async fillArticleTitleField(title) {
    await test.step(`Fill the 'Article Title' field with '${title}'`, async () => {
      await this.page.getByPlaceholder('Article Title').fill(title);
    });
  }
  async fillAboutArticleField(description) {
    await test.step(`Fill the 'About Article' field with '${description}'`, async () => {
      await this.page.getByPlaceholder('What\'s this article about?').fill(description);
    });
  }
  async fillArticleBodyField(body) {
    await test.step(`Fill the 'Article Body' field with '${body}'`, async () => {
      await this.page.getByPlaceholder('Write your article (in markdown)').fill(body);
    });
  }
  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field with '${description}'`, async () => {
      await this.page.getByPlaceholder('What\'s this article about?').fill(description);
    });
  }
  async fillArticleTagField(tag) {
    await test.step(`Fill the 'Article Tag' field with '${tag}'`, async () => {
      await this.page.getByPlaceholder('Enter tags').fill(tag);
      await this.page.keyboard.press('Enter');
    });
  } 
}
