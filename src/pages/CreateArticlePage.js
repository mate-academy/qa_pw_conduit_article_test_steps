import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleDescriptionField = page.getByPlaceholder('What\'s this article about?')
    this.articleBodyField = page.getByPlaceholder('Write your article (in Markdown)');
    this.articleTagsField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.articleHeading = page.getByRole('heading', { level: 1 });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTagsList = page.locator('.tag-list');
  }

  async fillArticleTitleField(title) {
    await test.step(`Fill the 'Article Title' field with '${title}'`, async () => {
      await this.articleTitleField.fill(title);
    });
  }

  async fillArticleDescriptionField(description) {
    await test.step(`Fill the 'Article Description' field with '${description}'`, async () => {
      await this.articleDescriptionField.fill(description);
    });
  }

  async fillArticleBodyField(body) {
    await test.step(`Fill the 'Article Body' field with '${body}'`, async () => {
      await this.articleBodyField.fill(body);
    });
  }

  async fillArticleTagsField(tags) {
    await test.step(`Fill the 'Article Tags' field with '${tags}'`, async () => {
      await this.articleTagsField.fill(tags);
      await this.page.keyboard.press('Enter'); 
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertArticleTagsListIsNotVisible() {
    await test.step(`Assert the article tags list is not visible`, async () => {
      await expect(this.articleTagsList).not.toBeVisible();
    });
  }

  async assertArticleHeadingContainsText(headingText) {
    await test.step(`Assert the article heading contains the text '${headingText}'`, async () => {
      await expect(this.articleHeading).toContainText(headingText);
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
