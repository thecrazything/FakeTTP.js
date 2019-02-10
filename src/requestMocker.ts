import MockEntry from './mockEntry';

export default class RequestMocker {
    private mDatabase : { [key:string]:MockEntry; } = {};

    constructor (database : { [key:string]:MockEntry; } = {}) {
        this.mDatabase = database;
    }

    public get (path: string) : any {
        return this.buildResponse("GET", path);
    }

    public post (path: string, data: any) : any {
        return this.buildResponse("POST", path, data);
    }

    public put (path: string, data: any) : any {
        return this.buildResponse("PUT", path, data);
    }

    public patch (path: string, data: any) : any {
        return this.buildResponse("PATCH", path, data);
    }

    public delete (path: string) : any {
        return this.buildResponse("DELETE", path);
    }

    private buildResponse(method: string, path: string, request: any = null) {
        return this.mDatabase[method + ":" + path].buildResponse(request);
    }
}