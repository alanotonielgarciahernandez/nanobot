<!-- markdownlint-disable heading-start-left first-line-h1 -->
<!-- markdownlint-capture -->
<!-- markdownlint-disable no-inline-html heading-increment -->

<div align='center'>

  # Nanobot
</div>

# Information
Started in September 4th, 2023, Nanobot is a simple Discord bot that started development with my interest in making a Discord bot after I learned how to code in JavaScript and Node.js.

This repository is being created in October 2026 with plans to improve Nanobot with new functionalities.

# How to use

## Requirements
[ NodeJS ]( https://nodejs.org/ ) and [ Yarn ]( https://yarnpkg.com/ ) are required to start working in this project.  
Install all Node modules by opening a shell and running the following command inside the project folder:
```sh
yarn install
```

## Bot token
Set yout Discord bot token into botToken filed on config.json file.

## Build the project
Open a shell and run the command below to build the production version of the project.
```sh
yarn build
```

# Functions
This Discord bot can answer to specific commands.

## Ping command.
Used to check if bot is listening to the server channels.
Answers with "Pong!" and the time between the user's message and the bot's response in miliseconds.

## 8ball command.
Answers any message randomly with 'Yes' or 'No'.

## Clear command.
Clears the given number of messages in history, default value is 10 and supports a maximum of 100.

# Technologies
- Programming Language: JavaScript
- Runtime Environment: [ NodeJS ]( https://github.com/nodejs/node )
- Package Manager: [ Yarn ]( https://github.com/yarnpkg/berry )
- Changes Monitor: [ Nodemon ]( https://nodemon.io/ )
- Discord API Library: [ discord.js ]( https://discord.js.org/ )
