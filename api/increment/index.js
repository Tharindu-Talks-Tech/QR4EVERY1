const statsManager = require('../shared/statsManager');

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

    if (req.method !== 'POST') {
        context.res = {
            status: 405,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: { error: 'Method not allowed' }
        };
        return;
    }
    
    try {
        const { type } = req.body;
        
        if (!type || (type !== 'created' && type !== 'downloaded')) {
            context.res = {
                status: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: { error: 'Invalid increment type. Must be "created" or "downloaded"' }
            };
            return;
        }
        
        // Increment the appropriate counter using the shared stats manager
        const stats = await statsManager.incrementCount(type);
        
        context.log(`Incremented ${type} counter. New stats:`, stats);
        
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
        context.log('Error incrementing stats:', error);
        context.res = {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: { error: 'Failed to increment stats' }
        };
    }
};
