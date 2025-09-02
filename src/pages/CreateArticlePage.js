import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleAboutField = page.getByPlaceholder('What\'s this article about?');
    this.articleBodyField = page.getByPlaceholder('Write your article (in markdown)');
    this.articleTagsField = page.getByPlaceholder('Enter tags');
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

  async assertTitleIsVisible(articleTitle) {
    await test.step(`Assert the article with title '${articleTitle}' is opened`, async () => {
      await expect(this.page.getByRole('heading', { name: articleTitle })).toBeVisible();
    });
  }

  async fillArticleTitleField(articleTitle) {
    await test.step(`Fill the 'Article Title' field with '${articleTitle}'`, async () => {
      await this.articleTitleField.fill(articleTitle);
    });
  }

  async fillArticleAboutField(articleAbout) {
    await test.step(`Fill the 'Article About' field with '${articleAbout}'`, async () => {
      await this.articleAboutField.fill(articleAbout);
    });
  }

  async fillArticleBodyField(articleBody) {
    await test.step(`Fill the 'Article Body' field with '${articleBody}'`, async () => {
      await this.articleBodyField.fill(articleBody);
    });
  }

  async fillArticleTagsField(articleTags) {
    await test.step(`Fill the 'Article Tags' field with '${articleTags}'`, async () => {
      await this.articleTagsField.fill(articleTags);
    });
    await test.step(`Press 'Enter' to add the tag`, async () => {
      await this.page.keyboard.press('Enter');
    });
  }
}
