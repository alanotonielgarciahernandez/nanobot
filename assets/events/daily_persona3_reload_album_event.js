'use strict'

const cron = require( 'cron' );
const axios = require( 'axios' );
const { EmbedBuilder } = require( 'discord.js' );
const { tenorAPIKey, subscriberID } = require( '../../config.json' );

const search_term = 'Persona3';
const limit = 50;
const releaseDate = new Date( 2024, 3, 24 );

var actualDate;

// HTTP Request
async function getGIF()
{
    const res = await axios.get( `https://tenor.googleapis.com/v2/search?key=${ tenorAPIKey }&q=${ search_term }&limit=${ limit }` );
    
    return res.data;
}

function getAlbumDate()
{
    const oneDay = 24 * 60 * 60 * 1000;

    const diffDays = Math.round( Math.abs( ( actualDate - releaseDate ) / oneDay ) );
    return diffDays.toString() + ' days until the Persona3 Reload soundtrack release';
}

async function sendDailyPersona3ReloadAlbum( client ) {

    console.log( `[DailyPersona3ReloadAlbumEvent]: Event Launched` );

    const randomItem = Math.round( Math.random() * ( limit - 1 ) );

    const request = await getGIF();

    client.users.fetch( subscriberID ).then( user =>
        user.send( { embeds:
            [
            new EmbedBuilder()
                .setColor( 'Blue' )
                .setTitle( getAlbumDate() )
                .setImage( request.results[ randomItem ].media_formats.gif.url )
            ],
        } )
    );
}

module.exports =
{
    name: 'DailyPersona3ReloadAlbumEvent',
    description: 'Sends a Persona3 game GIF with the days left of the new album to release',
    async execute( client )
    {
        actualDate = Date.now();
        if ( actualDate < releaseDate )
        {
            const cronJob = new cron.CronJob( '0 15 * * *', () => { sendDailyPersona3ReloadAlbum( client ) } ); // Send Every Day at 3:00 PM
            cronJob.start();
        }
    }
};
