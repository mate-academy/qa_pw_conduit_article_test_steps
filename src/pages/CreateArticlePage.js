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
      'What\'s this article about?');
    this.articleText = page.getByPlaceholder('Write your article (in');
    this.articleTags = page.getByPlaceholder('Enter tags');
    this.title = page.locator('h1');
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
  async fillArticleTitle(text){
    await test.step(`fill Article Title`, async () => {
    await this.articleTitle.fill(text);
   });
  }
  async fillArticleDescription(text){
    await test.step(`fill Article Description`, async () => {
    await this.articleDescription.fill(text);
    });
  }
  async fillArticleText(text){
    await test.step(`fill Article Text`, async () => {
    await this.articleText.fill(text);
    });
  }
  async fillArticleTags(text){
    await test.step(`fill Article Tags`, async () => {
    await this.articleTags.fill(text);
    });
  }
  async pressEnter(){
    await test.step(`press Enter`, async () => {
    await this.page.keyboard.press('Enter');
    });
  }
  async assertArticleIsAdded(text) {
    await test.step(`Assert article heading is shown`, async () => {
      await expect(this.title).toContainText(text);
    });
}}
