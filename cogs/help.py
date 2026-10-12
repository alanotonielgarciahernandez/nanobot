# cogs/help.py
# Command to get command information and usage.

# Import typing for type hints.
from typing import Any, Iterable

# Import discord.py and discord.ext.commands.
import discord
from discord.ext import commands


class Help( commands.Cog ):
    def __init__( self, bot: commands.Bot ):
        self.bot = bot

    @commands.command( name='help', description='Get command information and usage.', usage='@Bot help [command]' )
    async def help( self, ctx: commands.Context[ commands.Bot ], *, command: str | None = None ):
        '''Get command information and usage.'''

        # Check if a command was provided, and if not, send a list of available commands.
        if not command:
            embed = build_command_list_embed( self.bot.commands )
            await ctx.send( embed=embed )
            return

        # Get the command object.
        cmd = self.bot.get_command( command )

        # If the command doesn't exist, send a message indicating that.
        if not cmd:
            await ctx.send( f'Command `{ command }` not found.' )
            return

        embed = build_command_help_embed( cmd )

        # Send the command information and usage.
        await ctx.send( embed=embed )


def build_command_list_embed( commands: Iterable[ commands.Command[ Any, Any, Any ] ] ) -> discord.Embed:
    # Create an embed for the command list.
    embed = discord.Embed(
        title='Available Commands',
        description=f'For command specific information, use `@Bot help [command]`:\n\n{"\n\n".join( f'**{ cmd.name }**: { cmd.description }' for cmd in commands ) }',
        color=discord.Color.yellow()
    )
    return embed


def build_command_help_embed( cmd: commands.Command[ Any, Any, Any ] ) -> discord.Embed:
    # Create an embed for the help command.
    embed = discord.Embed(
        title=f'{ cmd.name } Command',
        description=f'{ cmd.description }\n\n**Usage:** { cmd.usage }',
        color=discord.Color.yellow()
    )
    embed.set_footer( text=f'Alias: { cmd.aliases[ 0 ] if cmd.aliases else 'None' }' )
    return embed


# Define the setup function to add the cog to the bot.
async def setup( bot: commands.Bot ):
    await bot.add_cog( Help( bot ) )