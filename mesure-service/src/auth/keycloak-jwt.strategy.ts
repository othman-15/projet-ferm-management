// src/auth/keycloak-jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import * as jwksClient from 'jwks-rsa';

@Injectable()
export class KeycloakJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private configService: ConfigService) {
        // Récupérer les valeurs avec getOrThrow() ou avec une valeur par défaut
        const authServerUrl = configService.getOrThrow<string>('KEYCLOAK_AUTH_SERVER_URL');
        const realm = configService.getOrThrow<string>('KEYCLOAK_REALM');
        const jwksUri = configService.getOrThrow<string>('KEYCLOAK_JWKS_URI');

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            audience: 'account',
            issuer: `${authServerUrl}/realms/${realm}`,
            algorithms: ['RS256'],
            secretOrKeyProvider: jwksClient.passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: jwksUri,
            }),
        });
    }

    async validate(payload: any) {
        if (!payload.sub) {
            throw new UnauthorizedException('Token invalide');
        }

        return {
            userId: payload.sub, // ID Keycloak
            username: payload.preferred_username,
            email: payload.email,
            roles: payload.realm_access?.roles || [],
            resourceAccess: payload.resource_access || {},
        };
    }
}