'use strict'

const cron = require( 'cron' );
const axios = require( 'axios' );
const { EmbedBuilder } = require( 'discord.js' );
const { tenorAPIKey, subscriberID } = require( '../../config.json' );

const search_term = 'Persona';
const limit = 50;

// HTTP Request
async function getGIF( i )
{
    const res = await axios.get( `https://tenor.googleapis.com/v2/search?key=${ tenorAPIKey }&q=${ search_term + i }&limit=${ limit }` )
    
    return res.data;
}

function getColor( i )
{
    switch ( i ) {
        case 3:
            return 'Blue'
        case 4:
            return 'Yellow'
        case 5:
            return 'Red'
    }
}

async function sendDailyPersonaGIF( client )
{
    console.log( `[DailyPersonaGIFEvent]: Event Launched` )

    const index = Math.round( Math.random() * 2 ) + 3;
    const randomItem = Math.round( Math.random() * ( limit - 1 ) )

    const request = await getGIF( index );

    client.users.fetch( subscriberID ).then( user =>
        user.send( { embeds:
            [
            new EmbedBuilder()
                .setColor( getColor( index ) )
                .setTitle( 'Daily Persona GIF' )
                .setImage( request.results[ randomItem ].media_formats.gif.url )
            ],
        } )
    )
}

module.exports =
{
    name: "DailyPersonaGIF",
    description: "Sends a Persona Game GIF to the user Nano",

    async execute( client )
    {
        const cronJob = new cron.CronJob( '0 15 * * *', () => { sendDailyPersonaGIF( client ) } ); // Send Every Day at 3:00 PM
        cronJob.start();
    }
};
