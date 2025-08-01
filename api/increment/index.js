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
                'Access-Control-Allow-Origin': '*'
            },
            body: 'Method not allowed'
        };
        return;
    }
    
    try {
        const { type } = req.body;
        
        // Simple increment logic
        // In production, you would update Azure Table Storage
        const stats = {
            created: type === 'created' ? Math.floor(Math.random() * 1000) + 101 : Math.floor(Math.random() * 1000) + 100,
            downloaded: type === 'downloaded' ? Math.floor(Math.random() * 800) + 51 : Math.floor(Math.random() * 800) + 50
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
            body: { error: 'Failed to increment stats' }
        };
    }
};
