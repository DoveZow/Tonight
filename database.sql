/* type into terminal to create database for table users */
psql -U postgres

/* input password */

CREATE DATABASE tonightusers;

\c tonightusers;

CREATE TABLE users (uid SERIAL PRIMARY KEY, uname VARCHAR(255) NOT NULL, uemail VARCHAR(255) NOT NULL, upass VARCHAR(255) NOT NULL, utype VARCHAR(255) NOT NULL);


/* install this extension by typing into postgres terminal */
create extension if not exists "uuid-ossp";