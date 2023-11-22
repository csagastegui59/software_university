# Clone the project 
~~~
$ git@github.com:csagastegui59/software_university.git
~~~

### Install dependencies  
~~~
$ npm install
~~~

### Configure .env file using your own credentials

Don't forget to create your database for local environment. You can find an example of the credentials needed on the .env.example file. In this file you can change the values to enable different behaviors on the application, like enable the log response time to do not log response time on the controller routes or viceversa.
![image](https://github.com/csagastegui59/software_university/assets/45051315/a50f52eb-dcd0-497f-b581-899928b0b03c)

### Run migrations
~~~
$ npx prisma migrate dev
~~~

### Run tests

~~~
$ npm run test
~~~

![image](https://github.com/csagastegui59/software_university/assets/45051315/32826d79-608c-4912-96f3-74c7711028b2)

### If you are using Postman to test the app endpoints

We are using env variables, you can change it with your own credentials like this
![image](https://github.com/csagastegui59/software_university/assets/45051315/fc9428e8-3523-4fe0-adb7-9b34c68b3873)

### Testing endpoints using Postman

![image](https://github.com/csagastegui59/software_university/assets/45051315/70984c98-ca6e-41ae-ac4b-b04e16c5587d)

![image](https://github.com/csagastegui59/software_university/assets/45051315/b5cc2ee8-607b-407c-9f75-96fc7b32b599)

### "LOG_RESPONSE_TIME=true" and "LOG_UNHANDLED_ERRORS=true" 

In case you set the variables to true you will see a file called "errors.log" that will save all the errors returned and a file called "response-times.log" that will fill every time you make a call to an endpoint

![image](https://github.com/csagastegui59/software_university/assets/45051315/364952a2-ca96-4691-8b7e-cd759044b631)

## Stay in touch

- Developer - [Christian Sagástegui](https://github.com/csagastegui59)
