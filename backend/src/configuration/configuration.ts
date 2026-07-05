import dotenv from 'dotenv';

dotenv.config();

export default (): Configuration => ({
    application: {
        port: parseInt(process.env.PORT) ?? 3000,
    },
    cloudflare: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
        apiToken: process.env.CLOUDFLARE_API_TOKEN,
        apiUrl: 'https://api.cloudflare.com/client',
        apiVersion: 'v4',
    },
});

interface Configuration {
    application: ApplicationConfig;
    cloudflare: CloudflareConfig;
}

export interface ApplicationConfig {
    port: number;
}

export interface CloudflareConfig {
    accountId: string;
    apiToken: string;
    apiUrl: string;
    apiVersion: string;
}
