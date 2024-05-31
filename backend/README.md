# Table of Contents

- [General info](#general-info)
- [Endpoints](#endpoints)
  - [Overview](#overview)
  - [User Authentication](#user-authentication)
    - [Sign up (register user)](#register-user)
    - [Sign in (login)](#login)
  - [Workouts](#workouts)
    - [Create Workout](#create-workout)
    - [Get Workouts by User](#get-workouts-by-user-id)
    - [Get Workout by Id](#get-workout-by-id)
    - [Delete Workout by Id](#delete-workout-by-id)
    - [Add Exercise to Workout](#add-exercise-to-workout)
    - [Remove Exercise from Workout](#remove-exercise-from-workout)
  - [Exercises](#exercises)
    - [Get Exercises](#get-exercises)
    - [Get Exercise Categories](#get-exercise-categories)
    - [Get Exercise by Id](#get-exercise-by-id)
    - [Add Exercise](#add-exercise)
    - [Update Exercise](#update-exercise)
    - [Delete Exercise](#delete-exercise)
  - [Cookies](#cookies)
    - [Get Cookies](#get-cookies)
    - [Logout](#delete-cookies)

# General info

This app provides a REST-API for managing user workouts and exercises.

# Endpoints

## Overview

This app uses the following endpoints and methods:

### User Authentication

[`POST /sign-up`](#register-user)

[`POST /sign-in`](#login)

### Workouts

[`POST /createworkout`](#create-workout)

[`GET /workouts/:userId`](#get-workouts-by-user-id)

[`GET /workout/:workoutId`](#get-workout-by-id)

[`DELETE /workout/:id`](#delete-workout-by-id)

[`POST /:workoutID/exercises`](#add-exercise-to-workout)

[`DELETE /:workoutId/exercises/:exerciseId`](#remove-exercise-from-workout)

### Exercises

[`GET /exercises`](#get-exercises)

[`GET /exercises/categories`](#get-exercise-categories)

[`GET /exercises/:id`](#get-exercise-by-id)

[`POST /`](#add-exercise)

[`PUT /:id`](#update-exercise)

[`DELETE /:id`](#delete-exercise)

### Cookies

[`GET /cookies`](#get-cookies)

[`DELETE /cookies`](#delete-cookies)

## Register user

### Request

`POST /sign-up`

Example POST body:

```
{
	"username": "User",
	"email": "user@email.com",
	"password": 123456789
}
```

### Response

After signing up, a toast briefly shows a success message, and the user is then redirected to the sign-in page.

```
{
  console.log('User signed up successfully');
}
```

## Login

### Request

`POST /sign-in`

Example POST body:

```
{
	"email": "user@email.com",
	"password": 123456789
}
```

### Response

If **email and password OK**, a toast shows a success message (User loggedin) then the user is redirected to his profile page.

---

> **Note**: The profile page is not dynamic at the moment, meaning there isn't a database table dedicated to its information. This is something to be implemented in the future.

---

```
console.log(
	{
		status: "success",
		message: "user Logged In",
	}
)
```

If **email not OK**, a toast shows an error message (Error trying to login).

```
console.log(
	{
   		message: "User not found",
	}
)
```

If **password NOT OK**, a toast shows an error message (Error trying to login).

```
console.log(
	{
		status: "Fail",
    	message: "wrong password",
	}
)
```

## Create Workout

### Request

`POST /createworkout`

Example body:

```
{
	"user_id": 10,
  	"title": "Morning Routine"
}
```

The app gets the user_id automatically from the cookies. Therefore, the **user only needs to provide the workout title** as requested in the form.

### Response

```
{
	workoutId: 1,
	title: "Morning routine",
	user_id: 10
}
```

## Get Workouts by User Id

### Request

`GET /workouts/10`

### Response

```
[
  {
    "id": 1,
    "title": "Morning Routine",
    "user_id": 10
  },
  {
    "id": 2,
    "title": "Evening Routine",
    "user_id": 10
  }
]
```

## Get Workout by Id

### Request

`GET /workout/1`

### Response

```
{
  "id": 1,
  "title": "Morning Routine",
  "user_id": 10
}
```

## Delete Workout by Id

### Request

`DELETE /workout/1`

### Response

```
{
  console.log('Workout deleted successfully');
}
```

## Add Exercise to Workout

### Request

`POST /:workoutID/exercises`

Example body:

```
{
  "exerciseID": 1
}
```

In order to add an exercise to a workout, the function requires the workout_id that goes as a parameter in the path and the exerciseID that goes in the body when the user clicks on the add button.

### Response

```
{
  console.log('Successfully added exercise to workout.');
}
```

## Remove Exercise from Workout

### Request

`DELETE /:workoutId/exercises/:exerciseId`

```
{
  console.log('Exercise removed from workout successfully');
}
```

## Get Exercises

### Request

`GET /exercises`

> #### Optional query parameters
>
> - difficulty
> - muscle
> - search
> - limit
> - offset

### Response

Depending on the provided queries, the response will be an array containing objects filtered by those queries.

Example: `GET /exercises?difficulty=beginner`

```
[
  {
    "id": 1,
    "name": "Push Up",
    "muscle": "chest",
    "difficulty": "beginner",
    "image": "/gifs/pushup.gif",
    "instructions": "Do a push up.",
	"created_at": "2024-05-25T19:59:21.000Z",
	"updated_at": "2024-05-25T20:03:25.000Z"
  },
  {
    "id": 2,
    "name": "Pull down",
    "muscle": "back",
    "difficulty": "beginner",
    "image": "/gifs/pull-down.gif",
    "instructions": "Do a pull down.",
	"created_at": "2024-05-25T19:59:21.000Z",
	"updated_at": "2024-05-25T20:03:25.000Z"
  },
  ...
]
```

## Get Exercise Categories

### Request

`GET /exercises/categories`

### Response

The response will be an array containing the muscle values for every exercise in the database. These values can consist of one or more muscles. On the frontend, this array will be transformed into a new array containing unique muscles.

```
[
	{
		"muscle": "biceps"
	},
	{
		"muscle": "triceps, shoulders"
	},
	{
		"muscle": "back"
	},
	{
		"muscle": "chest, triceps"
	},
	...

]
```

## Get Exercise by Id

### Request

`GET /exercises/:id`

### Response

```
{
  "id": 1,
  "name": "Push Up",
  "muscle": "chest",
  "difficulty": "beginner",
  "image": "/gifs/pushup.gif",
  "instructions": "Do a push up.",
  "created_at": "2024-05-25T19:59:21.000Z",
  "updated_at": "2024-05-25T20:03:25.000Z"
}
```

## Add Exercise

### Request

`POST /exercises`

There is no frontend feature associated with this endpoint, but it is functional. This endpoint was supposed to be restricted to the admin, but that condition has not been implemented yet.

Example body:

```
{
  "name": "Push Up",
  "muscle": "chest",
  "difficulty": "beginner",
  "image": "/gifs/pushup.jpg",
  "instructions": "Do a push up."
}
```

### Response

```
{
  console.log('Exercise added successfully');
}
```

## Update Exercise

### Request

`PUT /exercises/:id`

There is no frontend feature associated with this endpoint, but it is functional. This endpoint was supposed to be restricted to the admin, but that condition has not been implemented yet.

Example body:

```
{
  "name": "Push Up",
  "muscle": "chest, triceps, shoulders",
  "difficulty": "beginner",
  "image": "/updated-image-url.jpg",
  "instructions": "Do a push up."
}
```

### Response

```
{
  console.log('Exercise updated successfully');
}
```

## Delete Exercise

### Request

`DELETE /exercises/:id`

There is no frontend feature associated with this endpoint, but it is functional. This endpoint was supposed to be restricted to the admin, but that condition has not been implemented yet.

### Response

```
{
  console.log('Exercise deleted successfully');
}
```

## Get Cookies

### Request

`GET /cookies`

### Response

This endpoint is utilized to verify if the user is logged in and then display the user's workouts cards.

## Delete Cookies

### Request

`DELETE /cookies`

### Response

After logging out, the user is redirected to the homepage, and the sign-in/sign-up buttons reappear.
