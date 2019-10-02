# Hacktiv Overflow

Exercise project

All the endpoints API can be access from:
```jacascript
http://localhost:3000
```

* [User](#users)
  * [Sign Up](#sign-up)
  * [Sign In](#sign-in)
* [Question](#question)
  * [Create](#create)
  * [Find All](#find-all)
  * [Find One](#find-one)
  * [Find All](#edit-question)
* [Answer](#answer)
  * [Up Vote Answer](#up-vote-answer)
  * [Down Vote Answer](#down-vote-answer)
  * [Update Answer](#update-answer)
  * [Delete Answer](#delete-answer)
* [Another Error](#another-error)


## Users
+ ### Sign Up
  Method : `POST`<br>
  Endpoint : `/user/signup`

  #### _Request_ :
  * body:
    ```javascript
    {
      fullname: String(required),
      username: String(required),
      email: String(required),
      password: String(required)
    }
    ```

  #### _Response Body_ :
  - 201
    ```javascript
    {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6ImpvaG4gZG9lIiwidXNlcm5hbWUiOiJqb2huZG9lIiwiZW1haWwiOiJqb2huZG9lQG1haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwiaWF0IjoxNTY2MjA4NjIzfQ.Yr28Iu-8BP00vV_leZcFCde0-3DinwMK16Fz81NZtlk"
    }
    ```
  - 400
    ```javascript
    {
      "code": 400,
      "message": [
        "Must have fullname",
        "Email not valid",
      ]
    }
    ```

+ ### Sign In
  Method : `POST`<br>
  Endpoint : `/user/signin`

  #### _Request_ :
  * body:
    ```javascript
    {
      email: String(required),
      password: String(required),
    }
    ```

  #### _Response Body_ :
  - 201
    ```javascript
    {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6ImpvaG4gZG9lIiwidXNlcm5hbWUiOiJqb2huZG9lIiwiZW1haWwiOiJqb2huZG9lQG1haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwiaWF0IjoxNTY2MjA4NjIzfQ.Yr28Iu-8BP00vV_leZcFCde0-3DinwMK16Fz81NZtlk"
    }
    ```
  - 404
    ```javascript
    {
      code: 404,
      message: "Wrong username / password",
    }
    ```


+ ### Get id user
  Method : `GET`<br>
  Endpoint : `/user`

  #### _Request_ :
  * headers:
    ```javascript
    {
      token: String(required),
    }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    '5d63633daca4cf20829408f7'
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "invalid token"
    }
    ```



## Question
+ ### Create
  Method : `POST`<br>
  Endpoint : `/question`

  #### _Request_ :
  * headers:
    ```javascript
    { token: String(required) }
    ```
  * body:
    ```javascript
    {
      title: String(required),
      text: String(required),
    }
    ```

  #### _Response Body_ :
  - 201
    ```javascript
    { "message": "Created!" }
    ```
  - 404
    ```javascript
    {
      "code": 400,
      "message": [
        "Title required for question!",
        "Text required for question!"
      ]
    }
    ```
+ ### Find All
  Method : `GET`<br>
  Endpoint : `/question`

  #### _Request_ :
  * headers:
    ```javascript
    { token: String(required) }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    { "tags": ['javascript', 'php'],
      "data": [
        {
          "votes": {
            "up": [],
            "down": []
          },
          "comments": [],
          "answers": [],
          "_id": "5d636d1fa8e6fb2777131b04",
          "title": "q pertama cuy",
          "text": "gua nanya gimana caranya kalo begini?",
          "createdAt": "2019-08-26T05:24:47.276Z",
          "updatedAt": "2019-08-26T05:24:47.276Z"
        },
      ],
    }
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "jwt must be provided"
    }
    ```
+ ### Find One
  Method : `GET`<br>
  Endpoint : `/question/:id`

  #### _Request_ :
  * headers:
    ```javascript
    { token: String(required) }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    {
      "votes": {
        "up": [],
        "down": []
      },
      "comments": [],
      "answers": [],
      "_id": "5d636d1fa8e6fb2777131b04",
      "title": "q pertama cuy",
      "text": "gua nanya gimana caranya kalo begini?",
      "createdAt": "2019-08-26T05:24:47.276Z",
      "updatedAt": "2019-08-26T05:24:47.276Z"
    },
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "jwt must be provided"
    }
    ```
+ ### Update Question
  Method : `PUT`<br>
  Endpoint : `/question/:id`

  #### _Request_ :
  * headers:
    ```javascript
    { token: String(required) }
    ```
  * body:
    ```javascript
    { 
      title: String, 
      text: String, 
      tags: Array 
    }
    ```
  * params:
    ```javascript
    { id: String(required) }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    { message: 'Question updated!' }
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "jwt must be provided"
    }
    ```
+ ### Up Vote Question
  Method : `GET`<br>
  Endpoint : `/question/upvote/:id`

  #### _Request_ :
  * headers:
    ```javascript
    { token: String(required) }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    { message: 'Voted up!' }
    ```
  - 400
    ```javascript
    {
      "code": 400,
      "message": "VOTE_SELF"
    }
    ```
+ ### Down Vote Question
  Method : `GET`<br>
  Endpoint : `/question/downvote/:id`

  #### _Request_ :
  * headers:
    ```javascript
    { token: String(required) }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    { message: 'Voted down!' }
    ```
  - 400
    ```javascript
    {
      "code": 400,
      "message": "VOTE_SELF"
    }
    ```
+ ### Get All Tag Question
  Method : `GET`<br>
  Endpoint : `/question/tag/:id`

  #### _Request_ :
  * headers:
    ```javascript
    { token: String(required) }
    ```
  * params:
    ```javascript
    { id: String(required) }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    [
      {
        "comments": [],
        "answers": [],
        "tags": [
          "javascript",
          "python"
        ],
        "up_votes": [
          "5d63633daca4cf20829408f7",
          "5d639748bd2569399bfc1ce1"
        ],
        "down_votes": [],
        "_id": "5d63f4a0a801961c817cd438",
        "title": "question pertama",
        "text": "gua nanya gimana caranya kalo begini?",
        "createdAt": "2019-08-26T15:02:56.511Z",
        "updatedAt": "2019-08-29T07:48:09.637Z"
      },
    ]
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "invalid token"
    }
    ```
+ ### Delete Question
  Method : `DELETE`<br>
  Endpoint : `/question/:id`

  #### _Request_ :
  * headers:
    ```javascript
    { token: String(required) }
    ```
  * params:
    ```javascript
    { id: String(required) }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    { message: 'Question deleted!' }
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "invalid token"
    }
    ```

## Answer
+ ### Up Vote Answer
  Method : `POST`<br>
  Endpoint : `/answer/upvote/:id`

  #### _Request_ :
  * headers:
    ```javascript
    { token: String(required) }
    ```
  * params:
    ```javascript
    { id: String(required) }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    { message: 'Voted up!' }
    ```
  - 400
    ```javascript
    {
      "code": 400,
      "message": "VOTE_SELF"
    }
    ```
+ ### Down Vote Answer
  Method : `POST`<br>
  Endpoint : `/answer/downvote/:id`

  #### _Request_ :
  * headers:
    ```javascript
    { token: String(required) }
    ```
  * params:
    ```javascript
    { id: String(required) }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    { message: 'Voted down!' }
    ```
  - 400
    ```javascript
    {
      "code": 400,
      "message": "VOTE_SELF"
    }
    ```
+ ### Update Answer
  Method : `PUT`<br>
  Endpoint : `/answer/:id`

  #### _Request_ :
  * headers:
    ```javascript
    { "token": String(required) }
    ```
  * params:
    ```javascript
    { "id": String(required) }
    ```
  * body:
    ```javascript
    { "text": String(required) }
    ```


  #### _Response Body_ :
  - 200
    ```javascript
    { "message": 'Answer Updated!' }
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "invalid token"
    }
    ```
+ ### Delete Answer
  Method : `DELETE`<br>
  Endpoint : `/answer/:id`

  #### _Request_ :
  * headers:
    ```javascript
    { token: String(required) }
    ```
  * params:
    ```javascript
    { id: String(required) }
    ```

  #### _Response Body_ :
  - 200
    ```javascript
    { message: 'Answer Updated!' }
    ```
  - 401
    ```javascript
    {
      "code": 401,
      "message": "invalid token"
    }
    ```














## Another Error
  + Our mistake report this error
  ```javascript
  {
    code: 500,
    message: 'internal server error'
  }
  ```