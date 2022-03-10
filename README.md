
TO RUN:
1. create .env and paste this or get new ones from firebase google

REACT_APP_FIREBASE_API_KEY = AIzaSyCt7pcSSIKCkwhqGm4AIrClXBEBFpU46fU
REACT_APP_FIREBASE_AUTH_DOMAIN = test-f8b47.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID = test-f8b47
REACT_APP_FIREBASE_STORAGE_BUCKET = test-f8b47.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = 653959096358
REACT_APP_FIREBASE_APP_ID = 1:653959096358:web:62d130a46ec1e709399ee7



2. open 2 terminals. 

3. One one terminal, type: 

npm i react
npm i react-bootstrap
npm i firebase
npm i react-router-dom
npm start

4. On another terminal, type:
cd server

then
nodemon auth

5. If nodemon auth doesn't work, delete node_modules, package-lock.json and package.json in the SERVER folder.

6. Still in the second terminal, type: 
npm init

7. Press enter all the way until a new command line starts.

8. Then type: 
npm i express cors pg jsonwebtoken bcrypt

9. Now, type either nodemon auth or node auth.

** FOR mac users, if you get a security message, go to system preferences > security & privacy > general then allow. **


-------------------------------------------------------
TO RECREATE TABLE IN PSQL:

psql -U postgres

CREATE DATABASE tonightusers;

\c tonightusers;

CREATE TABLE users (uid uuid PRIMARY KEY DEFAULT uuid_generate_v4(), uname VARCHAR(255) NOT NULL, uemail VARCHAR(255) NOT NULL);

create extension if not exists "uuid-ossp";

-------------------------------------------------
New features added to test-branch

1. When user signs up, their username and password is added to postgres database
2. Username is displayed instead of email after Welcome user ______.


