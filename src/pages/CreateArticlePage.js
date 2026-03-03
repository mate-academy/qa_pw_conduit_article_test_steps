import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Article Title' field: ${title}`, async () => {
      await this.page.getByPlaceholder('Article Title').fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description': ${description}`, async () => {
      await this.page
        .getByPlaceholder("What's this article about?")
        .fill(description);
    });
  }

  async fillBodyField(body) {
    await test.step(`Fill the 'Article Body' field: ${body}`, async () => {
      await this.page
        .getByPlaceholder('Write your article (in markdown)')
        .fill(body);
    });
  }

  async fillTagsField(tags) {
    await test.step(`Fill the 'Tags' field: ${tags}`, async () => {
      await this.page.getByPlaceholder('Enter tags').fill(tags);
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async pressEnterInTagsField() {
    await test.step(`Press 'Enter' in the 'Tags' field`, async () => {
      await this.page.keyboard.press('Enter');
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async assertTitle(title) {
    await test.step(`Assert the article title is correct`, async () => {
      await expect(
        this.page.getByRole('heading', {
          name: title,
        }),
      ).toBeVisible();
    });
  }
}
