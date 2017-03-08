declare module 'acm' {
    namespace config {
        export type Configuration = <T>(str: string) => T;
    }

    function config<T>(str: string): T;
    export = config;
}

declare module 'compression' {
    import { RequestHandler } from 'express';
    namespace compression {}
    function compression(): RequestHandler;
    export = compression;
}

declare module 'cookie-parser' {
    import { RequestHandler } from 'express';
    namespace parser {}
    function parser(salt?: string): RequestHandler;
    export = parser;
}

declare module 'express-session' {
    import { RequestHandler } from 'express';

    namespace session {
        interface Store {}

        interface Configuration {
            name: string;
            secret: string;
            saveUninitialized: boolean;
            resave: boolean;
            store?: Store;
        }
    }

    function session(config: session.Configuration): RequestHandler;
    export = session;
}
