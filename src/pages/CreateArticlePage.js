import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleAbout = page.getByPlaceholder("What's this article about?");
    this.articleMarkDown = page.getByPlaceholder(
      'Write your article (in markdown)',
    );
    this.articleTags = page.getByPlaceholder('Enter tags');

    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
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

  async fillArticleTitle(articleTitle) {
    await test.step('Fill the Article Title field', async () => {
      await this.articleTitle.fill(articleTitle);
    });
  }
  async fillArticleAbout(articleAbout) {
    await test.step('Fill the Article About field', async () => {
      await this.articleAbout.fill(articleAbout);
    });
  }
  async fillArticleMarkDown(articleMarkDown) {
    await test.step('Fill the Article Mark Down field', async () => {
      await this.articleMarkDown.fill(articleMarkDown);
    });
  }
  async fillArticleTags(articleTags) {
    await test.step('Fill the Article Tags field', async () => {
      for (const tag of articleTags) {
        await this.articleTags.fill(tag);
        await this.page.keyboard.press('Enter');
      }
    });
  }
}
