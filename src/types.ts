/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'TRAINEE' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
}

export interface Report {
  id: string;
  traineeId: string;
  traineeName: string;
  date: string; // ISO string
  content: string; // Keep for legacy/summary
  startTime?: string;
  endTime?: string;
  totalHours?: number;
  workDone?: string;
  hasBlockers?: boolean;
  blockersDetails?: string;
  nextSteps?: string;
  notes?: string;
  screenshots?: string[];
  status: 'submitted' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  currentUser: User | null;
  users: User[];
  reports: Report[];
}
