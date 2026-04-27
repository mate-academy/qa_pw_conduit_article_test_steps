/* eslint-disable max-len */
import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.newArticleTitle = page.getByRole('textbox', { name: 'Article Title' });
    this.newArticleDesctiption = page.getByRole('textbox', { name: 'What\'s this article about?' });
    this.newArticleText = page.getByRole('textbox', { name: 'Write your article (in' });
    this.newArticleTag = page.getByRole('textbox', { name: 'Enter tags' });
    
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

  async verifyRedirectToArticlePage() {
    await test.step(`Assert the 'Preview' is shown`, async () => {
      await expect(this.page).toHaveURL(/\/article\/.*/);
    
    });
  }


     async clickNewArticleTitle() {
    await test.step(`Click the 'Article Title'`, async () => {
      await this.newArticleTitle.click();
   });
  }

   async fillNewTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.newArticleTitle.fill(title);
    });
  }



    async clickNewArticleDescription() {
    await test.step(`Click the 'Description' field`, async () => {
      await this.newArticleDesctiption.click();
   });
  }

   async fillNewDescription(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.newArticleDesctiption.fill(description);
    });
  }



    async clickNewArticleText() {
    await test.step(`Click the 'Text' field`, async () => {
      await this.newArticleText.click();
   });
  }

   async fillNewText(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.newArticleText.fill(text);
    });
  }

   
    async clickNewArticleTag() {
    await test.step(`Click the 'Tag' field`, async () => {
      await this.newArticleTag.click();
   });
  }

   async fillNewTag(tag) {
    await test.step(`Fill the 'Tag' field`, async () => {
      await this.newArticleTag.fill(tag);
      await this.page.keyboard.press('Enter');
    });
  }

  }