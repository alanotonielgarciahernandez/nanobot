<!-- markdownlint-disable heading-start-left first-line-h1 -->
<!-- markdownlint-capture -->
<!-- markdownlint-disable no-inline-html heading-increment -->

<div align='center'>

  # Nanobot
</div>

# Information
Started in September 4th, 2023, Nanobot is a simple Discord bot that started development with my interest in making a Discord bot after I learned how to code in JavaScript and Node.js.

After creating the first version of the bot, there was a time when I had to lend my phone to my siblings, so I came up with the idea that they would have to interact with the bot in order to use my phone—by completing a simple task, which would just be answering a question, perhaps one of those about local jokes. That's how the phone command started.

At one point, my sister was eagerly awaiting the release of a new Billie Eilish album, so I created a countdown that sent her a daily message with the number of days remaining and a random related GIF. I was waiting for Persona 3 Reload myself, so I added a second countdown for its release—and sent her those messages too, just to tease her a little.

After my siblings got their phones, the phone commands were not longer used, and neither was Nanobot.

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
This Discord bot can respond to commands and run scheduled events.

## Ping command
Used to check whether the bot is listening to the server channels. It answers
with "Pong!" and the response time in milliseconds.

## 8ball command
Returns a random "Yes" or "No" answer.

## Clear command
Clears a given number of messages from the channel. The default is 10 messages,
with a maximum of 100.

## Phone command
Requests access to the phone by assigning a task to the user. Completing the
task enables phone access until the next day.

## Verify task command
Allows the configured administrator to manually verify a user's phone task.

## Phone debug command
Requests a phone task without the regular date and availability checks. This
command is intended for debugging.

## Test command
Provides a test command for development purposes.

## Scheduled events
The bot automatically loads and starts scheduled events that:

- Send a daily Persona game GIF.
- Send daily countdown GIFs for the Persona 3 Reload soundtrack, the Coraline
  remaster, and the Billie Eilish album.

# Technologies
- Programming Language: JavaScript
- Runtime Environment: [ NodeJS ]( https://github.com/nodejs/node )
- Package Manager: [ Yarn ]( https://github.com/yarnpkg/berry )
- Changes Monitor: [ Nodemon ]( https://nodemon.io/ )
- Discord API Library: [ discord.js ]( https://discord.js.org/ )
