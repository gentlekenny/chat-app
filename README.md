# Real-Time Chat App

Application is up and running [here.](https://chatapp-frontend-9ec9c03ceef6.herokuapp.com)

## Application structure

Application project consists of two folders : **frontend** and **backend**. As their names suggest, they present visual aspects for the application and logic, respectively. Each of those projects are independent, on their own. That means that, if you change environment variables on the frontend to a diffrent server host, frontend is still going to work.  I really like this folder structure because one project is split to it's pieces, and yet still together on one git repository.

### Technologies used:
Node.js, Express.js, Socket.IO , Redis , JWT, Heroku and Angular.


## How to run?


### Default method:

- Clone the respoistory

#### Set up backend

- Navigate to backend folder via terminal
- Create .env file in **backend** folder
- Set appropriate env variables using examplery env file
- Run 
```
npm install
```
- After that run
```
ts-node index.ts
```
- Your server should be running now

#### Set up frontend

- Navigate to frontend folder via terminal
- Run 
```
npm install
```
**Optional:** Run 
```
ng build
```
- Run
```
ng serve 
```
- Visit [localhost:4200](http://localhost:4200). Your application is running

### Docker method 
- Clone the repository
- Position in ***chat-app*** folder, and run
```
    docker-compouse-up
```


## Credits
Kenan Omić
