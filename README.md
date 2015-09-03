Lantern
------

![image](http://cache3.asset-cache.net/xt/544464663.jpg?v=1&g=fs1%7C0%7CFLS%7C64%7C663&s=1)

Data analytics for the connoisseur FT worker

Required environmental variables:
- OAUTH_CLIENT_ID
- OAUTH_CLIENT_SECRET
- LANTERN_API_KEY
- SESSION_COOKIE_SECRET
- HOST_URL - for local development set to `http://localhost:3000`
- USE_MEMORY_STORE - `true` or `false` - whether to use local in memory session storage
- OPENREDIS_URL - URL to Redis DB. Defaults to `redis://:test@localhost:6379` Ignored if USE_MEMORY_STORE set to true.