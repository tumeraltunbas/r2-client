import dotenv from 'dotenv';

dotenv.config();

export default (): Configuration => ({
    application: {
        port: parseInt(process.env.PORT) ?? 3000,
        test: '',
    },
    aws: {
        accessKey: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    },
});

interface Configuration {
    application: ApplicationConfig;
    aws: AwsConfig;
}

export interface ApplicationConfig {
    port: number;
    test: string;
}

export interface AwsConfig {
    accessKey: string;
    secretAccessKey: string;
    region: string;
}
