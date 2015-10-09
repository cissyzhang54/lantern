### Hints and Tips for specific IDE setups

#### IntelliJ

Initial Setup
- In "Run" -> "Edit Configurations"
- Create a new configuration can be called "Build and Run"
- Add all the required environment variables within the "Environment variables" section.
- Set in "before launch: External tools" add in entries for `npm install` and `npm build`
- (due to webpack) Add `npm run dev-server` into external tools but un-tick it, it needs to be run separately.
- Set the JavaScript file to "lib/server/server.js"

To Run or Debug
- (due to webpack) First go "Tools" > "External Tools" > "npm run dev-server". This will start serving the static files.
- Then simply use the normal "Run" or "Debug" options, if running the debugger you will need to attach break points
inside the compiled files within the lib/.. folder and not directly to the source.
