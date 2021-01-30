# VerySocial API

A REST API for a social media clone. Provides various endpoints for creating an account, signing in, creating and liking a post, adding a comment to a post, etc. Built with NodeJS, Express, and MongoDB.

**URL**: https://api.verysocial.loganskidmore.dev

## Open Endpoints

**Register : `POST /register`**
Data Example:

```json
{
  "username": "myusername123",
  "password": "hunter2"
}
```

Response:

```json
{
  "message": "You've been logged in!"
}
```

---

**Login : `POST /login`**
Data Example:

```json
{
  "username": "myusername123",
  "password": "hunter2"
}
```

Response:

```json
{
  "message": "You've been logged in!"
}
```

---

**Sign-out of account : `GET /logout`**
Response:

```json
{
  "message": "Logged out"
}
```

## Closed Endpoints

**Create a new post : `POST /posts/new`**

```json
{
  "username": "myusername123",
  "password": "hunter2"
}
```

---

**Returns all posts for accounts that the user follows: `GET /posts`**
Response:

```json
{
  "posts": [
    {
      "_id": "60026904b3cb8413c4826002",
      "comments": [
        {
          "_id": "6003a15eee1f8501b4d6c006",
          "content": "My first comment <3",
          "author": "60024e90bc22b983243a4003",
          "__v": 0
        }
      ],
      "likes": ["60024e90bc22b983243a4003"],
      "title": "This is the title of the post",
      "summary": "this is the post summary",
      "author": {
        "_id": "60024e90bc22b983243a4003",
        "posts": ["60026904b3cb8413c4826002"],
        "followers": [],
        "following": [],
        "username": "TheFirstUser",
        "updatedAt": "2021-01-16T04:18:12.975Z",
        "createdAt": "2021-01-16T02:25:20.642Z",
        "__v": 1
      },
      "numLikes": 0,
      "createdAt": "2021-01-17T04:10:38.080Z",
      "__v": 6
    }
  ]
}
```

---

**Returns a post with a given ID : `GET /posts/:id`**
Response:

```json
{
  "posts": [
    {
      "_id": "60026904b3cb8413c4826002",
      "comments": [
        {
          "_id": "6003a15eee1f8501b4d6c006",
          "content": "My first comment <3",
          "author": "60024e90bc22b983243a4003",
          "__v": 0
        }
      ],
      "likes": ["60024e90bc22b983243a4003"],
      "title": "This is the title of the post",
      "summary": "this is the post summary",
      "author": {
        "_id": "60024e90bc22b983243a4003",
        "posts": ["60026904b3cb8413c4826002"],
        "followers": [],
        "following": [],
        "username": "TheFirstUser",
        "updatedAt": "2021-01-16T04:18:12.975Z",
        "createdAt": "2021-01-16T02:25:20.642Z",
        "__v": 1
      },
      "numLikes": 0,
      "createdAt": "2021-01-17T04:10:38.080Z",
      "__v": 6
    }
  ]
}
```

---

**Add or remove a "like" from a post with a given ID : `PUT /posts/:id/like`**
Response:

```
ADDED (or removed) a like from [post id]
```

---

**Add a comment to a post with a given ID : `POST /posts/:id/comments`**
Data Example:

```json
{
  "content": "My first comment!"
}
```

---

**Get all comments from a post with a given ID : `GET /posts/:id/comments`**
Response:

```json
{
  "comments": [
    {
      "_id": "6003a15eee1f8501b4d6c006",
      "content": "My first comment <3",
      "author": "60024e90bc22b983243a4003",
      "__v": 0
    }
  ]
}
```

---

### Todo List:

[✅] SSL Cert  
[✅] Allow users to "follow" specific accounts  
[✅] An endpoint that shows posts from only the accounts that the user follows  
[ ] Allow a post to be edited or deleted  
[ ] Allow a comment to be edited or deleted  
[ ] Add email address requirement  
[ ] Email verification
