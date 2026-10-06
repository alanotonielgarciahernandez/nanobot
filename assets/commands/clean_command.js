'use strict'

const { setTimeout } = require( 'timers/promises' );
const { deleteClearedMessageTimer } = require('../../config.json');

module.exports =
{
    name: 'clear',
    description: 'Clears the given number of messages',
    async execute( msg, args ) {
        // Get Argument
        var i = parseInt( args );

        // If user doesn't give argument, set i to 10;
        if ( !i ) i = 10;
        // Messages to delete cannot exceed 100
        else if ( i > 100 ) i = 100;

        // Delete i messages
        await msg.channel.bulkDelete( i, true );

        // Send task confirmation
        msg.channel.send( 'Cleared!' ).then( async sentMsg => {
            await setTimeout( deleteClearedMessageTimer );
            sentMsg.delete();
        } ) ;
    },
};
