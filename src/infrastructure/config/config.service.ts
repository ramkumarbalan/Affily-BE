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
            this.instance = new ConfigService(`.env`);
        }

        return this.instance;
    }

    getString(key: string): string {
        return this.env[key];
    }

    getNumber(key: string): number {
        return parseFloat(this.env[key]);
    }

    mongoUrl() {
        const host = this.getString('DB_HOST');
        const port = this.getString('DB_PORT');
        const database = this.getString('DB_NAME');
        const username = this.getString('DB_USER');
        const password = this.getString('DB_PASS');
        const authDatabase = this.getString('DB_AUTH_METHOD');
        const authSource = this.getString('DB_AUTH_SOURCE');
        const connectionurl = this.getString('APP_ENV') === 'local' ? 
        `mongodb://localhost:27017/affily`: `mongodb+srv://${username}:${password}@cluster0.epls1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
        console.log(connectionurl)
        return connectionurl;
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
