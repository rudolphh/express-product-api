# Express Product API Project (214)
> API Fundamentals, authentication, encryption, and persistence 

### Installation
[Download here](https://github.com/rudolphh/express-product-api/archive/refs/heads/master.zip)
OR
```
git clone https://github.com/rudolphh/express-product-api.git
cd express-product-api
npm install
```
### Environment
Create a ***.env*** file in the root directory of the project with the following
```
PORT=3033
DB_PORT=3306
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=express_rudazon
TOKEN_EXPIRES_IN=30m
REFRESH_TOKEN_EXPIRES_IN=60m
SECRET_KEY=somekindofsecrettext
```
These can be adjusted to your preference, including ***DB_NAME***, the name of the database schema the seeder will use to automatically create some initial data for you in the database.

### MySQL Installation
Make sure to have **[MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/)** installed for your OS.
##### Docker MySQL
Use the link above for instructions, or if you have Docker use the **docker-compose.yml** file in the root folder.  
In the project root, just run the command:
```
docker-compose up -d
```
### Run
```
npm start
```
Verify the deployment by navigating to your server address [localhost:3033/hello] in your favorite browser

### Test routes
If you don't have [Postman](https://www.postman.com/downloads/), or [Insomnia](https://insomnia.rest/download), or don't care to use those, there is a ***test.rest*** file in the root directory.  
This uses the [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension within [VSCode](https://code.visualstudio.com/download) for simple API testing
![Image of test.rest](https://user-images.githubusercontent.com/949014/135563980-59a2d05f-2d5a-4b20-b94a-8fc4718861d1.png)


### Used within the Project

| Technology | Description |
| ------ | ------ |
| [node.js] | Evented I/O for the backend |
| [Express] | Fast node.js network app framework [@tjholowaychuk] |
| [jsonwebtoken] | An implementation of JSON Web Tokens |
| [bcrypt] | A library to help you hash passwords. |
| [mysql2] | MySQL client for Node.js with focus on performance |
| [dotenv] | Loads environment variables from .env file |

## Development

Want to contribute? Great!

## License

MIT

**Free Software, Heaven Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [jsonwebtoken]: <https://www.npmjs.com/package/jsonwebtoken>
   [bcrypt]: <https://www.npmjs.com/package/bcrypt>
   [mysql2]: <https://www.npmjs.com/package/mysql2>
   [dotenv]: <https://www.npmjs.com/package/dotenv>
   [localhost:3033/hello]: <http://localhost:3033/hello>

