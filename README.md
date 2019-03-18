# Mimesweeper

## Summary

Although it is just a simple game, my main effort is to make this project scalable and maintainable

#### about the django API server

- use AWS lambda to deploy back-end server
- use AWS S3 to serve static file
- use AWS RDS as dev database
- RESTful API design
- use JWT for auth
- write tests to ensure the API will work

#### about the React web app

- currently only use client-side rendering for this app
- use react-router as front-end router
- use redux and its middleware to manage state, side-effect 
- use scss
- use Heroku to serve the React app

## [ONLINE WEBSITE](https://zhexu-minesweeper.herokuapp.com/login)

it could take half a minute to open this website for first time, because the server could be sleeping
 
 https://zhexu-minesweeper.herokuapp.com/login
 
- [React app repo](https://github.com/SunnySunnyOMG/minesweeper-front-end)
- [Django app repo](https://github.com/SunnySunnyOMG/minesweeper-backend)
- API URL: https://dp914rbtw4.execute-api.ca-central-1.amazonaws.com/dev/api/

## More details

### Mimesweeper: Front-end part

- firstly I thought Mobx was more suitable than Redux for this app, but considering scalabilty, I chose Redux at last

- for a faster development, I use [rematch](https://github.com/rematch/rematch), a higher abstraction from react-redux/redux
- not all network exception/error was handled in this app, maybe I will fix this in future 

- [react-icons](https://github.com/react-icons/react-icons) was used 

- This website has 4 pages

##### 1 Login/Signup 
this page is only available for a guest
- a guest can login or sign up in this page
- you can skip this by click the *let's play* on the left of header
![565a3e7f.png](https://ucarecdn.com/001487f1-d86c-4118-9fa2-6f8cd2b91ad0/WX201903180403512x.png)

##### 2 New Game
this page is available to both user and guest

- the games created by a guest can only be found by/ recovered by the game page URL
- currently have 3 options to play, but this is totally customizable
![8efaf728.png](https://ucarecdn.com/c0f65265-dcc9-4b5e-9503-26330bad5afd/WX201903180406492x.png)

![e2deb338.png](https://ucarecdn.com/cadca26a-8513-4f77-ab7f-e42c47e6c0f8/WX201903180405542x.png)

##### 3 Game Page
this page is available to both user and guest

- use right mouse button to flag/unflag a block
- use left mouse button to reveal a block
![8d94c8b2.png](https://ucarecdn.com/e2b78c89-2c24-46fa-b133-92cd8d333c96/WX201903180408212x.png)


##### 4 History
this page is only available for a user

- you can view the basic info on the cards cover
- when click on it, page will nav to its **game page**
![b186f9a3.png](https://ucarecdn.com/be5db8ec-c923-4a3b-8ab9-5dd974bb973f/WX201903180409422x.png)

## Mimesweeper: Back-end part

- [Docker](https://www.docker.com/) is used to build a similar environment with AWS lambda, which can ensure minimum errors then deploy to remote
- db is postgesql

- basically there two models: User and Game, 
> ##### User
> - use the Django user model
> - use username & password for a simple auth
> - user-to-game is the one-to-many relationship
> 


> ##### Game

> - has a field named **snapshot** which is the game states and to feed the front end
> - has a field named **map_data** to save the real map info
> - a game can either belong to a user or not
> 

- [Django REST framework](https://www.django-rest-framework.org/) was used for RESTful API design
- One thing should be pointed out is that because of the function-based serverless structure, sharing user auth state amoung those 'function' could be a little tricky. I use JWT to bypass this problem. But in the real world, use a 3rd-party db to save token, like Redis, is also a good solution
- implement the JWT auth layer


## How to run code locally

if you need to run my code on your machine, here are the instructions

### React App
- fistly, `cd` to the project dir
- just run
```
npm install
```
- then
```
npm start
```

### Django App
  
#### WILL FINISH THIS SECTION WHEN HAVE TIME
(haven't tested on another PC)
as I metioned, the back-end part is developed under a docker env, thus, this part should take a little more effort~~

 - fistly, make sure [Docker Desktop](https://www.docker.com/products/docker-desktop) is installed and then `cd` to the `DockerFile` dir

```
cd your/path/to/dir/backend
```

- then create an image from the `DokcerFile`
```
docker build -t <your-image-name> .
```


- then run this command, which will run a contaner and destory it when exit
```
docker run -p 8000:8000 -ti -e -v "$(pwd):/var/task" -v --rm myzappa
```

- build the required virtual environment
```
python -m venv ve
```
- then install dependencies
```
source ve/bin/activate
(ve) > pip install -r requirements.txt
```
- run the dev server
```
(ve) > python manage.py runserver 0.0.0.0:8000
```

now you can visit this server on your `http://localhost:8000/api/`

## TODO

Have to say I underestimated the time the project would take. I just take a look for the requirements and then actually started dong this on Sunday.
The django part really took me a lot of time :( never used this framework before...

thus, in my plan, there are still somethings to do...


- add more comments for the code (these code was wrriten in a rush because I want to make it done tonight)
- write unit test for the React components
- there must be some code I should refactor in future

- allow user customize game(this can be easily implemented but still need some "css" work)
- use websokect for multiplayer senario
