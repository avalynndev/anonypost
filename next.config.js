/** @type {import('next').NextConfig} */
const config = {};

// Import and wrap your config with next-pwa
const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    disable: false,
    workboxOptions: {
        disableDevLogs: true,
    },
});
// Export an async function that waits for env validation before returning the wrapped config
module.exports = (async () => {
    // Run env validation (skip by setting SKIP_ENV_VALIDATION if needed)
    await import("./src/env.js");
    return withPWA(config);
})();
