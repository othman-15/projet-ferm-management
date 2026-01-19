import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs';
import {AuthService, UserInfo} from '../../../core/services/auth';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayoutComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  userInfo: UserInfo | null = null;
  isSidebarOpen = true;
  isMobileMenuOpen = false;
  currentRoute = '';

  async ngOnInit() {
    try {
      this.userInfo = await this.authService.getUserInfo();
    } catch (error) {
      console.error('Error loading user info:', error);
    }

    // Subscribe to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  hasRole(role: string): boolean {
    return this.authService.hasRole(role);
  }

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  getPageTitle(): string {
    if (this.router.url.includes('/dashboard')) return 'Dashboard';
    if (this.router.url.includes('/projets')) return 'Projets';
    if (this.router.url.includes('/equipments')) return 'Équipements';
    if (this.router.url.includes('/biologistes')) return 'Biologistes';
    if (this.router.url.includes('/analyses')) return 'Analyses';
    if (this.router.url.includes('/rapports')) return 'Rapports';
    if (this.router.url.includes('/settings')) return 'Paramètres';
    return 'Farm Manager';
  }

  getUserInitials(): string {
    if (!this.userInfo) return '??';
    const first = this.userInfo.firstName?.[0] || '';
    const last = this.userInfo.lastName?.[0] || '';
    return (first + last).toUpperCase() || '??';
  }

  async logout() {
    await this.authService.logout();
  }
}
