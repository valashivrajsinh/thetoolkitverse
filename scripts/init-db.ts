import { createTables } from '../lib/dynamodb';

async function init() {
    try {
        await createTables();
        console.log('Successfully initialized DynamoDB tables');
    } catch (error) {
        console.error('Failed to initialize DynamoDB tables:', error);
        process.exit(1);
    }
}

init();
