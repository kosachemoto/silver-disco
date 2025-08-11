export class Route {
    private _path: string;

    constructor(path: string) {
        this._path = path;
    }

    get path() {
        return this._path;
    }
}
