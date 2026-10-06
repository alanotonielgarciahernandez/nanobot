'use strict'

module.exports = {
    name: "ping",
    description: "Returns Pong!",
    async execute( msg, _ ) {
        msg.channel.send( 'Pong!' );
    },
};
