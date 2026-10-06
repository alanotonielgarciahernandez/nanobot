'use strict'

const fs = require( 'node:fs' );
const { EmbedBuilder } = require( 'discord.js' );
const { administratorID } = require( '../../config.json' );

module.exports = {
    name: "verifyTask",
    description: "Manually set phone availability to true",
    async execute( msg, args ) {
        if ( msg.author.id != administratorID ) return;

        const userDataJson = fs.readFileSync( 'assets/json/user_data.json' );
        const userData = JSON.parse( userDataJson );

        const userIndex = findUser( args, userData );

        if ( userIndex == -1 ) console.log( 'User not found' );

        userData[ userIndex ].phoneAvailability = true;

        fs.writeFileSync( 'assets/json/user_data.json', JSON.stringify( userData ) );

        msg.channel.send( { embeds: [ doneEmbed ] } );
    },
};

function findUser( userId, data ) {

    // Search on the Array
    var index = data.findIndex( ( item, _ ) => item.id === userId );

    return index;
}

const doneEmbed = new EmbedBuilder()
    .setColor( 'Green' )
    .setTitle( ':white_check_mark: Task verified!' )