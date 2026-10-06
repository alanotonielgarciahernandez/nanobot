'use strict'

import { setTimeout } from 'timers/promises';

import { getConfig } from '../utils/config.js';

export default
{
  name: 'clear',
  description: 'Clears the given number of messages',
  usage: '<prefix> clear <size>',

  async execute( _, msg, args )
  {
    // Get Argument.
    var i = parseInt( args );

    // If user doesn't give argument, set i to 10.
    if ( !i ) i = 10;
    // Messages to delete cannot exceed 100.
    else if ( i > 100 ) i = 100;

    // Delete messages.
    await msg.channel.bulkDelete( i, true );

    // Send task confirmation.
    msg.channel.send( 'Cleared!' ).then(
      async sentMsg =>
      {
        await setTimeout( getConfig().deleteClearedMessageTimer );
        sentMsg.delete();
      }
    ) ;
  }
};
