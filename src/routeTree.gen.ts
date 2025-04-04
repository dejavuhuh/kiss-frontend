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
import { Route as DashboardFaultIndexImport } from './routes/_dashboard/fault/index'
import { Route as AuthenticationSignUpIndexImport } from './routes/_authentication/sign-up/index'
import { Route as AuthenticationSignInIndexImport } from './routes/_authentication/sign-in/index'
import { Route as DashboardTraceSessionIndexImport } from './routes/_dashboard/trace/session/index'
import { Route as DashboardSystemUserIndexImport } from './routes/_dashboard/system/user/index'
import { Route as DashboardSystemRoleIndexImport } from './routes/_dashboard/system/role/index'
import { Route as DashboardSystemPermissionIndexImport } from './routes/_dashboard/system/permission/index'
import { Route as DashboardSystemJobIndexImport } from './routes/_dashboard/system/job/index'
import { Route as DashboardComponentS3UploadIndexImport } from './routes/_dashboard/component/s3-upload/index'
import { Route as DashboardSystemRoleIdImport } from './routes/_dashboard/system/role/$id'

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

const DashboardFaultIndexRoute = DashboardFaultIndexImport.update({
  id: '/fault/',
  path: '/fault/',
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

const DashboardTraceSessionIndexRoute = DashboardTraceSessionIndexImport.update(
  {
    id: '/trace/session/',
    path: '/trace/session/',
    getParentRoute: () => DashboardRoute,
  } as any,
)

const DashboardSystemUserIndexRoute = DashboardSystemUserIndexImport.update({
  id: '/system/user/',
  path: '/system/user/',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardSystemRoleIndexRoute = DashboardSystemRoleIndexImport.update({
  id: '/system/role/',
  path: '/system/role/',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardSystemPermissionIndexRoute =
  DashboardSystemPermissionIndexImport.update({
    id: '/system/permission/',
    path: '/system/permission/',
    getParentRoute: () => DashboardRoute,
  } as any)

const DashboardSystemJobIndexRoute = DashboardSystemJobIndexImport.update({
  id: '/system/job/',
  path: '/system/job/',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardComponentS3UploadIndexRoute =
  DashboardComponentS3UploadIndexImport.update({
    id: '/component/s3-upload/',
    path: '/component/s3-upload/',
    getParentRoute: () => DashboardRoute,
  } as any)

const DashboardSystemRoleIdRoute = DashboardSystemRoleIdImport.update({
  id: '/system/role/$id',
  path: '/system/role/$id',
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
    '/_dashboard/fault/': {
      id: '/_dashboard/fault/'
      path: '/fault'
      fullPath: '/fault'
      preLoaderRoute: typeof DashboardFaultIndexImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/system/role/$id': {
      id: '/_dashboard/system/role/$id'
      path: '/system/role/$id'
      fullPath: '/system/role/$id'
      preLoaderRoute: typeof DashboardSystemRoleIdImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/component/s3-upload/': {
      id: '/_dashboard/component/s3-upload/'
      path: '/component/s3-upload'
      fullPath: '/component/s3-upload'
      preLoaderRoute: typeof DashboardComponentS3UploadIndexImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/system/job/': {
      id: '/_dashboard/system/job/'
      path: '/system/job'
      fullPath: '/system/job'
      preLoaderRoute: typeof DashboardSystemJobIndexImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/system/permission/': {
      id: '/_dashboard/system/permission/'
      path: '/system/permission'
      fullPath: '/system/permission'
      preLoaderRoute: typeof DashboardSystemPermissionIndexImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/system/role/': {
      id: '/_dashboard/system/role/'
      path: '/system/role'
      fullPath: '/system/role'
      preLoaderRoute: typeof DashboardSystemRoleIndexImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/system/user/': {
      id: '/_dashboard/system/user/'
      path: '/system/user'
      fullPath: '/system/user'
      preLoaderRoute: typeof DashboardSystemUserIndexImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/trace/session/': {
      id: '/_dashboard/trace/session/'
      path: '/trace/session'
      fullPath: '/trace/session'
      preLoaderRoute: typeof DashboardTraceSessionIndexImport
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
  DashboardFaultIndexRoute: typeof DashboardFaultIndexRoute
  DashboardSystemRoleIdRoute: typeof DashboardSystemRoleIdRoute
  DashboardComponentS3UploadIndexRoute: typeof DashboardComponentS3UploadIndexRoute
  DashboardSystemJobIndexRoute: typeof DashboardSystemJobIndexRoute
  DashboardSystemPermissionIndexRoute: typeof DashboardSystemPermissionIndexRoute
  DashboardSystemRoleIndexRoute: typeof DashboardSystemRoleIndexRoute
  DashboardSystemUserIndexRoute: typeof DashboardSystemUserIndexRoute
  DashboardTraceSessionIndexRoute: typeof DashboardTraceSessionIndexRoute
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardDashboardRoute: DashboardDashboardRoute,
  DashboardFaultIndexRoute: DashboardFaultIndexRoute,
  DashboardSystemRoleIdRoute: DashboardSystemRoleIdRoute,
  DashboardComponentS3UploadIndexRoute: DashboardComponentS3UploadIndexRoute,
  DashboardSystemJobIndexRoute: DashboardSystemJobIndexRoute,
  DashboardSystemPermissionIndexRoute: DashboardSystemPermissionIndexRoute,
  DashboardSystemRoleIndexRoute: DashboardSystemRoleIndexRoute,
  DashboardSystemUserIndexRoute: DashboardSystemUserIndexRoute,
  DashboardTraceSessionIndexRoute: DashboardTraceSessionIndexRoute,
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
  '/fault': typeof DashboardFaultIndexRoute
  '/system/role/$id': typeof DashboardSystemRoleIdRoute
  '/component/s3-upload': typeof DashboardComponentS3UploadIndexRoute
  '/system/job': typeof DashboardSystemJobIndexRoute
  '/system/permission': typeof DashboardSystemPermissionIndexRoute
  '/system/role': typeof DashboardSystemRoleIndexRoute
  '/system/user': typeof DashboardSystemUserIndexRoute
  '/trace/session': typeof DashboardTraceSessionIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof DashboardRouteWithChildren
  '/dashboard': typeof DashboardDashboardRoute
  '/sign-in': typeof AuthenticationSignInIndexRoute
  '/sign-up': typeof AuthenticationSignUpIndexRoute
  '/fault': typeof DashboardFaultIndexRoute
  '/system/role/$id': typeof DashboardSystemRoleIdRoute
  '/component/s3-upload': typeof DashboardComponentS3UploadIndexRoute
  '/system/job': typeof DashboardSystemJobIndexRoute
  '/system/permission': typeof DashboardSystemPermissionIndexRoute
  '/system/role': typeof DashboardSystemRoleIndexRoute
  '/system/user': typeof DashboardSystemUserIndexRoute
  '/trace/session': typeof DashboardTraceSessionIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authentication': typeof AuthenticationRouteWithChildren
  '/_dashboard': typeof DashboardRouteWithChildren
  '/_dashboard/dashboard': typeof DashboardDashboardRoute
  '/_authentication/sign-in/': typeof AuthenticationSignInIndexRoute
  '/_authentication/sign-up/': typeof AuthenticationSignUpIndexRoute
  '/_dashboard/fault/': typeof DashboardFaultIndexRoute
  '/_dashboard/system/role/$id': typeof DashboardSystemRoleIdRoute
  '/_dashboard/component/s3-upload/': typeof DashboardComponentS3UploadIndexRoute
  '/_dashboard/system/job/': typeof DashboardSystemJobIndexRoute
  '/_dashboard/system/permission/': typeof DashboardSystemPermissionIndexRoute
  '/_dashboard/system/role/': typeof DashboardSystemRoleIndexRoute
  '/_dashboard/system/user/': typeof DashboardSystemUserIndexRoute
  '/_dashboard/trace/session/': typeof DashboardTraceSessionIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/dashboard'
    | '/sign-in'
    | '/sign-up'
    | '/fault'
    | '/system/role/$id'
    | '/component/s3-upload'
    | '/system/job'
    | '/system/permission'
    | '/system/role'
    | '/system/user'
    | '/trace/session'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/dashboard'
    | '/sign-in'
    | '/sign-up'
    | '/fault'
    | '/system/role/$id'
    | '/component/s3-upload'
    | '/system/job'
    | '/system/permission'
    | '/system/role'
    | '/system/user'
    | '/trace/session'
  id:
    | '__root__'
    | '/'
    | '/_authentication'
    | '/_dashboard'
    | '/_dashboard/dashboard'
    | '/_authentication/sign-in/'
    | '/_authentication/sign-up/'
    | '/_dashboard/fault/'
    | '/_dashboard/system/role/$id'
    | '/_dashboard/component/s3-upload/'
    | '/_dashboard/system/job/'
    | '/_dashboard/system/permission/'
    | '/_dashboard/system/role/'
    | '/_dashboard/system/user/'
    | '/_dashboard/trace/session/'
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
        "/_dashboard/fault/",
        "/_dashboard/system/role/$id",
        "/_dashboard/component/s3-upload/",
        "/_dashboard/system/job/",
        "/_dashboard/system/permission/",
        "/_dashboard/system/role/",
        "/_dashboard/system/user/",
        "/_dashboard/trace/session/"
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
    "/_dashboard/fault/": {
      "filePath": "_dashboard/fault/index.tsx",
      "parent": "/_dashboard"
    },
    "/_dashboard/system/role/$id": {
      "filePath": "_dashboard/system/role/$id.tsx",
      "parent": "/_dashboard"
    },
    "/_dashboard/component/s3-upload/": {
      "filePath": "_dashboard/component/s3-upload/index.tsx",
      "parent": "/_dashboard"
    },
    "/_dashboard/system/job/": {
      "filePath": "_dashboard/system/job/index.tsx",
      "parent": "/_dashboard"
    },
    "/_dashboard/system/permission/": {
      "filePath": "_dashboard/system/permission/index.tsx",
      "parent": "/_dashboard"
    },
    "/_dashboard/system/role/": {
      "filePath": "_dashboard/system/role/index.tsx",
      "parent": "/_dashboard"
    },
    "/_dashboard/system/user/": {
      "filePath": "_dashboard/system/user/index.tsx",
      "parent": "/_dashboard"
    },
    "/_dashboard/trace/session/": {
      "filePath": "_dashboard/trace/session/index.tsx",
      "parent": "/_dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
