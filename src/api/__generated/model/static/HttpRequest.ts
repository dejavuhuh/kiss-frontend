export interface HttpRequest {
    url: string;
    method: string;
    headers: {[key:string]: string};
    query: {[key:string]: string};
    body?: string | undefined;
}
