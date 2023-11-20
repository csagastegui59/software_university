# Clone the project 
~~~
$ git@github.com:csagastegui59/software_university.git
~~~

### Install dependencies  
~~~
$ npm install
~~~

### Configure .env file using your own credentials, also don't forget to create your database for local environment. You can find an example of the credentials needed on the .env.example file. In this file you can change the values to enable different behaviors on the application, like enable the log response time to do not log response time on the controller routes or viceversa.
![image](https://github.com/csagastegui59/software_university/assets/45051315/6812a338-0b87-4bb3-91f0-5ff09a44bb42)

### Run migrations
~~~
$ npx prisma migrate dev
~~~

### Run tests

~~~
$ npm run test
~~~

![image](https://github.com/csagastegui59/software_university/assets/45051315/92a30e6e-efd4-4f68-b6f0-82c5def2d3d4)

### If you are using Postman to test the app endpoints, we are using env variables, you can change it with your own credentials like this
![image](https://github.com/csagastegui59/software_university/assets/45051315/e28a3650-e603-477b-93a1-f5e4b94648bc)

### Testing endpoints using Postman
![image](https://github.com/csagastegui59/software_university/assets/45051315/7e4f64d4-7444-4c3d-a432-1c16bb692145)

![image](https://github.com/csagastegui59/software_university/assets/45051315/f9c4d1d8-9f4d-4405-94e3-c39239633791)

### In case you set the variables "LOG_RESPONSE_TIME=true" and "LOG_UNHANDLED_ERRORS=true" you will see a file called "errors.log" that will save all the errors returned and a file called "response-times.log" that will fill every time you make a call to an endpoint
![image](https://github.com/csagastegui59/software_university/assets/45051315/649d8c5d-4ce8-4b3c-a9ef-4c7f544773d2)

## Stay in touch

- Developer - [Christian Sagástegui](https://github.com/csagastegui59)
