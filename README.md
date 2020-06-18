# Interview Scheduler

This single page client app has been built with React, and features unit, integration, and end-to-end unit testing of all the components.

As with all modern React apps, this scheduler features dynamic rendering of components, updating as the state of the data changes. 

## Images

![image one](https://github.com/Daniel-N-Huss/scheduler/blob/master/docs/schedulerMainView.png?raw=true)
![image two](https://github.com/Daniel-N-Huss/scheduler/blob/master/docs/SchedulerEditDeleteView.png?raw=true)

## Setup

Install dependencies with `npm install`.

Please ensure that the react-test-renderer package matches your version of react and react-dom on your host machine. 

This repo hosts the client side of this application only. The server pair to this app can be found [@lighthouse-labs/scheduler-api](https://github.com/lighthouse-labs/scheduler-api).
Documentation for setting up the server can be found in the readme at the link above.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Tests

```sh
npm run cypress
```