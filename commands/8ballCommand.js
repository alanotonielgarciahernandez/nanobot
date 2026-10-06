'use strict'

const answers = [ 'Yes', 'No' ];

export default
{
  name: '8ball',
  description: 'Sends random answer',
  usage: '<prefix> 8ball',

  async execute( _, msg, __ ) {
    // Get Random Number
    const randomIndex = Math.round( Math.random() * ( answers.length -1 ) );

    msg.channel.send( answers[ randomIndex ] );
  },
};
