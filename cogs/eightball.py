# cogs/eightball.py
# Command to ask the magic 8-ball a question.

# Import discord.py and discord.ext.commands.
from discord.ext import commands
import random

RESPONSES = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes – definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don\'t count on it.',
    'My answer is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.',
]


class EightBall( commands.Cog ):
    def __init__( self, bot: commands.Bot ):
        self.bot = bot

    @commands.command( name='8ball', aliases=[ 'eightball' ] )
    async def eight_ball( self, ctx: commands.Context[ commands.Bot ], *, question: str | None = None ):
        '''Ask the magic 8-ball a question.'''

        # Check if a question was provided, and if not, send a message prompting the user to ask a question.
        if not question:
            await ctx.send( 'You need to ask a question! Example: `@Bot 8ball Will it rain?`' )
            return

        # Randomly select a response from the list of responses.
        answer = random.choice( RESPONSES )

        # Send the question and answer as a message.
        await ctx.send( f"**Question:** { question }\n**Answer:** { answer }" )


# Define the setup function to add the cog to the bot.
async def setup( bot: commands.Bot ):
    await bot.add_cog( EightBall( bot ) )