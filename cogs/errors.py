# cogs/errors.py
# Global command error handler.

# IMport cast from typing for type hinting.
from typing import cast

# Import discord.ext.commands.
from discord.ext import commands


class Errors( commands.Cog ):
    def __init__( self, bot: commands.Bot ):
        self.bot = bot

    @commands.Cog.listener()
    async def on_command_error( self, ctx: commands.Context[ commands.Bot ], error: commands.CommandError ):
        # Ignore errors that were already handled locally.
        if hasattr( ctx.command, 'on_error' ):
            return

        # Unwrap CommandInvokeError so we see the real exception.
        if isinstance( error, commands.CommandInvokeError ):
            error = cast( commands.CommandError, error.original )

        # --- Send a message for common cases ---

        if isinstance( error, commands.CommandNotFound ):
            # Silently ignore unknown commands
            # await ctx.send( 'Unknown command.' )
            return

        if isinstance( error, commands.MissingRequiredArgument ):
            await ctx.send( f'Missing argument: `{ error.param.name }`.' )
            return

        if isinstance( error, commands.BadArgument ):
            await ctx.send( 'Invalid argument. Please check the command usage.' )
            return

        if isinstance( error, commands.MissingPermissions ):
            missing = ", ".join( error.missing_permissions )
            await ctx.send( f'You need the following permission(s): `{ missing }`.' )
            return

        if isinstance( error, commands.BotMissingPermissions ):
            missing = ", ".join( error.missing_permissions )
            await ctx.send( f'I need the following permission(s): `{ missing }`.' )
            return

        if isinstance( error, commands.NoPrivateMessage ):
            await ctx.send( 'This command cannot be used in DMs.' )
            return

        if isinstance( error, commands.CheckFailure ):
            await ctx.send( 'You cannot use this command.' )
            return

        # Fallback for unexpected errors.
        await ctx.send( 'Something went wrong while running that command.' )

        # Still log the full error so you can see it in the console.
        raise error


async def setup( bot: commands.Bot ):
    await bot.add_cog( Errors( bot ) )