'use strict'

const answers = [ 'Yes', 'No' ]

module.exports = {
    name: "8ball",
    description: "Sends random answer",
    async execute( msg, _ ) {

        // Get Random Number
        const randomIndex = Math.round( Math.random() * ( answers.length -1 ) )

        msg.channel.send( answers[ randomIndex ] );
    },
};
