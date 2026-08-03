import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.acticletTitleField = page.getByPlaceholder('Article Title')
    this.aboutActicleField = page.getByPlaceholder(`What's this article about?`)
    this.acticleDescField = page.getByPlaceholder('Write your article (in')
    this.tagsField = page.getByPlaceholder('Enter tags')

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

  async fillActicleTitle(title) {
    await test.step(`Fill the article title field`, async() => {
      await this.acticletTitleField.fill(title)
    })
  }

  async fillAboutArticleField(aboutField) {
    await test.step(`Fill about the acticle field`, async () => {
      await this.aboutActicleField.fill(aboutField)
    })
  }
  async fillActicleDescription(description) {
    await test.step(`Fill description for the article`, async () => {
      await this.acticleDescField.fill(description)
    })
  }

  async fillActicleTags(tags) {
    await test.step(`Fill tags`, async () => {
      for (const i of tags) {
        await this.tagsField.fill(i)
        await this.page.keyboard.press('Enter')
      }
    })
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article title is visible`, async () => {
      await expect(this.acticletTitleField).toHaveValue(title);
    });
  }}
