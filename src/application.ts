import { Express, Request, Response, Router } from 'express';
import { Configuration } from 'acm';

import * as express from 'express';
import * as config from 'acm';
import { static as serve } from 'express';
import { setDefaults as swig_config, renderFile as render } from 'swig';

import * as dotenv from 'dotenv';
import * as favicon from 'serve-favicon';
import * as body from 'body-parser';
import * as compression from 'compression';
import * as cookie from 'cookie-parser';
import * as session from 'express-session';

export const router = Router;

export type Request = Request;
export type Response = Response;
export type Application = Express;
export type Configuration = Configuration;

export interface Bootstrapped {
    app: Application;
    config: Configuration;
}

// https://developer.mozilla.org/en-US/docs/Web/Manifest
export interface Manifest {
    name: string;
    short_name: string;
    description: string;
    start_url: string;
    background_color: string;
    theme_color: string;
    display: 'standalone' | 'portrait' | 'fullscreen' | 'minimal-ui' | 'browser';
    icons: {
        str: string;
        sizes: string;
        type: string;
    }[];
}

export function configuration(): Configuration {
    dotenv.config({ silent: true });
    return config;
};

export function bootstrap(config: Configuration = configuration()): Bootstrapped {
    const app = application(config);
    app.listen(config('port'));
    return { app, config };
};

export function application(config: Configuration): Application {
    const app = express();

    const MANIFEST = config<Manifest>('app.manifest');

    const VIEW_CACHE = config<boolean>('app.server.view_cache');
    const COMPRESSION = config<boolean>('app.server.compression');
    const ROBOTS_TXT = config<boolean>('app.server.robots_txt');
    const BODY_PARSING = config<boolean>('app.server.body_parsing');
    const SESSION = config<boolean>('app.server.session');
    const COOKIES = config<boolean>('app.server.cookies');

    const KEY_COOKIE = config<string>('key.cookie');
    const KEY_SESSION = config<string>('key.session');

    app.set('x-powered-by', false);
    app.set('view cache', true);
    app.set('view engine', 'html');
    app.set('views', './assets/views');
    app.engine('html', render);

    if (VIEW_CACHE) {
        app.set('view cache', false);
        swig_config({ cache: false });
    }

    app.use(favicon('assets/images/favicon.ico'));

    app.get('/manifest.json', (_req, res) =>
        res.json(MANIFEST));

    app.use('/robots.txt', serve(ROBOTS_TXT ?
        'assets/resources/robots.txt' :
        'assets/resources/nobots.txt'));

    if (COMPRESSION) {
        app.use(compression());
    }

    app.use('/assets', serve('assets'));
    app.use('/dist', serve('dist'));
    app.use('/node_modules', serve('node_modules'));

    if (BODY_PARSING) {
        app.use(body.json());
        app.use(body.urlencoded({ extended: true }));
    }

    if (COOKIES) {
        app.use(cookie(KEY_COOKIE));
    }

    if (SESSION) {
        app.use(session({
            name: 'sid',
            secret: KEY_SESSION,
            saveUninitialized: false,
            resave: false,
        }));
    }

    return app;
};
