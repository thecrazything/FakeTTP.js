import MockEntry from './mockEntry';
import RequestMocker from './rockit';
import MockStore from './mockStore';

export default class RockitBuilder {
    private mockStore = new MockStore();

    private onFail : (error: Error) => void = null;

    constructor (options : any = null) {
        if (options) {
            if (options.onFail) {
                this.onFail = options.onFail;
            }
        }
    }

    public build() {
        return new RequestMocker(this.mockStore, this.onFail);
    }

    public onGet(path : string) : MockEntry {
        let mockEntry = new MockEntry(path, this.onFail);
        this.mockStore.register('GET', path, mockEntry)
        return mockEntry;
    }

    public onPost(path : string) : MockEntry {
        let mockEntry = new MockEntry(path, this.onFail);
        this.mockStore.register('POST', path, mockEntry)
        return mockEntry;
    }

    public onPut(path : string) : MockEntry {
        let mockEntry = new MockEntry(path, this.onFail);
        this.mockStore.register('PUT', path, mockEntry)
        return mockEntry;
    }

    public onDelete(path : string) : MockEntry {
        let mockEntry = new MockEntry(path, this.onFail);
        this.mockStore.register('DELETE', path, mockEntry)
        return mockEntry;
    }

    public onPatch(path : string) : MockEntry {
        let mockEntry = new MockEntry(path, this.onFail);
        this.mockStore.register('PATCH', path, mockEntry)
        return mockEntry;
    }
}