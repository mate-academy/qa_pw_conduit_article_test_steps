import { expect, test } from '@playwright/test';

export class ArticlePage {
    constructor(page) {
        this.page = page;
        this.articleTitle = page.locator('h1');
    }

    async assertTitleisVisible(title) {
        await test.step (`Assert that an article title is visible`, async() => {
            await expect(this.articleTitle).toBeVisible();
            await expect(this.articleTitle).toHaveText(title);
        })
    }
}