import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleDescription = page.getByPlaceholder('What\'s this article about?');
    this.articleBody = page.getByPlaceholder('Write your article (in');
    this.articleTags = page.getByPlaceholder('Enter tags');
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async fillArticleTitle(articleTitle) {
    await test.step(`Fill the 'Article Title' field`, async () => {
      await this.articleTitle.fill(articleTitle);
    });
  }

  async fillArticleDescription(articleDescription) {
    await test.step(`Fill the 'What's this article about?' field`, async () => {
      await this.articleDescription.fill(articleDescription);
    });
  }

  async fillArticleBody(articleBody) {
    await test.step(`Fill the 'Write your article (in markdown)' field`, async () => {
      await this.articleBody.fill(articleBody);
    });
  }

  async fillArticleTags(articleTags) {
    await test.step(`Fill the 'Enter Tags' field`, async () => {
      await this.articleTags.fill(articleTags);
      await this.articleTags.press('Enter');
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

  async assertArticleCreation(articleTitle) {
    const articleTitleAfterCreation = this.page.getByRole('heading', { name: articleTitle });

    await test.step(`Assert the article with the name - '${articleTitle}' is created`, async () => {
      await expect(articleTitleAfterCreation).toContainText(articleTitle);
    });
  }
}
