import { readFile } from 'fs/promises';

let config;

export const loadConfig = async () =>
{
  try
  {
    // Read the JSON file
    const data = await readFile(new URL( '../config.json', import.meta.url ), 'utf-8' );
    // Parse the JSON data
    config = JSON.parse( data );
    return config;
  }
  catch ( error )
  {
    console.error( 'Error reading config file:', error );
  }
}

export const getConfig = () => config;
