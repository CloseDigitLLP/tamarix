# Tamarix

## Folder Structure

**assets**
All static assets are stored here, like css, scss, js, images, etc.

**components**
All common components will be stored in root component folder

**configs**
All general configurations like BaseURLs, and all other api urls will be stored in this folder.

**layouts**
All different layout components will be stored in layout folder.

**pages**
All the Components which will directly added as a page on react router will be stored here. also page level **components** folder will be here where all the components which are specific to pages are stored in this **components** folder.

**services**
All the API calls are being managed from here using the Redux. In services I have divided Redux management into multiple modules, in our case we have 3 modules which are **Portfolio**, **Scenarios** and **forecasts**.

Each module has their own set of **ActionTypes**, **Actions**, and **Reducers**. And each API call has different status flags available like **success**, **loading** and **error**, to make the api response structure common, I've used **data** key to store the api response and access using that key only. So using this structure we can get idea of the api call status everywhere and complete the operations accordingly.

Also this folder has **store.js** and **reducer.js**, store.js file is for the basic configuration of the redux store and middlewares configurations, in our case we are using **thunk** middleware. and Reducer js manages separations of different reducers and their keys to access.

**utils**
This folder contains all the utility functions like changing the formats of dates, numbers etc. and other general purpose functions.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\

You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Backlogs

```bash
https://tamarix-technical-interview.herokuapp.com/users/me/forecasts
```

- For the above API currently metrics in request body are static.

> Explanation

I tried to make the metrics in the request body dynamic, using the **exposure_metrics** and **cash_flow_metrics** from the **port_settings** of the portfolio details api. but using those values, I was not able to get the proper API response.

```json
{
  "portfolio": {
    "2021": {},
    "2022": {},
    "2023": {},
    "2024": {},
    "2025": {},
    "2026": {},
    "2027": {},
    "2028": {},
    "2029": {},
    "2030": {},
    "2031": {},
    "id_": {},
    "strategy": {},
    "vintage": {},
    "commitment_status": {},
    "commitment": {},
    "metric": {}
  },
  "roadmap": {}
}
```

This is what i am getting in api response using the below values in api request.

```json
{
  "scenario_name": "Baseline",
  "metrics": ["NAV", "Commitment"],
  "port_name": "port_1",
  "roadmap": []
}
```

    /users/me/portfolios/port_1

- For the API response, inside the **port_data**, **"Commitment "** and **"Total distributed "** are having extra white space at the end.
