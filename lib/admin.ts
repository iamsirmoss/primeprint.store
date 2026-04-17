// lib/admin.ts
import { UserRole } from "@/lib/generated/prisma/enums";

export function isAdminRole(role?: UserRole | string | null) {
  return (
    role === UserRole.ADMIN ||
    role === UserRole.MANAGER ||
    role === UserRole.STAFF
  );
}

export function isSuperAdmin(role?: UserRole | string | null) {
  return role === UserRole.ADMIN;
}