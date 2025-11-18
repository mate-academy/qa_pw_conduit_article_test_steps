import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleDescription = page.getByPlaceholder(
      "What's this article about?"
    );
    this.articleBody = page.getByPlaceholder('Write your article (in');
    this.articleTags = page.getByPlaceholder('Enter tags');
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

  async fillArticleTitle(text) {
    await test.step('Fill articel title', async () => {
      await this.articleTitle.fill(text);
    });
  }

  async fillarticleDescription(text) {
    await test.step('Fill articel description', async () => {
      await this.articleDescription.fill(text);
    });
  }

  async fillaarticleBody(text) {
    await test.step('Fill articel body', async () => {
      await this.articleBody.fill(text);
    });
  }

  async fillaarticleTags(text) {
    await test.step('Fill optional fields (Tags)', async () => {
      await this.articleTags.fill(text);
    });
  }

  async enterEtner() {
    await test.step('Press Enter to add tag', async () => {
      await this.page.keyboard.press('Enter');
    });
  }

  async assertNotOnEditorPage() {
    await test.step("Assert we're not on the editor page", async () => {
      await expect(this.page).not.toHaveURL(
        'https://conduit.mate.academy/editor'
      );
    });
  }
}
