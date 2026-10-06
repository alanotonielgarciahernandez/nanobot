'use strict'

export default
{
  name: 'ping',
  description: 'Returns Pong!',
  usage: '<prefix> ping',

  async execute( _, msg, __ )
  {
    msg.channel.send( 'Pong!' )
    .then(
      m =>
      {
        m.edit( `Pong! with ${ m.createdTimestamp - msg.createdTimestamp }ms` )
      }
    );
  },
};
