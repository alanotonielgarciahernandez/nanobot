'use strict'

const axios = require( 'axios' )
const { EmbedBuilder, Embed, DiscordAPIError } = require( 'discord.js' )
const tasksJson = require( '../json/phone_tasks.json' );
const { tenorAPIKey } = require( '../../config.json' )

const search_term = 'Persona'

// Request
async function getGIFs() {
    const res = await axios.get( `https://tenor.googleapis.com/v2/search?key=${ tenorAPIKey }&q=${ search_term }` )
    return res.data
}

module.exports = {
    name: "test",
    description: "test command",
    async execute( msg, __ )
    {
        if ( Date.now() < new Date( 2024, 4, 17 ) ) console.log( "Hello" );
    },
};
