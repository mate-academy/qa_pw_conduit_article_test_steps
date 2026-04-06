import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.titleField = page.getByPlaceholder('Article Title');
    this.aboutField = page.getByPlaceholder('What\'s this article about?');
    this.articleField = page.getByPlaceholder(
      'Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.createdArticleTitle = page.locator('div h1');
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

  async fillTitle(text) {
    await test.step('Fill title field', async () => {
      await this.titleField.fill(text);
    });
  }

  async fillAbout(text) {
    await test.step('Fill about field', async () => {
      await this.aboutField.fill(text);
    });
  }

  async fillArticle(text) {
    await test.step('Fill article field', async () => {
      await this.articleField.fill(text);
    });
  }

  async fillTags(text) {
    await test.step('Fill tags field', async () => {
      await this.tagsField.fill(text);
    });
  }

  async assertCreatedArticleTitle(title) {
    await test.step('Assert created article has same title', async () => {
      await expect(this.createdArticleTitle).toContainText(title);
    });
  } 
}
