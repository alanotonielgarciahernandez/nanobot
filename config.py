# config.py
# Load environment variables from .env file using python-dotenv.

# Import os and dotenv.
import os
from dotenv import load_dotenv

# Load environment variables from .env file.
load_dotenv()

# Get the Discord bot token from environment variables, defaulting to an empty string if not set.
TOKEN: str = os.getenv( 'DISCORD_TOKEN', '' )

# Validate that the TOKEN is not empty, raising a ValueError if it is.
if TOKEN == '':
    raise ValueError( 'DISCORD_TOKEN is missing from .env' )