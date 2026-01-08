import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
declare const KeycloakJwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class KeycloakJwtStrategy extends KeycloakJwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<{
        userId: any;
        username: any;
        email: any;
        roles: any;
        resourceAccess: any;
    }>;
}
export {};
