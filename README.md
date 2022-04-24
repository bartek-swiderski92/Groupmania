# **Groupmania**

## **A Full-Stack project, internal social media app**

![image](https://github.com/bartek-swiderski92/Groupmania/blob/master/frontend/src/media/icon-left-font-monochrome-bg.png?raw=true)  

<br> 

An internal social media app, allowing employees of Groupmania to create, comment and like posts. The app features CRUD methods for all of the content and the user profile. Securely stores data and user credentials in a SQL Database


### The project reviews following skills:
* Building a full-stack solution
* Storing data securely using SQL
* Enabling users to interact with a database using CRUD operations
* Managing a user session

### Technologies used:
* ReactJS
* HTML
* CSS
* Node.js
* Express
* SQL
* Sequelize ORM
* OWASP

### The project is based on below scenario:
>From: Stephanie J 
>To: Me  
>Subject: Groupomania app details
>___
>Hello,
>
>Glad to have you on this exciting new project! 
>
>I was able to get Groupomania’s HR manager to agree to have a Groupomania employee test a minimal version of the tool with only one of the two apps. The benefit on their end is that this will promote the adoption of the tool internally. The benefit on our end is that this will ensure we’re on track with their expectations before we jump into developing the second app. So you’ll need to deliver an initial functional version of just one of the two apps they’ve envisioned. Feel free to choose whichever of the two interests you more, but let me know your decision asap.
>
>Attached you’ll find Groupomania’s user requirements specifications detailing the minimum features expected for each app. They’ve also provided a file with the company's logos. 
>
>Please note that Groupomania expects the application to meet high standards of security and accessibility. The only other constraint to be aware of is that they currently use SQL for their data store. As for the front-end, feel free to use whichever framework you’re most comfortable with but you need to use one, and your code needs to be JavaScript (so React, Vue, Angular...).
>
>Since the project parameters seem to be in flux, I think taking an agile approach would be the best suited, allowing us to react efficiently to any feedback we get from the client during the project lifecycle. I recommend using a kanban tool like Trello to plan and estimate the time you’ll need for each of your tasks and track the project’s progress. Once you have a functional version of an app ready, I’d like to briefly discuss how you managed your tasks so that I can start getting a sense of your workflow.  
>
>If you have any questions, don’t hesitate to reach out!
>
>Stephanie J
>Director
>CONNECT-E
>
>Attachments:
>
>    [User Requirement Specifications](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Digital+Project+Manager/Group+Project/New+Version+-+Expression+of+Needs/Groupomania_Expression_Needs.pdf)
>    [Company Logos](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Digital+Project+Manager/Group+Project/Groupomania_Logos.zip)
> <br>
> <br>


### How to run:
1. Clone [the repository](https://github.com/bartek-swiderski92/Groupmania.git)
2. Run npm install within the front-end directory
   ```
   npm install
   ```
3. Run npm start
   ```
   npm start
   ```
4. Run npm install within the back-end directory
   ```
   npm start
   ```
5. Make sure you have installed a local Database Managment System (DBMS) of your choice (e.g. MySQL, PostgreSQL, or MariaDB)
6. Go to
```
backend\config\config.json
```
7. Input your username and password in config.json matching your local DBMS credentials
8. Check host, port and dialect used, replace if needed with local settings. For Dialect choose one of the following: 
"mysql" for MySQL, "mariadb" for MariaDB, "sqlite" for SQLite, "postgres" for PostgreSQL and Redshift, "mssql" for MSSQL, "snowflake" for Snowflake.
Config described in details in [Sequelize documentation.](https://sequelize.org/docs/v6/other-topics/migrations/#configuration)
9. Run nodemon server
   ```
   nodemon server
   ```
10. Open http://localhost:3000 in browser, and create a new account using fake credentials.
11. Start exploring the app
