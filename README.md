# Conduit Article Tests With Steps

## Preparation

1. Open the forked repo in VSCode.
2. Create a new branch by running `git checkout -b task_solution`.
3. Run the installation commands: `npm ci` and `npx playwright install`.

## Task

1. Create new tests for the conduit article: 

    * *create an article with required and optional fields*
    * *create an article without article description* 
    * *create an article without article text* 
    * *create an article without article tag* 

2. Use as an example `createArticleWithoutRequiredFields.spec.js` test.
3. Use the POM pattern for the new test. 
4. Add all the test preconditions to the `beforeEach` block. 
5. Add a `test.step` for each method in the page classes.
6. Re-run all your tests and make sure they pass after the updates. 

<details>
  <summary><strong>Hint</strong></summary>

  
  When adding tags, use the `await page.keyboard.press('Enter');` method to enter the tag after filling it's value. You can read more about keyboard actions in the [documentation](https://playwright.dev/docs/api/class-keyboard). 
</details>

## Task Reporting

1. Add and commit all your updates. 
2. Push the code to the origin.
3. Create PR for your changes. 
4. Fix all the suggestions from the Code review until PR is approved.  
