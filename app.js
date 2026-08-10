import './style.css';

/**
 * Halcyon Days - Dynamic UI Features
 * Handles clock updates for the waybar.
 */

(function() {
    'use strict';

    // Configuration constants
    const CONFIG = {
        CLOCK_UPDATE_INTERVAL: 1000,        // 1 second
    };

    // DOM element cache
    const elements = {
        clock: null,
    };

    /**
     * Initialize DOM element references
     * @returns {boolean} True if all elements found, false otherwise
     */
    function initializeElements() {
        elements.clock = document.getElementById('clock');

        return !!elements.clock;
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
     * Start all update intervals
     */
    function startUpdates() {
        // Initial update
        updateClock();

        // Periodic updates
        setInterval(updateClock, CONFIG.CLOCK_UPDATE_INTERVAL);
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
