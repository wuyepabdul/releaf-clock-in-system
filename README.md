# Releaf Clockin System

This application will be used to track when a staff clock in & out of the office. It is developed using the frontend and backend pattern. It requires a staff to login into the system to be able to clockin/clockout once day, view his/profile, update his/her profile, view list of all staff and logout
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV = development`

`PORT`

`MONGODB_URI`

`JWT_SECRET`

## Run Locally

Clone the project

```bash
  git clone https://github.com/wuyepabdul/releaf-clock-in-system
```

Go to the project directory

```bash
  cd releaf-clock-in-system
```

Install dependencies

```bash
  npm install
```

Go to the frontend directory inside releaf-clock-in-system directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Go to the root directory, that is, releaf-clock-in-system
Start the application

```bash
  npm run dev
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/wuyepabdul/releaf-clock-in-system
```

Go to the project directory

```bash
  cd releaf-clock-in-system
```

Install server-side dependencies 

```bash
  npm install
```

Go to the frontend directory inside releaf-clock-in-system directory

```bash
  cd frontend
```

Install client-side dependencies

```bash
  npm install
```

Go to root directory (releaf-clock-in-system)
Start backend server

```bash
  cd releaf-clock-in-system
  npm start
```

Go to frontend directory (releaf-clock-in-system)
Start client-server

```bash
  cd releaf-clock-in-system/frontend
  npm start
```

Go to the root directory, that is, releaf-clock-in-system
Start the application (run both backend and frontend servers together)

```bash
  cd releaf-clock-in-system
  npm run dev
```

## Tech Stack

**Client:** React, Redux, Bootstrap, Material-ui

**Server:** Node, Express, Mongoose, MongoDB

  
## Features

- Create a staff
- Login a staff
- Clockin a staff
- Clockout a staff
- View staff profile
- Update a staff
- View list of all staff
- Logout
## Authors

- [wuyepabdul](https://github.com/wuyepabdul/)

  
## Acknowledgements

 - [Readme so](https://readme.so)
 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

  ## API Reference

#### Get all staff

```http
  GET /api/staff/list
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `token`   | `string` | **Required**. Staff token when loggedIn |

#### Get staff profile

```http
  GET /api/staff/profile
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `token`   | `string` | **Required**. Staff token when logged In |

#### Create a Staff

```http
  POST /api/auth/register
```

| Parameter                        | Type     | Description                               |
| :------------------------------- | :------- | :---------------------------------------- |
| `name,email,password,department` | `string` | **Required**. Staff info to create record |

#### Login a Staff

```http
  POST /api/auth/login
```

| Parameter        | Type     | Description                                       |
| :--------------- | :------- | :------------------------------------------------ |
| `email,password` | `string` | **Required**. Staff info to login into the system |

#### Update staff profile

```http
  PUT /api/staff/profile
```

| Parameter    | Type     | Description                                             |
| :----------- | :------- | :------------------------------------------------------ |
| `token,name` | `string` | **Required**. staff login token and new name to updated |

#### Clockin a Staff

```http
  PUT /api/staff/clockin
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `staffId` | `string` | **Required**. staffId used to clockin |

#### Clockout a Staff

```http
  PUT /api/staff/clockout
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `staffId` | `string` | **Required**. staffId used to clockout |

#### generateRandomNumber(initials)

Takes staff name and generates a staffID which is used to clockin/clockout.

#### generateToken(id)

Takes staff (mongodb id) to create a jwt token

#### protect

middleware to check if staff is logged in

#### updateProfileValidator, signinValidator, registerValidator

middlewares to validate form data
## Demo

Visit the below link and experience the functionalities firsthand

https://relief-clockin-system.herokuapp.com/
  
## Running Tests

To run tests, run the following command

```bash
  cd releaf-clock-in-system
  npm run test
```

  