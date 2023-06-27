# Real-Time Chat App

## How to run?

- Clone the respoistory
- Create .env file in **backend** folder
- Create environment.ts file in **frontnen**folder
- Set appropriate env variables using examplery env files

- If you have docker installed, from the **root** folder,run:
```
    docker-compouse-up
```
And go visit [localhost:4200](localhost:4200), the application will be running

- If you don't have Docker installed, you have to run projects separately:
- Go to **backend** folder, and run this command:
```
ts-node index.ts
```
- Now, go to **frontend** folder, and run this command:
```
ng-serve
```

And go visit [localhost:4200](localhost:4200), the application will be running