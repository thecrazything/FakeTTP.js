import MockEntry from "./mockEntry";

export default class MockStore {
    private mDatabase : { [key:string]:MockEntry; } = {};
    private paternDb : { [key:string]:string; } = {};

    public register(method: string, path: string, entry: MockEntry) {
        if (path.indexOf('{}') >= 0) {
            this.addPattern(path)
        }
        this.mDatabase[method+':'+path] = entry;
    }

    public get(method: string, path: string) {
        const optionalPath = this.matchPattern(path)
        let entry = this.mDatabase[method+':'+path]

        if(!entry && optionalPath) {
            entry = this.mDatabase[method+':'+optionalPath]
        }

        return entry;
    }

    private addPattern(path: string) {
        //some/path/with/{}/andother/stuff turn to some\/path\/with\/([^\/]+)\/andother/stuff
        const regex = path.replace('/', '\/').replace('{}', '([^\/]+)');
        this.paternDb[regex] = path
    }

    private matchPattern(path: string) : string {
        // for each key, check if path match patterns
        for(let key in this.paternDb) {
            if(path.match(new RegExp(key))) {
                return this.paternDb[key];
            }
        }
        return null;
    }
}