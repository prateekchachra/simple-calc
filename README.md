# La Calculadora : A Simple Calculator Built in React

This project is made as an interview assignment on React.

## About This Project

La Calculadora can take an input in either of these 3 ways

- Typing directly into the input box
- Typing anything on the keyboard if the input is unfocused.
- Clicking on the buttons.

The calculator handles three kinds of values :
**Digits**, **Operators** and **Special Operators**

Digits are numbers from 0-9 and the Decimal .

The calculator uses these operators:

- Multiple
- Division
- Addition
- Subtraction

And some special operators:

- Percentage
- Inversion (+/-)
- Clear (C)
- Equals (Outputs the result)

The inputs are properly sanitized (Only digits and operators allowed)

Special key inputs are handled:

- Delete (Same as clear, resets input)
- Enter (Same as equals, outputs result)
- Clear (C)

The calculator can handle more than two operations by chaining the results, and the input is handled accordingly.

## Technologies used:

### UI

For UI, React.JS and simple CSS is being used.

### Testing

For testing, Jest and React-Testing-Library (Now @testing-library/react) is being used for both Unit and Integration tests.

### Error Handling

For error handling, **react-error-boundary** is being used instead of implementing the ErrorBoundary that comes with React.JS by default
because the library provides us additional features and handling.

**Sentry** is being used to log the errors

### Package Management

**Yarn** is being used as the default package manager.

## Scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches tests for all the components.

### `yarn build`
