import { expect, test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.yourFeedTab = page.getByText('Your Feed');
    this.globalFeedTab = page.getByText('Global Feed');
    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async clickHomeLink() {
    await test.step(`Click the 'Home' link`, async () => {
      await this.homeLink.click();
    });
  }

  async clickNewArticleLink() {
    await test.step(`Click the 'New Article' link`, async () => {
      await this.newArticleLink.click();
    });
  }

  async assertYourFeedTabIsVisible() {
    await test.step(`Assert the 'Your Feed' tab is visible`, async () => {
      await expect(this.yourFeedTab).toBeVisible();
    });
  }

  async clickGlobalFeedTabLink() {
    await test.step(`Click the 'Global Feed' tab link`, async () => {
      await this.globalFeedTab.click();
    });
  }
}
