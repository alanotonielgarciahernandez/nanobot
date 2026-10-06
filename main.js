'use strict'

// Third-party module.
import { Client, GatewayIntentBits, Collection } from 'discord.js';

// Local modules.
import { setCommands } from './commands/commands.js';
import { loadConfig } from './utils/config.js';

// Create Client.
const client = new Client(
  {
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ],
    partials: [ "CHANNEL" ],
  }
);

client.commands = new Collection();

// Load the configuration file.
const config = await loadConfig();

// Check if messages contains the prefix.
client.on( 'messageCreate',
  async msg =>
  {
    if ( !msg.content.toLowerCase().startsWith( config.botPrefix ) ) return;
    
    const givenCommand = msg.content.split( ' ', 3 );
    const command = client.commands.get( givenCommand[ 1 ] );
    
    if ( !command )
    {
      msg.channel.send( `Command not found: ${ givenCommand[ 1 ] }.` );
      return;
    }
    
    try
    {
      await command.default.execute( client, msg, givenCommand[ 2 ] );
    }
    catch ( error )
    {
      console.error( error );
    }
  }
);

// Log bot in.
client.on( 'ready',
  async _ =>
  {
    // Logged In Message.
    console.log( `[Main]: Logged in as ${ client.user.tag }` );
    
    // Set Bot Activity.
    client.user.setActivity( 'Hello World!' );

    // Load Commands.
    await setCommands( client );
  }
);

client.login( config.botToken );
