import MockEntry from './mockEntry';
import MockStore from './mockStore';

export default class rockit {
    private mockStore : MockStore;
    private onFail: (error: Error) => void;

    constructor (mockStore : MockStore, onFail: (error: Error) => void) {
        this.mockStore = mockStore;
        this.onFail = onFail;
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
        try {
            const response = this.mockStore.get(method, path).buildResponse(request);
            if ((!response || !response.response) && this.onFail) {
                this.onFail(new Error(method+path+' No response, make sure the response method actually returns the response.'));
            }
            return response;
        } catch(e) {
            if (this.onFail) {
                this.onFail(e);
            } else {
                throw e;
            }
        }
    }
}