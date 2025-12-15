export enum AdminRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  SUPPORT = 'SUPPORT',
  OPS = 'OPS',
  MARKETING = 'MARKETING',
  VIEWER = 'VIEWER',
}

export const RoleDisplayNames: Record<AdminRole, string> = {
  [AdminRole.SUPER_ADMIN]: 'Super Admin',
  [AdminRole.ADMIN]: 'Admin',
  [AdminRole.SUPPORT]: 'Support',
  [AdminRole.OPS]: 'Operations',
  [AdminRole.MARKETING]: 'Marketing',
  [AdminRole.VIEWER]: 'Viewer',
};

export const RoleDescriptions: Record<AdminRole, string> = {
  [AdminRole.SUPER_ADMIN]: 'Full access to all features and settings',
  [AdminRole.ADMIN]: 'Manage team, restaurants, and most features',
  [AdminRole.SUPPORT]: 'Handle customer issues and restaurant support',
  [AdminRole.OPS]: 'Manage operations, billing, and feature flags',
  [AdminRole.MARKETING]: 'Manage campaigns, reviews, and analytics',
  [AdminRole.VIEWER]: 'Read-only access to view data',
};

export const RoleColors: Record<AdminRole, { bg: string; text: string }> = {
  [AdminRole.SUPER_ADMIN]: { bg: 'bg-red-100', text: 'text-red-700' },
  [AdminRole.ADMIN]: { bg: 'bg-purple-100', text: 'text-purple-700' },
  [AdminRole.SUPPORT]: { bg: 'bg-blue-100', text: 'text-blue-700' },
  [AdminRole.OPS]: { bg: 'bg-green-100', text: 'text-green-700' },
  [AdminRole.MARKETING]: { bg: 'bg-orange-100', text: 'text-orange-700' },
  [AdminRole.VIEWER]: { bg: 'bg-gray-100', text: 'text-gray-700' },
};

export const AllRoles = Object.values(AdminRole);
