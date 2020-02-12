# Back-End-Boilerplate---NodeJS-Express-Knex-PG

## Table of Contents

- **[Overview](#overview)**<br>
- **[API Endpoints](#api-endpoints)**<br>
- **[Credits](#credits)**<br>

## <a name='overview'></a>Overview
This database allows users to register, login, and add all other details here...

## API Endpoints

### Authentication
Method | Endpoint | Body (required) | Body (optional) | Notes
| ----- | ----------------- | -------------------- | --------------------- | ------------------ |
POST | /auth/register | username, password | name, email, avatarUrl | Creates a new user object in the database. |
POST | /auth/login |  username, password | N/A | Returns username, JSON Web Token, and the user object. |


## Credits

