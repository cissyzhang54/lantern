Lantern
------

![image](http://cache3.asset-cache.net/xt/544464663.jpg?v=1&g=fs1%7C0%7CFLS%7C64%7C663&s=1)

Data analytics for the connoisseur FT worker

### Required environmental variables:
The following keys all need to placed with corresponding values within a `.env` file in the root of the project.
- LANTERN_API_KEY

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
- ES_HOST
- ES_PORT
- ES_USER
- ES_PASS
- ES_INDEX_ROOT