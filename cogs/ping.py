# cogs/ping.py
# Command to check bot latency.

# Import discord.py and discord.ext.commands.
from discord.ext import commands


class Ping( commands.Cog ):
    def __init__( self, bot: commands.Bot ):
        self.bot = bot

    @commands.command( name='ping' )
    async def ping( self, ctx: commands.Context[ commands.Bot ] ):
        '''Check bot latency.'''

        # Calculate the latency in milliseconds.
        latency = round( self.bot.latency * 1000 )

        # Send the latency as a message.
        await ctx.send( f'Pong! `{ latency }ms`' )


# Define the setup function to add the cog to the bot.
async def setup( bot: commands.Bot ):
    await bot.add_cog( Ping( bot ) )