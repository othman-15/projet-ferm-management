import { Injectable, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

export interface UserInfo {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private keycloakService = inject(KeycloakService);

  async isLoggedIn(): Promise<boolean> {
    return await this.keycloakService.isLoggedIn();
  }

  async getUserProfile(): Promise<KeycloakProfile> {
    return await this.keycloakService.loadUserProfile();
  }

  async getUserInfo(): Promise<UserInfo> {
    try {
      const profile = await this.getUserProfile();
      const roles = this.keycloakService.getUserRoles();

      return {
        username: profile.username || '',
        email: profile.email || '',
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        roles: roles
      };
    } catch (error) {
      console.error('Error getting user info:', error);
      throw error;
    }
  }

  getUserRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  hasRole(role: string): boolean {
    return this.keycloakService.getUserRoles().includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.keycloakService.getUserRoles();
    return roles.some(role => userRoles.includes(role));
  }

  async login(): Promise<void> {
    await this.keycloakService.login();
  }

  async logout(): Promise<void> {
    await this.keycloakService.logout(window.location.origin);
  }

  async getToken(): Promise<string> {
    return await this.keycloakService.getToken();
  }

  async updateToken(minValidity: number = 30): Promise<boolean> {
    return await this.keycloakService.updateToken(minValidity);
  }
}
