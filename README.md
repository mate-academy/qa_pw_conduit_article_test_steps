# Practice task: Conduit article tests with steps

## Preparation:
1. Open the forked repo in VSCode.
2. Create a new branch: git checkout -b added_article_test
3. Run the installation commands `npm ci` & `npx playwright install`.

## Main task:
1. Create new tests for the conduit article: 
* *create an article with required and optional fields;*
* *create an article without article description;* 
* *create an article without article text;* 
* *create an article without article tag;* 
2. Use as an example *createArticleWithoutRequiredFields.spec.js* test.
3. Please use the POM pattern for new test. 
4. Add all the test preconditions to the beforeEach block. 
5. Please add a `test.step` for each method in the page classes;
6. Re-run all your tests and make sure they pass after the updates. 

# Hint:
When adding tags use  `await page.keyboard.press('Enter');` method to enter the tag after filling it's value. Please read more about keyboard actions in the [documentation](https://playwright.dev/docs/api/class-keyboard). 

## Task Reporting: 
1. Add and commit all your updates. 
2. Push the code to the origin.
3. Create PR for your changes. 
4. Fix all the suggestions from the Code review until PR is approved.  

