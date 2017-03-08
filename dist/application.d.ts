/// <reference types="express" />
import { Express, Request, Response, Router as BaseRouter } from 'express';
import { Configuration } from 'acm';
export declare const Router: typeof BaseRouter;
export declare type Request = Request;
export declare type Response = Response;
export declare type Application = Express;
export declare type Configuration = Configuration;
export interface Bootstrapped {
    app: Application;
    config: Configuration;
}
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
export declare function configuration(): Configuration;
export declare function bootstrap(config?: Configuration): Bootstrapped;
export declare function application(config: Configuration): Application;
