import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
   // eslint-disable-next-line max-len
    this.articleDescriptionField = page.getByPlaceholder("What's this article about?");
   // eslint-disable-next-line max-len
    this.articleBodyField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);

    this.articleContent = page.locator('.article-content p');
    this.articleTagList = page.locator('.tag-list li');
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Article Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.articleDescriptionField.fill(description);
    });
  }

  async fillBodyField(body) {
    await test.step(`Fill the 'Body' field`, async () => {
      await this.articleBodyField.fill(body);
    });
  }

  async fillTag(tag) {
    await test.step(`Fill the 'Tags' field`, async () => {
      await this.tagsField.fill(tag);
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

  async assertArticleContentIsVisible(expectedContent) {
    await test.step(`Assert article content contains:
       "${expectedContent}"`, async () => {
      await expect(this.articleContent).toContainText(expectedContent);
    });
  }

  async assertTagIsVisible(tag) {
    await test.step(`Assert tag "${tag}" is visible`, async () => {
      await expect(this.articleTagList).toContainText(tag);
    });
  }
}