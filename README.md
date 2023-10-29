# PWDMan

## About

The goal of this project is to be a secure, FOSS password manager that can be run either locally with the help of docker, or on a server so that all the information will always be available.

### depenencies

This project is 100% pure typescript, which means we also need a Javascript runtime, and for this project NodeJS was selected. Checkout `package.json` for a full list of dependecies.

### How to run

to run this project, there are 2 scripts on the `package.json` that we can make use of as of this moment:

```bash
npm run start   #Runs the project as production
# Or.. 
npm run dev     #Runs the project as development, spinning up concurrency to keep watch of typescript changes, and compiled changes with TSC and Nodemon
```
