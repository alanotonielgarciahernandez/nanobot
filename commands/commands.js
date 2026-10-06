'use strict'

// Node modules.
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import fs from 'node:fs';

// Get command files path.
const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );
const commandsPath = join( __dirname );

// Command files list.
const commandFiles = fs.readdirSync( commandsPath ).filter( file => file.endsWith( 'Command.js' ) );

export const setCommands = async ( client ) =>
{
  for ( const file of commandFiles )
  {
    const filePath = join( commandsPath, file );
    const command = await import( 'file://' + filePath );

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ( 'name' in command.default && 'execute' in command.default ) {
      client.commands.set( command.default.name, command );
    } else {
      console.log( `[ Warning ]: The command at ${ filePath } is missing a required "name" or "execute" property.` );
    }
  }
}
