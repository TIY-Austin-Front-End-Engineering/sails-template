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

## Adding API Models

The sails command line tool allows you to generate some basic code for models and controllers. To create a new API Model run the command `sails generate api Example`  an Example Model

## File Upload

This branch adds the ability to do file uploads to Amazon S3 and takes advantage of Sails' skipper module. It uses ng-file-upload on the front-end. Before this will work fo you you will need to...

1. Run `npm install`
2. Run `bower install`
3. Rename `assets/bower_components/ng-file-upload/angular-file-upload.js` to `assets/bower_components/ng-file-upload/ng-file-upload.js` so that it loads in the correct order.
4. Sign up for an [Amazon Web Services](http://aws.amazon.com/) account.
5. [Create an s3 bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) to store your files.
6. Generate an [Access Key ID and Secret Access Key](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html).
7. Determine your s3 region. To do this [go to your s3 console](https://console.aws.amazon.com/s3/home). Look in the address bar of your browser. It should say something like `https://console.aws.amazon.com/s3/home?region=...`. Your region should show up instead of the ...
8. Fill in your unique access key id, secret access key, bucket, and region in the config/s3.js file.
9. Change your bucket policy to make files public...

By default all files that you upload to your s3 bucket will be private. To change them to be public by default you'll want to add the below policy to your bucket. Instructions on how to add a policy [can be found here](http://docs.aws.amazon.com/AmazonS3/latest/UG/EditingBucketPermissions.html).

```js
{
	"Version": "2008-10-17",
	"Statement": [
		{
			"Sid": "AllowPublicRead",
			"Effect": "Allow",
			"Principal": {
				"AWS": "*"
			},
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::tiyfe/*"
		}
	]
}
```

See assets/js/app/controllers.js for an example of how to save a file. The response is an array of objects, which includes the URL where the uploaded file can be accessed in the future. An example response might look like:

```js
[
	{
		"fd": "ed5d2ed2-70c9-47ec-916f-98355adeb829.png",
		"size": 40278,
		"type": "image/png",
		"filename": "breadcrumbs.png",
		"status": "bufferingOrWriting",
		"field": "file",
		"extra": {
			"Location": "https://tiyfe.s3-us-west-2.amazonaws.com/ed5d2ed2-70c9-47ec-916f-98355adeb829.png",
			"Bucket": "tiyfe",
			"Key": "ed5d2ed2-70c9-47ec-916f-98355adeb829.png",
			"ETag": "\"4fc57fd5f9228a7f89728288dd02f074-1\"",
			"size": 40278
		}
	}
]
```



## Authentication API

Built into this template is user authentication. Below are the api endpoints that are available to you:

**/auth/local/register**

Registers a new user in your app.

Method: POST

Parameters:

 - username: string, required
 - email: string, required (must be a valid email address)
 - password: string, required (length greater than or equal to 8 characters)

Returns an object with the following properties on success:

 - redirect: string - the path where the user would be redirected had they logged in via a regular form.
 - user: object - contains the newly registered user if registration was successfull.

Returns an object with the following properties on failure:

 - error: string - the error code that caused the failure.
 - status: integer - the HTTP status code.
 - summary: string - a message describing the error.

*Will return an error if the user is logged in. Only logged out users can register.*

- - -

**/auth/local**

Validates a users credentials and logs them in if they are correct.

Method: POST

Parameters:

 - identifier: string, required
 - password: string, required

Returns an object with the following properties on success:

 - redirect: string - the path where the user would be redirected had they logged in via a regular form.
 - user: object - contains the newly registered user if registration was successfull.

Returns an object with the following properties on failure:

 - error: string - the error code that caused the failure.
 - status: integer - the HTTP status code.
 - summary: string - a message describing the error.

- - - 

**/auth/user**

Gets the currently logged in user.

Method: GET

Parameters: *none*

Returns an object with the following properties if the user is logged in:
	
 - username: string - The currently logged in user's username.
 - email: string - The currently logged in user's email.
 - id: integer - The currently logged in user's id.
 - createdAt: datetime - The date and time the user was created.
 - updatedAt: datetime - The date and time the user was last updated.

Returns an object with the following properties if the user is not logged in:

 - error: string - the error code that caused the failure.
 - status: integer - the HTTP status code.
 - summary: string - a message describing the error.

- - - 

**/logout**

Logs a user out.

Method: GET / POST

Parameters: *none*

Returns an object with the following properties:

 - success: boolean - true if the user was successfully logged out, else false.

Returns an object with the following properties if an error is encountered:

 - error: string - the error code that caused the failure.
 - status: integer - the HTTP status code.
 - summary: string - a message describing the error.
