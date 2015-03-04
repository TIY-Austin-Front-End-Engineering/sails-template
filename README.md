# Full stack javascript Sails template

![overview diagram](/development-heroku.jpg)

## Setup

### 1. Install all of the necessary software

> You will only ever need to do these steps once.

1. From your terminal (any directory is fine) run `brew update`
2. If you haven't already installed node, do it now.
	1. Run `brew install node`
3. If you haven't already installed postgres, do it now.
	1. Run `brew install postgresql`
	2. Then run `ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents`
	3. Then run `launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist`
4. Install sails `npm install -g sails forever grunt-cli`
5. Create a free account on Heroku. Be sure to pick node.js as your development language.
	* [Heroku sign up](https://signup.heroku.com/dc)
6. Go to [this link](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
7. Download and install the Heroku Toolbelt for Mac OS X

### 2. Set up your local development environment

> You will need to do all of these steps once for each new project.

1. Create a postgres database for your new application: `createdb appdb`
2. Create a postgres user for your new application: `createuser postgres`
3. Fork and then clone this repo from GitHub.
4. Run `npm install` to install the back-end dependencies.
5. Run `bower install` to install the front-end dependencies. 
6. To run your sails server type `forever -w start app.js`. This will restart the server any time there is a change to one of the server files.
	1. To stop the sails server type `forever stop app.js`
7. I recommend keeping the server output log open in its own terminal window: `forever logs app.js -f`
	1. To stop watching the log type `ctrl+c`
8. Open http://localhost:1337 in Chrome to make sure that the app is running properly

### 3. Set up your production environment

> You will need to do all of these steps once for each new project.

1. On the command line make sure that you are inside of your project directory and your project has a github repo (aka you have typed `git init` or cloned it from GitHub)
2. Run the command `heroku create` to create a new app on heroku. You may have to enter your heroku username and password.
3. Run `heroku addons:add heroku-postgresql` to create a database on heroku for your app.
4. Run `heroku config:set NODE_ENV=heroku` to set the environment variable to heroku. This will cause the heroku server to use a slightly different server configuration.

### 4. Deploy to production

> You will need to do these steps each time you have changes on your development environment that you want to deploy to production (aka heroku).

1. `git add .` and `git commit -m "message"`. Be sure to include all of the .tmp files in your commit.
4. Run `git push heroku master`. This will update your production server with all of the code you just committed.
5. This is usually a good time to push to github too: `git push origin master`

### 5. Shutting down your dev environment

> Sails can slow down your computer, so when you're not doing dev work you'll want to shut downt he server.

1. Run `foerver stopall`.
2. Type `ctrl+c` to quit out of any running logs.

## Authentication API

Built into this template is user authentication. Below are the api endpoints that are available to you:

**/auth/local/register**

Registers a new user in your app.

Method: POST

Parameters:

 - username: string, required
 - email: string, required (must be a valid email address)
 - password: string, required (length greater than or equal to 8 characters)

Returns an object with the following properties:

 - success: boolean - true if the user was successfully registered, else false.
 - errors: array - a list of error codes (if any) that were encountered.
 - user: object - contains the newly registered user if registration was successfull.

*Will return an error if the user is logged in. Only logged out users can register.*

- - -

**/auth/local**

Validates a users credentials and logs them in if they are correct.

Method: POST

Parameters:

 - identifier: string, required
 - password: string, required

Returns an object with the following properties:

 - success: boolean - true if the user was successfully logged in, else false.
 - errors: array - a list of error codes (if any) that were encountered.
 - user: object - contains the newly registered user if registration was successfull.

- - - 

**/auth/user**

Gets the currently logged in user.

Method: GET

Parameters: *none*

Returns an object with the properties of the currently logged in user, or an empty object with a 404 status code if there is no logged in user.

- - - 

**/logout**

Logs a user out.

Method: GET / POST

Parameters: *none*

Returns an object with the following properties:

 - success: boolean - true if the user was successfully logged out, else false.
 - errors: array - a list of error codes (if any) that were encountered.
