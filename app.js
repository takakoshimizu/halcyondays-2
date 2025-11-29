/**
 * Halcyon Days - Dynamic UI Features
 * Handles clock updates and network stats simulation
 */

(function() {
    'use strict';

    // Configuration constants
    const CONFIG = {
        CLOCK_UPDATE_INTERVAL: 1000,        // 1 second
        WIFI_UPDATE_INTERVAL: 2000,         // 2 seconds
        WIFI_DOWNLOAD_MIN: 50,              // KB/s
        WIFI_DOWNLOAD_MAX: 5000,            // KB/s
        WIFI_UPLOAD_MIN: 10,                // KB/s
        WIFI_UPLOAD_MAX: 1000,              // KB/s
        SPEED_THRESHOLD_MB: 1000,           // KB/s threshold for MB display
    };

    // DOM element cache
    const elements = {
        clock: null,
        wifiDownload: null,
        wifiUpload: null,
    };

    /**
     * Initialize DOM element references
     * @returns {boolean} True if all elements found, false otherwise
     */
    function initializeElements() {
        elements.clock = document.getElementById('clock');
        elements.wifiDownload = document.getElementById('wifi-download');
        elements.wifiUpload = document.getElementById('wifi-upload');

        // Validate all elements exist
        return elements.clock && elements.wifiDownload && elements.wifiUpload;
    }

    /**
     * Format time component with leading zero
     * @param {number} value - Time value to format
     * @returns {string} Formatted time string
     */
    function padTime(value) {
        return String(value).padStart(2, '0');
    }

    /**
     * Convert 24-hour time to 12-hour format
     * @param {number} hours - Hours in 24-hour format
     * @returns {Object} Object containing formatted hours and AM/PM indicator
     */
    function to12HourFormat(hours) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 || 12; // Convert 0 to 12
        return { hours: hour12, ampm };
    }

    /**
     * Update the clock display with current time
     */
    function updateClock() {
        if (!elements.clock) return;

        const now = new Date();
        const { hours, ampm } = to12HourFormat(now.getHours());
        const minutes = padTime(now.getMinutes());
        const seconds = padTime(now.getSeconds());
        const hoursStr = padTime(hours);

        elements.clock.textContent = `${hoursStr}:${minutes}:${seconds} ${ampm}`;
    }

    /**
     * Generate random number within range
     * @param {number} min - Minimum value (inclusive)
     * @param {number} max - Maximum value (inclusive)
     * @returns {number} Random integer in range
     */
    function randomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Format network speed for display
     * @param {number} kbps - Speed in KB/s
     * @returns {string} Formatted speed string
     */
    function formatSpeed(kbps) {
        if (kbps >= CONFIG.SPEED_THRESHOLD_MB) {
            return `${(kbps / 1000).toFixed(1)} MB/s`;
        }
        return `${kbps} KB/s`;
    }

    /**
     * Update WiFi stats with simulated network speeds
     */
    function updateWifiStats() {
        if (!elements.wifiDownload || !elements.wifiUpload) return;

        const download = randomInRange(CONFIG.WIFI_DOWNLOAD_MIN, CONFIG.WIFI_DOWNLOAD_MAX);
        const upload = randomInRange(CONFIG.WIFI_UPLOAD_MIN, CONFIG.WIFI_UPLOAD_MAX);

        elements.wifiDownload.textContent = formatSpeed(download);
        elements.wifiUpload.textContent = formatSpeed(upload);
    }

    /**
     * Start all update intervals
     */
    function startUpdates() {
        // Initial updates
        updateClock();
        updateWifiStats();

        // Periodic updates
        setInterval(updateClock, CONFIG.CLOCK_UPDATE_INTERVAL);
        setInterval(updateWifiStats, CONFIG.WIFI_UPDATE_INTERVAL);
    }

    /**
     * Initialize the application
     */
    function init() {
        if (!initializeElements()) {
            console.error('Failed to initialize: required DOM elements not found');
            return;
        }

        startUpdates();
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
