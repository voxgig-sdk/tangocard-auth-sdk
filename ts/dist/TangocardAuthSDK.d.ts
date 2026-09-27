import { ServiceTokenManagementEntity } from './entity/ServiceTokenManagementEntity';
export type * from './TangocardAuthTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { TangocardAuthEntityBase } from './TangocardAuthEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class TangocardAuthSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    ServiceTokenManagement(entopts?: Record<string, any>): ServiceTokenManagementEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): TangocardAuthSDK;
    tester(testopts?: any, sdkopts?: any): TangocardAuthSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof TangocardAuthSDK;
export { stdutil, config, BaseFeature, TangocardAuthEntityBase, TangocardAuthSDK, SDK, };
