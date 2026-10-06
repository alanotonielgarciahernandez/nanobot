'use strict'

const { Client, GatewayIntentBits, ActivityType } = require( 'discord.js' );
const { token, prefix } = require( './config.json' );

const commands = require( './assets/commands/commands' );
const events = require( './assets/events/events.js' );

// Create Client
const client = new Client( {
	intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ],
	partials: [ "CHANNEL" ] 
} );

// Check if messages contains the prefix
client.on( 'messageCreate', async msg => {
	if ( !msg.content.toLowerCase().startsWith( prefix ) ) return;
	
    const givenCommand = msg.content.split(' ', 3);
    const command = client.commands.get( givenCommand[ 1 ] );
	
	if ( !command ) {
		msg.channel.send( `Command not found: ${ givenCommand[ 1 ] }.` );
		return;
	}
	
	try {
		await command.execute( msg, givenCommand[ 2 ] );
	} catch ( error ) {
		console.error( error );
	}
} );


// Log bot in
client.on( 'ready', _ => {
	// Logged In Message
    console.log( `[Main]: Logged in as ${ client.user.tag }` );
	
	// Set Bot Activity
    client.user.setActivity( 'Hello World!', { type: ActivityType.Watching } );
	
	// Load Commands
	commands.setCommands( client );
	
	// Load Events
	events.setEvents();
	
	// Start Events
	events.events.each( event => event.execute( client ) );
} );

client.login( token );
