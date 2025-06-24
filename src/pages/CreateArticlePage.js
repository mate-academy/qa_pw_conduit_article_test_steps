import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleDescriptionField = page.getByPlaceholder(
      'What\'s this article about?'
    );
    this.articleBodyField = page.getByPlaceholder(
      'Write your article (in markdown)'
    );
       this.articleTagField = page.getByPlaceholder(
      'Enter tags'
    );

  }

  async fillArticleTitle(text) {
    await test.step(`Fill article title with text *${text}*`, async () => {
      await this.articleTitleField.fill(text);
    });
  }

  async fillArticleDescription(text) {
    await test.step(
      `Fill article description with text *${text}*`, 
      async () => {
        await this.articleDescriptionField.fill(text);
    });
  }

  async fillArticleBody(text) {
    await test.step(
      `Fill article text with text *${text}*`, 
      async () => {
        await this.articleBodyField.fill(text);
    });
  }

  async addTagForArticle(tagText) {
    await test.step(`Add tag ${tagText} for article`, async () => {
      await this.articleTagField.fill(tagText);
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

  async assertErrorMessageToHidden() {
    await test.step('Assert the error message is not shown', async () =>{
      await expect(this.errorMessage).toBeHidden();
    });
  }
}
