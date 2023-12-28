export function getEnv() {
    const env = (process.env.ENVIRONMENT as string) || 'DEV';
    return env.toUpperCase();
}
