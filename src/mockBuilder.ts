import MockEntry from './mockEntry';
import RequestMocker from './requestMocker';

export default class MockBuilder {
    private mDatabase : { [key:string]:MockEntry; } = {};

    private onFail : (error: Error) => void = null;

    constructor (onFail: (error: Error) => void = null) {
        this.onFail = onFail;
    }

    public build() {
        return new RequestMocker(this.mDatabase);
    }

    public onGet(path : string) : MockEntry {
        let mockEntry = new MockEntry(path, this.onFail);
        this.mDatabase['GET:'+path] = mockEntry
        return mockEntry;
    }

    public onPost(path : string) : MockEntry {
        let mockEntry = new MockEntry(path, this.onFail);
        this.mDatabase['POST:'+path] = mockEntry
        return mockEntry;
    }

    public onPut(path : string) : MockEntry {
        let mockEntry = new MockEntry(path, this.onFail);
        this.mDatabase['PUT:'+path] = mockEntry
        return mockEntry;
    }

    public onDelete(path : string) : MockEntry {
        let mockEntry = new MockEntry(path, this.onFail);
        this.mDatabase['DELETE:'+path] = mockEntry
        return mockEntry;
    }

    public onPatch(path : string) : MockEntry {
        let mockEntry = new MockEntry(path, this.onFail);
        this.mDatabase['PATCH:'+path] = mockEntry
        return mockEntry;
    }
}