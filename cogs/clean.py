# cogs/clean.py
# Command to clean up messages in a channel.
# Default amount is 10, max is 100. Requires manage_messages permission.

# Import discord.py and discord.ext.commands.
import discord
from discord.ext import commands


class Clean( commands.Cog ):
    def __init__( self, bot: commands.Bot ):
        self.bot = bot

    @commands.command( name='clean', aliases=[ 'clear', 'purge' ] )
    @commands.has_permissions( manage_messages=True )
    @commands.bot_has_permissions( manage_messages=True )
    async def clean( self, ctx: commands.Context[ commands.Bot ], amount: int = 10 ):
        '''
        Delete recent messages in the channel.
        Usage: !clean [amount]  (default 10, max 100)
        '''

        # Check if the amount is valid, and if not, send a message prompting the user to provide a valid amount.
        if amount < 1:
            await ctx.send( 'Amount must be at least 1.' )
            return
        if amount > 100:
            amount = 100

        # Check if the command is used in a text channel, and if not, send a message prompting the user to use the command in a text channel.
        if not isinstance( ctx.channel, discord.TextChannel ):
            await ctx.send( 'This command can only be used in a text channel.' )
            return

        # Purge the specified amount of messages in the channel, including the command message itself.
        deleted = await ctx.channel.purge( limit=amount + 1 )
        
        # Send a temporary confirmation that auto-deletes
        await ctx.send( f'Deleted { len( deleted ) - 1 } messages.', delete_after=5 )


# Define the setup function to add the cog to the bot.
async def setup( bot: commands.Bot ):
    await bot.add_cog( Clean( bot ) )
