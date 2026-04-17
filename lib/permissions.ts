// // lib/permission.ts
// import { createAccessControl } from "better-auth/plugins/access";
// import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";
// import { UserRole } from "./generated/prisma/enums";

// const statements = {
//   ...defaultStatements,

//   dashboard: ["read"],

//   users: ["read", "create", "update", "delete", "ban"],
//   services: ["read", "create", "update", "delete"],
//   categories: ["read", "create", "update", "delete"],
//   products: ["read", "create", "update", "delete", "publish", "archive"],
//   packages: ["read", "create", "update", "delete"],
//   orders: ["read", "create", "update", "delete", "manage"],
//   reviews: ["read", "update", "delete", "moderate"],
//   coupons: ["read", "create", "update", "delete"],
//   inventory: ["read", "create", "update"],
//   proofs: ["read", "create", "update", "approve"],
//   contacts: ["read", "delete"],
//   posts: ["create", "read", "update", "delete", "update:own", "delete:own"],
// } as const;

// export const ac = createAccessControl(statements);

// export const roles = {
//   [UserRole.USER]: ac.newRole({
//     posts: ["create", "read", "update:own", "delete:own"],
//   }),

//   [UserRole.STAFF]: ac.newRole({
//     dashboard: ["read"],
//     orders: ["read", "update", "manage"],
//     proofs: ["read", "create", "update"],
//     contacts: ["read"],
//     reviews: ["read"],
//     products: ["read"],
//     categories: ["read"],
//     services: ["read"],
//     packages: ["read"],
//     inventory: ["read"],
//     posts: ["create", "read", "update:own", "delete:own"],
//   }),

//   [UserRole.MANAGER]: ac.newRole({
//     dashboard: ["read"],
//     users: ["read", "update"],
//     services: ["read", "create", "update", "delete"],
//     categories: ["read", "create", "update", "delete"],
//     products: ["read", "create", "update", "publish", "archive"],
//     packages: ["read", "create", "update", "delete"],
//     orders: ["read", "update", "manage"],
//     reviews: ["read", "update", "moderate"],
//     coupons: ["read", "create", "update", "delete"],
//     inventory: ["read", "create", "update"],
//     proofs: ["read", "create", "update", "approve"],
//     contacts: ["read", "delete"],
//     posts: ["create", "read", "update", "delete", "update:own", "delete:own"],
//   }),

//   [UserRole.ADMIN]: ac.newRole({
//     ...adminAc.statements,
//     dashboard: ["read"],
//     users: ["read", "create", "update", "delete", "ban"],
//     services: ["read", "create", "update", "delete"],
//     categories: ["read", "create", "update", "delete"],
//     products: ["read", "create", "update", "delete", "publish", "archive"],
//     packages: ["read", "create", "update", "delete"],
//     orders: ["read", "create", "update", "delete", "manage"],
//     reviews: ["read", "update", "delete", "moderate"],
//     coupons: ["read", "create", "update", "delete"],
//     inventory: ["read", "create", "update"],
//     proofs: ["read", "create", "update", "approve"],
//     contacts: ["read", "delete"],
//     posts: ["create", "read", "update", "delete", "update:own", "delete:own"],
//   }),
// } as const;

// export const ADMIN_ROLES = [
//   UserRole.ADMIN,
//   UserRole.MANAGER,
//   UserRole.STAFF,
// ] as const;

// export function isAdminRole(role?: UserRole | string | null) {
//   return role === UserRole.ADMIN || role === UserRole.MANAGER || role === UserRole.STAFF;
// }

// export function isSuperAdmin(role?: UserRole | string | null) {
//   return role === UserRole.ADMIN;
// }

// lib/permission.ts
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";
import { UserRole } from "./generated/prisma/enums";

const statements = {
  ...defaultStatements,
  dashboard: ["read"],
  users: ["read", "create", "update", "delete", "ban"],
  services: ["read", "create", "update", "delete"],
  categories: ["read", "create", "update", "delete"],
  products: ["read", "create", "update", "delete", "publish", "archive"],
  packages: ["read", "create", "update", "delete"],
  orders: ["read", "create", "update", "delete", "manage"],
  reviews: ["read", "update", "delete", "moderate"],
  coupons: ["read", "create", "update", "delete"],
  inventory: ["read", "create", "update"],
  proofs: ["read", "create", "update", "approve"],
  contacts: ["read", "delete"],
  posts: ["create", "read", "update", "delete", "update:own", "delete:own"],
} as const;

export const ac = createAccessControl(statements);

export const roles = {
  [UserRole.USER]: ac.newRole({
    posts: ["create", "read", "update:own", "delete:own"],
  }),

  [UserRole.STAFF]: ac.newRole({
    dashboard: ["read"],
    orders: ["read", "update", "manage"],
    proofs: ["read", "create", "update"],
    contacts: ["read"],
    reviews: ["read"],
    products: ["read"],
    categories: ["read"],
    services: ["read"],
    packages: ["read"],
    inventory: ["read"],
    posts: ["create", "read", "update:own", "delete:own"],
  }),

  [UserRole.MANAGER]: ac.newRole({
    dashboard: ["read"],
    users: ["read", "update"],
    services: ["read", "create", "update", "delete"],
    categories: ["read", "create", "update", "delete"],
    products: ["read", "create", "update", "publish", "archive"],
    packages: ["read", "create", "update", "delete"],
    orders: ["read", "update", "manage"],
    reviews: ["read", "update", "moderate"],
    coupons: ["read", "create", "update", "delete"],
    inventory: ["read", "create", "update"],
    proofs: ["read", "create", "update", "approve"],
    contacts: ["read", "delete"],
    posts: ["create", "read", "update", "delete", "update:own", "delete:own"],
  }),

  [UserRole.ADMIN]: ac.newRole({
    ...adminAc.statements,
    dashboard: ["read"],
    users: ["read", "create", "update", "delete", "ban"],
    services: ["read", "create", "update", "delete"],
    categories: ["read", "create", "update", "delete"],
    products: ["read", "create", "update", "delete", "publish", "archive"],
    packages: ["read", "create", "update", "delete"],
    orders: ["read", "create", "update", "delete", "manage"],
    reviews: ["read", "update", "delete", "moderate"],
    coupons: ["read", "create", "update", "delete"],
    inventory: ["read", "create", "update"],
    proofs: ["read", "create", "update", "approve"],
    contacts: ["read", "delete"],
    posts: ["create", "read", "update", "delete", "update:own", "delete:own"],
  }),
} as const;