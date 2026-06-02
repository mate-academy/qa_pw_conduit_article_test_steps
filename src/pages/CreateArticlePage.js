import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
    this.articleDescription = page.getByRole('textbox', {
      name: "What's this article about?",
    });
    this.articleBody = page.getByRole('textbox', {
      name: 'Write your article (in',
    });
    this.articleTags = page.getByRole('textbox', { name: 'Enter tags' });
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

  async fillTitleField(title) {
    await test.step(`Fill 'Article Title' with '${title}'`, async () => {
      await this.articleTitle.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill description with '${description}'`, async () => {
      await this.articleDescription.fill(description);
    });
  }

  async fillBodyField(body) {
    await test.step(`Fill Article Body with '${body}'`, async () => {
      await this.articleBody.fill(body);
    });
  }

  async fillTagsField(tags) {
    await test.step(`Fill 'Article Tags' field with '${tags}'`, async () => {
      await this.articleTags.fill(tags);
      await this.page.keyboard.press('Enter');
    });
  }

  async assertArticleIsPublished() {
    await test.step('Assert the article is published', async () => {
      await expect(this.page.getByRole('heading', { level: 1 })).toBeVisible();
    });
  }
}
