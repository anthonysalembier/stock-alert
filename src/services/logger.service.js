export function configureLogger() {
    const originalConsoleLog = console.log;
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    const loggerPrefix = function () {
        const args = [];

        args.push(
            `[${new Date().toLocaleString(
                'en-US',
                {
                    hour12: false,
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }
            ).replace(', ', ' - ')}]: `
        );

        for (let i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        originalConsoleLog.apply(console, args);
    }

    console.log = loggerPrefix;
    console.warn = loggerPrefix;
    console.error = loggerPrefix;
}
