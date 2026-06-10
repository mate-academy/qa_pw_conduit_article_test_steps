import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);

    this.articleTitleInput =
      page.getByPlaceholder('Article Title');

    this.articleDescriptionInput =
      page.getByPlaceholder("What's this article about?");

    this.articleBodyInput =
      page.getByPlaceholder('Write your article (in markdown)');

    this.articleTagInput =
      page.getByPlaceholder('Enter tags');

    this.postCommentButton = page.getByRole('button', {
      name: 'Post Comment',
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

  async fillArticleTitle(title) {
    await test.step(`Fill article title`, async () => {
      await this.articleTitleInput.fill(title);
    });
  }

  async fillArticleDescription(description) {
    await test.step(`Fill article description`, async () => {
      await this.articleDescriptionInput.fill(description);
    });
  }

  async fillArticleBody(body) {
    await test.step(`Fill article body`, async () => {
      await this.articleBodyInput.fill(body);
    });
  }

  async fillArticleTag(tag) {
    await test.step(`Fill article tag`, async () => {
      await this.articleTagInput.fill(tag);
    });
  }

  async pressEnterInArticleTagInput() {
    await test.step(`Press 'Enter' in the article tag input`, async () => {
      await this.articleTagInput.press('Enter');
    });
  }

  async assertPostCommentButtonIsVisible() {
    await test.step(`Assert 'Post Comment' button is visible`, async () => {
      await expect(this.postCommentButton).toBeVisible();
    });
  }

  async assertTagExists(tagText) {
    await test.step(`Assert tag '${tagText}' exists`, async () => {
      const elem = `li.tag-default.tag-pill.tag-outline:has-text("${tagText}")`;
      const tag = this.page.locator(elem);
      await expect(tag).toBeVisible();
    });
  }
}
