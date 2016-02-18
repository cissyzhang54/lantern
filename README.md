Lantern [![Circle CI](https://circleci.com/gh/Financial-Times/lantern/tree/master.svg?style=svg)](https://circleci.com/gh/Financial-Times/lantern/tree/master)
------

![image](http://cache3.asset-cache.net/xt/544464663.jpg?v=1&g=fs1%7C0%7CFLS%7C64%7C663&s=1)

Data analytics for the connoisseur FT worker

### Required environmental variables:
The following keys all need to placed with corresponding values within a `.env` file in the root of the project.
- LANTERN_API_KEY

#### Node environment
- NODE_MAX_OLD_SPACE_SIZE - size in Mb reserved for 'old' objects before being garbage collected

#### Google Auth
- OAUTH_CLIENT_ID
- OAUTH_CLIENT_SECRET
- HOST_URL - for local development set to `http://localhost:3000`
- HOST_DOMAIN - email host domain used to filter google emails

#### Session Stores
- SESSION_COOKIE_SECRET
- USE_MEMORY_STORE - `true` or `false` - whether to use local in memory session storage
- OPENREDIS_URL - URL to Redis DB. Defaults to `redis://:test@localhost:6379` Ignored if USE_MEMORY_STORE set to true.

#### Elastic Search
- ES_AWS_HOST
- ES_AWS_REGION
- ES_AWS_ACCESS_KEY_ID
- ES_AWS_SECRET_ACCESS_KEY
- ES_INDEX_ROOT
- ES_SEARCH_INDEX_ROOT
- ES_EVENT_INDEX_ROOT
- ES_REALTIME_INDEX_ROOT

#### Sentry Logging
- RAVEN_KEY
- RAVEN_SECRET
- RAVEN_APP_ID

#### App Commands
- 'npm start' Initialises the app
- 'npm test' Runs unit tests
- 'npm run cover' Runs Istanbul test coverage

### Client-Side Logging Information:

 * Logging is drained to Splunk - to filter for lantern events use: `index=heroku source="/var/log/apps/heroku/ft-editorial-lantern.log"`
 * Errors will be emailed to digitalnewsroom.alerts@ft.com
 * Stats can be viewed here: https://app.getsentry.com/ft/production/
 * For more logging know how see: https://docs.getsentry.com/hosted/clients/javascript/usage/#raven-js-reporting-errors

### Automation Testing

- You require the correct `NODE_ENV` variable in your `.env` file
- Get the latest version of Java : `http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html`
- Use the correct version of Selenium server : put `http://selenium-release.storage.googleapis.com/2.47/selenium-server-standalone-2.47.1.jar` into `test/bin` of the project
- Ensure you have chromedriver installed with : `brew install chromedriver`
- If you have trouble, look at `circle.yml` to find out how to get the selenium-server-standalone downloaded
- `npm run functional` will build the static assets, start a test server and run the tests
- `npm run functional-pre-built` will do the above without rebuilding the static assets
- `npm run test` assumes that a build has already happened
