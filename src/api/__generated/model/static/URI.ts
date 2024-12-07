export interface URI {
    scheme: string;
    absolute: boolean;
    opaque: boolean;
    rawSchemeSpecificPart: string;
    schemeSpecificPart: string;
    rawAuthority: string;
    authority: string;
    rawUserInfo: string;
    userInfo: string;
    host: string;
    port: number;
    rawPath: string;
    path: string;
    rawQuery: string;
    query: string;
    rawFragment: string;
    fragment: string;
}
