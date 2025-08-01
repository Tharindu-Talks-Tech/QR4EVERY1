const { TableClient } = require("@azure/data-tables");

module.exports = async function (context, req) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        context.res = {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        };
        return;
    }

    try {
        // Simple in-memory counter for free tier
        // In production, you could use Azure Table Storage
        
        const stats = {
            created: Math.floor(Math.random() * 1000) + 100, // Start with some demo numbers
            downloaded: Math.floor(Math.random() * 800) + 50
        };
        
        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: stats
        };
    } catch (error) {
        context.res = {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: { error: 'Failed to fetch stats' }
        };
    }
};
