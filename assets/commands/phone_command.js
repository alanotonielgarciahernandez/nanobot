'use strict'

const fs = require( 'node:fs' );
const { EmbedBuilder } = require( 'discord.js' );
const tasksJson = require( '../json/phone_tasks.json' );
const { imagesPath, taskResponseTimer } = require( '../../config.json' );

module.exports = {
    name: "phone",
    description: "Requests the use of the phone",

    async execute( msg, args ) {
        var emergency = false;

        if ( args == 'e' ) {
            emergency = true;
        }

        // Get actual Date
        const date = new Date();
        
        // Read User Data JSON
        const userDataJson = fs.readFileSync( 'assets/json/user_data.json' );
        const userData = JSON.parse( userDataJson );

        // Search for the User on the data
        var userIndex = findUser( msg.author.id, userData, date );

        // Check Date
        const userDate = new Date( userData[ userIndex ].lastPhoneDate );

        if ( userDate.getDay() != date.getDay() ) {
            // Change Phone Availability
            userData[ userIndex ].phoneAvailability = false;

            // Change Last Phone Date
            userData[ userIndex ].lastPhoneDate = date;

            setRandomTaskIndex( userData, userIndex );  
            
            if ( emergency ) {
                do { taskIndex = setRandomTaskIndex( userData, userIndex ) }
                while ( tasksJson[ taskIndex ].tag == "long" )
            }
        }

        // Check the Phone Availability of the User
        if ( userData[ userIndex ].phoneAvailability ) {
            sendDoneMessage( msg );
            return;
        }

        // Send the task
        const filter = m => m.author.id === msg.author.id;
        const taskObject = tasksJson[ userData[ userIndex ].taskIndex ];

        msg.channel.send( {
            embeds: [ taskEmbed( userData[ userIndex ] ) ],
            files: [ imagesPath + taskObject.task.imageName ]
        } );
        
        msg.channel.awaitMessages( {
            filter: filter, max: 1,
            time: taskResponseTimer, errors: [ 'time' ]
        } )
        .then( response => getResult( msg, response.first().content, userData, userIndex, taskObject ) )
        .catch( error => 
        {
            msg.channel.send( { embeds: [ timeoutEmbed ] } ) ;
            console.log( error );
        } );
    },
};


// Set Random Task
function setRandomTaskIndex( userData, userIndex ) {
    var randomIndex;
    
    do randomIndex = Math.round( Math.random() * ( tasksJson.length - 1 ) );
    while ( randomIndex == userData[ userIndex ].lastTaskIndex )

    userData[ userIndex ].taskIndex = randomIndex;
    userData[ userIndex ].lastTaskIndex = randomIndex;

    fs.writeFileSync( 'assets/json/user_data.json', JSON.stringify( userData ) );

    return randomIndex;
}

// Find User
function findUser( userId, data, date ) {

    // Search on the Array
    var index = data.findIndex( ( item, _ ) => item.id === userId );

    // If User is not registered, create one
    if ( index != -1 ) return index;

    createUser( data, userId, date );

    index = data.findIndex( ( item, _ ) => item.id === userId );

    return index;
}


// Create User
function createUser( data, userId ) {
    // User data table
    const newUser = {
        id: userId,
        phoneAvailability: false,
        taskIndex: 0,
        lastTaskIndex: -1,
        lastPhoneDate: new Date( '0000-00-00T00:00:00.201Z' )
    };

    // Send data
    data.push( newUser );
    fs.writeFileSync( 'assets/json/user_data.json', JSON.stringify( data ) );
}


// Send Done Message
function sendDoneMessage( msg ) {
    msg.channel.send( { embeds: [ doneEmbed ] } );
}


// Get Result
function getResult( msg, response, data, index, taskObject ) {
    // Check if response is correct
    for ( const i of taskObject.response ) {
        if ( i == "attachment" ) {
            msg.channel.send( { embeds: [ attachmentAnswerEmbed ] } );
            return;
        }
        if ( response.toLowerCase() == i ) {
            
            data[ index ].phoneAvailability = true;

            fs.writeFileSync( 'assets/json/user_data.json', JSON.stringify( data ) );

            msg.channel.send( { embeds: [ correctAnswerEmbed( data[ index ] ) ] } );
            return;
        }
    }

    // Incorrect Answer
    msg.channel.send( { embeds: [ incorrectAnswerEmbed ] } );
}


// Task Embed
function taskEmbed( data ) {
    const embed = new EmbedBuilder()
    .setColor( 'Yellow' )
    .setTitle( 'Complete the following task to be able to use the phone' )
    .setDescription( tasksJson[ data.taskIndex ].task.title )
    .setImage( `attachment://${ tasksJson[ data.taskIndex ].task.imageName }` )
    .setFooter( { text: `You have ${ taskResponseTimer / 60000 } minutes to respond` } );

    return embed
}


// Correct Answer Embed
function correctAnswerEmbed( data ) {
    const embed = new EmbedBuilder()
        .setColor( 'Green' )
        .setTitle( ':white_check_mark: Correct!' )
        .setDescription( 'You can use the phone' )
        .addFields( { name: 'Interesting Fact:', value: tasksJson[ data.taskIndex ].interestingFact } );

    return embed
}


// Done Embed
const doneEmbed = new EmbedBuilder()
    .setColor( 'Green' )
    .setTitle( ':white_check_mark: You have completed the task!' )
    .setDescription( 'You can use the phone until the next day' );


// Timeout Embed
const timeoutEmbed = new EmbedBuilder()
    .setColor( 'Red' )
    .setTitle( ':x: Time is up!' )
    .setDescription( 'You can request the task again using the same command' );


// Incorrect Answer Embed
const incorrectAnswerEmbed = new EmbedBuilder()
    .setColor( 'Red' )
    .setTitle( ':x: Incorrect!' )
    .setDescription( 'Try again using the same command' );


const attachmentAnswerEmbed = new EmbedBuilder()
.setColor( 'Yellow' )
.setTitle( 'Waiting for verification' )
.setDescription( 'You can ask the administrator to verify the answer' );
