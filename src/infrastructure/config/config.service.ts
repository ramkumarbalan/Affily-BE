import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
    [key: string]: string;
}

export class ConfigService {
    private static instance = null;
    private readonly env: EnvConfig;

    constructor(filePath: string) {
        const configs = dotenv.parse(fs.readFileSync(filePath));
        this.env = configs;
        // this.env = this.validateInput(configs);
    }

    static getInstance(): ConfigService {
        if (this.instance == null) {
            this.instance = new ConfigService(`${process.env.NODE_ENV || ''}.env`);
        }

        return this.instance;
    }

    getString(key: string): string {
        return this.env[key];
    }

    getNumber(key: string): number {
        return parseFloat(this.env[key]);
    }

    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     */
    private validateInput(env: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            APP_ENV: Joi.string()
                .valid('local', 'development', 'alpha', 'production', 'test', 'provision')
                .default('local'),
            APP_PORT: Joi.number().default(4000),
            DB_HOST: Joi.string(),
            DB_PORT: Joi.string(),
            DB_NAME: Joi.string(),
            DB_USER: Joi.string(),
            DB_PASS: Joi.string(),
            DB_AUTH_METHOD: Joi.string(),
            DB_AUTH_SOURCE: Joi.string(),
            USER_PROFILE_SERVICE_URL: Joi.string()
        });

        const {error, value: validatedEnvConfig} = envVarsSchema.validate(env);

        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }

        return validatedEnvConfig;
    }

    mongoUrl() {
        const host = this.getString('DB_HOST');
        const port = this.getString('DB_PORT');
        const database = this.getString('DB_NAME');
        const username = this.getString('DB_USER');
        const password = this.getString('DB_PASS');
        const authDatabase = this.getString('DB_AUTH_METHOD');
        const authSource = this.getString('DB_AUTH_SOURCE');
        return `mongodb://${(username && password)?`${username}:${password}@`:''}${host}:${port}/${database}${(authSource)?`?authSource=${authSource}`:''}`;
    }

    mongoOptions() {
        return {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true
        };
    }
}

const config = ConfigService.getInstance();

export {config};
