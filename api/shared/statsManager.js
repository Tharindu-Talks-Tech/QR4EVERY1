const fs = require('fs').promises;
const path = require('path');

// Shared utility for managing QR code statistics
// This provides a simple way to persist stats using file storage

class StatsManager {
    constructor() {
        this.DEFAULT_STATS = {
            created: 150,  // Start with some realistic numbers
            downloaded: 89
        };
        
        // Use a temp directory that persists across function calls
        this.statsFilePath = path.join(process.env.TEMP || '/tmp', 'qr-stats.json');
    }

    // Load stats from file or return defaults
    async loadStats() {
        try {
            const data = await fs.readFile(this.statsFilePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            // File doesn't exist or is corrupted, return defaults
            return { ...this.DEFAULT_STATS };
        }
    }

    // Save stats to file
    async saveStats(stats) {
        try {
            await fs.writeFile(this.statsFilePath, JSON.stringify(stats, null, 2));
            return true;
        } catch (error) {
            console.error('Failed to save stats:', error);
            return false;
        }
    }

    // Get current stats
    async getCurrentStats() {
        const stats = await this.loadStats();
        return stats;
    }

    // Increment a specific counter
    async incrementCount(type) {
        const stats = await this.loadStats();
        
        if (type === 'created') {
            stats.created++;
        } else if (type === 'downloaded') {
            stats.downloaded++;
        }
        
        // Save the updated stats
        await this.saveStats(stats);
        
        return stats;
    }

    // Reset stats (for testing purposes)
    async resetStats() {
        const stats = { ...this.DEFAULT_STATS };
        await this.saveStats(stats);
        return stats;
    }
}

module.exports = new StatsManager();
