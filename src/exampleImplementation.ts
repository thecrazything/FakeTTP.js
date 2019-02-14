import {Rockit} from "./index";

export default class ExampleImplementation {
    private mocker: Rockit;

    constructor (mocker: Rockit) {
        this.mocker = mocker;
    }

    public get (path: string) : Promise<any> {
        return this.buildPromise(this.mocker.get(path));
    }

    public post (path: string, data: any) : any {
        return this.buildPromise(this.mocker.post(path, data));
    }

    public put (path: string, data: any) : any {
        return this.buildPromise(this.mocker.put(path, data));
    }

    public patch (path: string, data: any) : any {
        return this.buildPromise(this.mocker.patch(path, data));
    }

    public delete (path: string) : any {
        return this.buildPromise(this.mocker.delete(path));
    }

    private buildPromise(response): Promise<any> {
        return new Promise((resolve, reject) => {
            if(response.status === 200) {
                resolve(response.response);
            } else {
                response.response.$status = response.status;
                reject(response.response)
            }
        });
    }
}