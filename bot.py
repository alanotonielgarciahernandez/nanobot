# bot.py
# Entry point for the bot. This file is responsible for starting the bot and loading cogs.

# Import discord.py and discord.ext.commands.
import discord
from discord.ext import commands

# Import config.py for the bot token and prefix.
import config

# Import asyncio for running the bot.
import asyncio

# Import logging for logging bot events.
import logging

# Set up logging for the bot.
logging.basicConfig( level=logging.INFO )
logger = logging.getLogger( 'nanobot' )

# Define the command prefix function to determine the bot's command prefix.
def command_prefix( _bot: commands.Bot, message: discord.Message ) -> str:
    prefix = config.PREFIX
    remainder = message.content[ len( prefix ): ]

    if message.content.startswith( prefix ) and ( remainder == '' or remainder[ 0 ].isspace() ):
        return prefix

    return '\0'


# Set up the bot intents.
intents = discord.Intents.default()
intents.message_content = True  # needed for prefix commands

# Set up the bot with the command prefix and intents.
bot = commands.Bot(
    command_prefix=command_prefix,
    strip_after_prefix=True,
    intents=intents,
)


# Define the on_ready event to log when the bot is ready.
@bot.event
async def on_ready():
    assert bot.user is not None
    logger.info( f'Logged in as { bot.user } (ID: { bot.user.id })' )
    logger.info( '------' )


# Define the load_cogs function to load all cogs.
async def load_cogs():
    await bot.load_extension( 'cogs.ping' )
    await bot.load_extension( 'cogs.clean' )
    await bot.load_extension( 'cogs.eightball' )


# Define the main function to start the bot.
async def main():
    async with bot:
        await load_cogs()
        await bot.start( config.TOKEN )


# Run the main function if this file is run directly.
if __name__ == '__main__':
    asyncio.run( main() )
