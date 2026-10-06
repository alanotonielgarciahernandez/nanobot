'use strict'

const path = require( 'node:path' );
const fs = require( 'node:fs' );
const { Collection } = require( 'discord.js' );

const commandsPath = path.join( __dirname );
const commandFiles = fs.readdirSync( commandsPath ).filter( file => file.endsWith( 'command.js' ) );

function setCommands( client ){
    client.commands = new Collection();

    for ( const file of commandFiles ) {
        const filePath = path.join( commandsPath, file );
        const command = require( filePath );
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ( 'name' in command && 'execute' in command ) {
            client.commands.set( command.name, command );
        } else {
            console.log( `[Warning]: The command at ${ filePath } is missing a required "name" or "execute" property.` );
        }
    }
}

module.exports = { setCommands };
