<!-- markdownlint-disable heading-start-left first-line-h1 -->
<!-- markdownlint-capture -->
<!-- markdownlint-disable no-inline-html heading-increment -->

<div align='center'>

# Nanobot

Simple Discord bot, now powered by Python + discord.py

</div>

## Information

Started in September 4th, 2023, Nanobot is a Discord bot that started development with my interest in making a Discord bot after I learned how to code in JavaScript and Node.js.

This repository was created in October 2026 with a migration to **Python + discord.py**.

## Requirements

- Python 3.14+
- A Discord bot token
- **Message Content Intent** enabled

Install dependencies:

```sh
pip install -r requirements.txt
```

## Environment Variables

Copy the example file and fill in your values:

```sh
cp .env.example .env
```

Required variables:

| Variable         | Description                  |
|------------------|------------------------------|
| `DISCORD_TOKEN`  | Your Discord bot token       |

## How to run

```sh
python bot.py
```

Make sure **Message Content Intent** is enabled in the [ Discord Developer Portal ]( https://discord.com/developers/applications ), this allows the bot to read [ messages content data ]( https://support-dev.discord.com/hc/en-us/articles/6207308062871-What-are-Privileged-Intents ).

## Commands

| Command               | Description                                                                   |
|-----------------------|-------------------------------------------------------------------------------|
| `@Bot help [command]` | Get command information and usage.                                            |
| `@Bot ping`           | Check if the bot is online. Replies with latency in ms.                       |
| `@Bot 8ball <q>`      | Magic 8-ball style answers to a question.                                     |
| `@Bot clean [n]`      | Delete the last `n` messages (default 10, max 100). Requires Manage Messages. |

Aliases: `@Bot eightball`, `@Bot clear`, `@Bot purge`.

## Technologies

- **Language:** Python
- **Discord library:** [ discord.py ]( https://discordpy.readthedocs.io )
- **Config:** python-dotenv
