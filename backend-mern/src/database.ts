import { MongoClient } from 'mongodb';
import config from './config/config';

const connectionString = config.DB.URI;
console.log(connectionString);
const client = new MongoClient(connectionString);

async function connectionToDatabase(){
    let connection:MongoClient;
    connection =  await client.connect();
    let database = connection.db("mern");
    return database;
}

const connection = connectionToDatabase();

export default connection;
