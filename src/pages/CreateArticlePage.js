import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.aboutArticleField = page.getByPlaceholder(`What's this article about?`);
    this.articleDescField = page.getByPlaceholder('Write your article (in');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.publishedArticleHeading = page.getByRole('heading', { level: 1 });
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

  async fillArticleTitle(title) {
    await test.step(`Fill the article title field`, async () => {
      await this.articleTitleField.fill(title);
    });
  }

  async fillAboutArticleField(aboutField) {
    await test.step(`Fill about the article field`, async () => {
      await this.aboutArticleField.fill(aboutField);
    });
  }

  async fillArticleDescription(description) {
    await test.step(`Fill description for the article`, async () => {
      await this.articleDescField.fill(description);
    });
  }

  async fillArticleTags(tags) {
    await test.step(`Fill tags`, async () => {
      for (const tag of tags) {
        await this.tagsField.fill(tag);
        await this.page.keyboard.press('Enter');
      }
    });
  }

  async assertPublishedArticleTitleIsVisible(title) {
    await test.step(`Assert published article title '${title}' is visible`, async () => {
      await expect(this.publishedArticleHeading).toHaveText(title);
    });
  }
}