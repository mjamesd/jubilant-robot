# Pressed Words
![status: stable](https://img.shields.io/badge/stable-version%201.0-green)

![License: GNU General Publice License v3.0](https://img.shields.io/badge/license-GNU%20General%20Publice%20License%20v3.0-yellowgreen)

## Description
Pressed Words is a blog app with an MVC content management system using Express.js as the back end, Handlbars as the front end, and MySQL as the database. It utilizes asynchronous JavaScript functions and performs CRUD functions (Create, Read, Update, and Delete) on users, posts, and comments. Unauthenticated users can view the homepage which displays all posts and comments. Once the user registers, they can view individual posts and comments as well as create, update, and delete their own posts and comments. The database login information as well as other behind-the-scenes info is kept in a .env file and is not accessible from the web.

The app uses the `MySQL2`, `Express`, `Express-Handlebars`, `Express-Session`, `dotenv`, and `Sequelize` Node.js packages.

### User Story

```md
AS A developer who writes about various things
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions

GIVEN a CMS-style blog site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post
WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```

## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)
5. [Questions](#questions)

## Installation

To start using Pressed Words, first clone [the repo](https://github.com/mjamesd/jubilant-robot) to your server. Then run `npm i` to install all the dependent packages.

Next, open `connection.js` in the `connection` folder. Change the MySQL user and password to your own MySQL server credentials (or your own JawsDB connection string). Next, look in the "sql" folder. In MySQL, run the SQL statements in `schema.sql`. Then seed the database by running the command `npm run seed`.

## Usage

Open a terminal, navigate to the directory containing the `server.js` file, then run `npm run start` to start the app.

## License

This work is licensed under GNU General Publice License v3.0.

## Questions

Visit [the app's GitHub repo](https://github.com/mjamesd/jubilant-robot).

To reach me with additional questions, email me at [mjamesd@gmail.com](mailto:mjamesd@gmail.com).