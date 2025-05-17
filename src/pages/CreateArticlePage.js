import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.bodyField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      
        await this.publishArticleButton.click()
  });
    }
  

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field with '${title}'`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field with '${description}'`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillBodyField(body) {
    await test.step(`Fill the 'Body' field with '${body}'`, async () => {
      await this.bodyField.fill(body);
    });
  }

  async fillTagField(tag) {
    await test.step(`Fill the 'Tag' field with '${tag}'`, async () => {
      await this.tagField.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }

  async checkCreateArticleButtonIsHere() {
    await test.step(`Check the 'Create Article' button is here`, async () => {
      await expect(this.publishArticleButton).toBeVisible();
    });
  }

  async waitForCreatedArticlePage() {
    await test.step(`Await for Created Article page`, async () => {
      await this.page.waitForTimeout(6000);
      await expect(this.page.url()).toContain('/article/');
    });
  }

  async checkCreatedArticleTitleIsHere(title) {
    await test.step(`Check created title is here`, async () => {
      await expect(this.page.getByRole('heading', { level: 1 })).toContainText(title);
    });
  }
  
  
}
