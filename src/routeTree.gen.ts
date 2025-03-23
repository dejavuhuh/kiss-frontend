/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardImport } from './routes/_dashboard'
import { Route as AuthenticationImport } from './routes/_authentication'
import { Route as IndexImport } from './routes/index'
import { Route as DashboardDashboardImport } from './routes/_dashboard/dashboard'
import { Route as AuthenticationSignUpIndexImport } from './routes/_authentication/sign-up/index'
import { Route as AuthenticationSignInIndexImport } from './routes/_authentication/sign-in/index'
import { Route as DashboardSystemUsersIndexImport } from './routes/_dashboard/system/users/index'
import { Route as DashboardSystemRolesIndexImport } from './routes/_dashboard/system/roles/index'
import { Route as DashboardSystemJobsIndexImport } from './routes/_dashboard/system/jobs/index'

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  id: '/_dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticationRoute = AuthenticationImport.update({
  id: '/_authentication',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardDashboardRoute = DashboardDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => DashboardRoute,
} as any)

const AuthenticationSignUpIndexRoute = AuthenticationSignUpIndexImport.update({
  id: '/sign-up/',
  path: '/sign-up/',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticationSignInIndexRoute = AuthenticationSignInIndexImport.update({
  id: '/sign-in/',
  path: '/sign-in/',
  getParentRoute: () => AuthenticationRoute,
} as any)

const DashboardSystemUsersIndexRoute = DashboardSystemUsersIndexImport.update({
  id: '/system/users/',
  path: '/system/users/',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardSystemRolesIndexRoute = DashboardSystemRolesIndexImport.update({
  id: '/system/roles/',
  path: '/system/roles/',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardSystemJobsIndexRoute = DashboardSystemJobsIndexImport.update({
  id: '/system/jobs/',
  path: '/system/jobs/',
  getParentRoute: () => DashboardRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authentication': {
      id: '/_authentication'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticationImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard': {
      id: '/_dashboard'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard/dashboard': {
      id: '/_dashboard/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardDashboardImport
      parentRoute: typeof DashboardImport
    }
    '/_authentication/sign-in/': {
      id: '/_authentication/sign-in/'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof AuthenticationSignInIndexImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authentication/sign-up/': {
      id: '/_authentication/sign-up/'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof AuthenticationSignUpIndexImport
      parentRoute: typeof AuthenticationImport
    }
    '/_dashboard/system/jobs/': {
      id: '/_dashboard/system/jobs/'
      path: '/system/jobs'
      fullPath: '/system/jobs'
      preLoaderRoute: typeof DashboardSystemJobsIndexImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/system/roles/': {
      id: '/_dashboard/system/roles/'
      path: '/system/roles'
      fullPath: '/system/roles'
      preLoaderRoute: typeof DashboardSystemRolesIndexImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/system/users/': {
      id: '/_dashboard/system/users/'
      path: '/system/users'
      fullPath: '/system/users'
      preLoaderRoute: typeof DashboardSystemUsersIndexImport
      parentRoute: typeof DashboardImport
    }
  }
}

// Create and export the route tree

interface AuthenticationRouteChildren {
  AuthenticationSignInIndexRoute: typeof AuthenticationSignInIndexRoute
  AuthenticationSignUpIndexRoute: typeof AuthenticationSignUpIndexRoute
}

const AuthenticationRouteChildren: AuthenticationRouteChildren = {
  AuthenticationSignInIndexRoute: AuthenticationSignInIndexRoute,
  AuthenticationSignUpIndexRoute: AuthenticationSignUpIndexRoute,
}

const AuthenticationRouteWithChildren = AuthenticationRoute._addFileChildren(
  AuthenticationRouteChildren,
)

interface DashboardRouteChildren {
  DashboardDashboardRoute: typeof DashboardDashboardRoute
  DashboardSystemJobsIndexRoute: typeof DashboardSystemJobsIndexRoute
  DashboardSystemRolesIndexRoute: typeof DashboardSystemRolesIndexRoute
  DashboardSystemUsersIndexRoute: typeof DashboardSystemUsersIndexRoute
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardDashboardRoute: DashboardDashboardRoute,
  DashboardSystemJobsIndexRoute: DashboardSystemJobsIndexRoute,
  DashboardSystemRolesIndexRoute: DashboardSystemRolesIndexRoute,
  DashboardSystemUsersIndexRoute: DashboardSystemUsersIndexRoute,
}

const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof DashboardRouteWithChildren
  '/dashboard': typeof DashboardDashboardRoute
  '/sign-in': typeof AuthenticationSignInIndexRoute
  '/sign-up': typeof AuthenticationSignUpIndexRoute
  '/system/jobs': typeof DashboardSystemJobsIndexRoute
  '/system/roles': typeof DashboardSystemRolesIndexRoute
  '/system/users': typeof DashboardSystemUsersIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof DashboardRouteWithChildren
  '/dashboard': typeof DashboardDashboardRoute
  '/sign-in': typeof AuthenticationSignInIndexRoute
  '/sign-up': typeof AuthenticationSignUpIndexRoute
  '/system/jobs': typeof DashboardSystemJobsIndexRoute
  '/system/roles': typeof DashboardSystemRolesIndexRoute
  '/system/users': typeof DashboardSystemUsersIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authentication': typeof AuthenticationRouteWithChildren
  '/_dashboard': typeof DashboardRouteWithChildren
  '/_dashboard/dashboard': typeof DashboardDashboardRoute
  '/_authentication/sign-in/': typeof AuthenticationSignInIndexRoute
  '/_authentication/sign-up/': typeof AuthenticationSignUpIndexRoute
  '/_dashboard/system/jobs/': typeof DashboardSystemJobsIndexRoute
  '/_dashboard/system/roles/': typeof DashboardSystemRolesIndexRoute
  '/_dashboard/system/users/': typeof DashboardSystemUsersIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/dashboard'
    | '/sign-in'
    | '/sign-up'
    | '/system/jobs'
    | '/system/roles'
    | '/system/users'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/dashboard'
    | '/sign-in'
    | '/sign-up'
    | '/system/jobs'
    | '/system/roles'
    | '/system/users'
  id:
    | '__root__'
    | '/'
    | '/_authentication'
    | '/_dashboard'
    | '/_dashboard/dashboard'
    | '/_authentication/sign-in/'
    | '/_authentication/sign-up/'
    | '/_dashboard/system/jobs/'
    | '/_dashboard/system/roles/'
    | '/_dashboard/system/users/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticationRoute: typeof AuthenticationRouteWithChildren
  DashboardRoute: typeof DashboardRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticationRoute: AuthenticationRouteWithChildren,
  DashboardRoute: DashboardRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authentication",
        "/_dashboard"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authentication": {
      "filePath": "_authentication.tsx",
      "children": [
        "/_authentication/sign-in/",
        "/_authentication/sign-up/"
      ]
    },
    "/_dashboard": {
      "filePath": "_dashboard.tsx",
      "children": [
        "/_dashboard/dashboard",
        "/_dashboard/system/jobs/",
        "/_dashboard/system/roles/",
        "/_dashboard/system/users/"
      ]
    },
    "/_dashboard/dashboard": {
      "filePath": "_dashboard/dashboard.tsx",
      "parent": "/_dashboard"
    },
    "/_authentication/sign-in/": {
      "filePath": "_authentication/sign-in/index.tsx",
      "parent": "/_authentication"
    },
    "/_authentication/sign-up/": {
      "filePath": "_authentication/sign-up/index.tsx",
      "parent": "/_authentication"
    },
    "/_dashboard/system/jobs/": {
      "filePath": "_dashboard/system/jobs/index.tsx",
      "parent": "/_dashboard"
    },
    "/_dashboard/system/roles/": {
      "filePath": "_dashboard/system/roles/index.tsx",
      "parent": "/_dashboard"
    },
    "/_dashboard/system/users/": {
      "filePath": "_dashboard/system/users/index.tsx",
      "parent": "/_dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
