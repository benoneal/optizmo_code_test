# Optizmo Code Test

### Specification: 

Write the below application in Javascript or Typescript (e.g. Node.js) using an application
type of your choice (console, web). You should focus on implementing the features
outlined below using an interface appropriate for your chosen application type (e.g.
buttons and fields for web, prompts for console etc).

Your application should be production ready and include appropriate tests

Write an application that is backed by a data store of 50,000 email addresses.

- It should provide an interface to accept a series of email addresses along with a parameter X for the frequency of alerts in seconds.
- If an input email address is contained in the data store, notify the user on entry.
- Every X seconds, the application must output a comma separated list of all the emails that have been entered by the user along with an indication of if they were matched to one contained in the data store. The output must be sorted by the matched status then alphanumerically by email.
- If the user enters ‘stop’, the application should stop outputting the list on the timer.
- If the user enters ‘start’, the application should resume outputting the list on the timer.
- If the user enters ‘quit’, the application should output a farewell message then quit

### To run

```
npm i
npm start
```

##### Run tests

```
npm test
```

(NB: Tests are ridiculously slow. Seems related to ts-jest and is a very old unresolved issue: https://github.com/kulshekhar/ts-jest/issues/259 None of the suggestions in that issue improved anything)