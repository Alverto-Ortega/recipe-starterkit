export const withDatabaseConnection = async (pool, callback) => {
    const client = await pool.connect();
    try {
        return await callback(client);
    } finally {
        client.release();
    }
};