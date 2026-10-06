'use strict'

const path = require( 'node:path' );
const fs = require( 'node:fs' );
const { Collection } = require( 'discord.js' );

var events = new Collection();
const eventsPath = path.join( __dirname );
const eventFiles = fs.readdirSync( eventsPath ).filter( file => file.endsWith( 'event.js' ) );

function setEvents()
{
    for ( const file of eventFiles )
    {
        const filePath = path.join( eventsPath, file );
        const event = require( filePath );
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ( 'name' in event && 'execute' in event ) {
            events.set( event.name, event );
        } else {
            console.log( `[WARNING] The event at ${ filePath } is missing a required "name" or "execute" property.` );
        }
    }
}

module.exports = { setEvents, events };
