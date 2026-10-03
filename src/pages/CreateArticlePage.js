import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.
    getByPlaceholder('What\'s this article about?');
    this.bodyField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
  }

  async fillTitleField(title) {
    await test.step(`Fill in the article title '${title}'`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step('Fill in the article description', async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillBodyField(body) {
    await test.step('Fill in the article body', async () => {
      await this.bodyField.fill(body);
    });
  }

  async fillTagsField(tag) {
    await test.step(`Add the tag '${tag}'`, async () => {
      await this.tagsField.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertArticleCreated(titleText) {
    await test.step(`Assert that the article '${titleText}' is created`, 
      async () => {
      await expect(
        this.page.getByRole('heading', { name: titleText }),
      ).toBeVisible();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
