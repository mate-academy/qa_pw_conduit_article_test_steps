class HomePage {
  constructor(page) {
    this.page = page;
    this.globalFeedLink = page.locator('text=Global Feed');
    this.newArticleLink = page.locator('a[href="/editor"]');
  }

  async goToGlobalFeed() {
    await this.globalFeedLink.click();
  }

  async goToNewArticle() {
    await this.newArticleLink.click();
  }
}

module.exports = { HomePage };
