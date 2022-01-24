# Backend
Backend will currently run on localhost 5000\
Start by using the command 
```bash
nodemon app.js
```
## Structure of files
**Controllers** - This folder contain function that are used in GET and POST routes.\
**Helpers** - This folder contains middleware and configuration function which are needed for some modules to work.\
**Models** - This folder contains mongoDB Schemas and plugins.\
**Public** - This folder contains some placeholder html files for testing.\
**Routes** - This folder contains all the express routes and integrates the controllers and helpers.

## Routes

### GET routes
_/video/_ - Opens a temporary html file for testing purposes \
_/video/delete/:videoId_ - Delete a video with the Id from S3 as well as Database\
_/video/search_ - Searches for keywords in video title and description (Requires an input query field with name 'searchText')\
_/video/:videoId_ - fetches details of video with Id ( Details include videoId, videoBucket, videoURL, Title, Description, uploadUser and Comments)  

_/auth/signin_ - Opens a temporary signin html file with form(POSTs to /auth/signin) \
_/auth/signup_ - Opens a temporary signup html file with form(POSTs to /auth/signup) \
_/auth/signout_ - Sign out currently logged in user 

_/question/list_ - List all unanswered questions\
_/question/ask_ - Opens a temporary html file with question asking form(POSTs to /question/ask)


### POST routes
_/video/upload_ - Uploads video to S3 and updates DB 

_/auth/signin_ - Verifies User\
_/auth/signup_ - Creates a new user and adds to DB

_/question/ask_ - Adds question to DB

## DotENV variables
PORT\
S3_BUCKET\
AWS_ACCESS_KEY\
AWS_SECRET_ACCESS_KEY\
MONGODB_URL