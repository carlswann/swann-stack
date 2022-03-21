# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build:{env}`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

Not providing `env` will result in `NODE_ENV` being set to local. The environments are:

- development
- staging
- production

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn cypress`

This will run the Cypress module. You need to have the app running for it to work.
You can run the app using `yarn start:test` which will put the app in test mode.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Important libraries installed

### MUI

This project uses Material UI. There is also a set of icons from Material UI which can be used throughout the project.

[documentation](https://mui.com/getting-started/installation/) | [view icons](https://mui.com/components/material-icons/)

### Formik

Powerful library to handle forms.

[documentation](https://formik.org/docs/overview)

### Yup

Yup is a JavaScript schema builder for value parsing and validation.

[documentation](https://www.npmjs.com/package/yup)

### Styled-Components

In case you need to add some custom css to style something differently, avoid adding style props or css classes. Make use of styled-components.

Generally, try to keep `styled-components` or in `components/ui`.

Exception to the rule would be using the `sx` property on material-ui components. You can read more about it [here](https://mui.com/system/the-sx-prop/#main-content)

[documentation](https://styled-components.com/)

### Framer Motion

Make the app pop by adding in motion animations to elements.

[github](https://github.com/framer/motion#readme) | [documentation](https://www.framer.com/docs/) | [examples](https://www.framer.com/docs/examples/)

### React Pefect Scrollbar

Let's face it. Scrollbars and scrolling in general are a pain. This package makes it easier.

[github](https://github.com/goldenyz/react-perfect-scrollbar)

### React i18next

For all your internationalization needs.

[documentation](https://react.i18next.com/)

This package is using [i18next](https://www.i18next.com/) and [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) was also installed to help with browser language detector.

A type declaration has also been defined. This means that there's no more guessing if the path to your translation key is correct or not. If the path does not exist, there will be an error telling you so. This also gives you autocomplete actions.

### React Router

This project is using react-router 6. There are many improvements from the previous version.

Routes are defined in the `Router.tsx` component at the root of the project.

[documentation](https://reactrouter.com/docs/en/v6)
