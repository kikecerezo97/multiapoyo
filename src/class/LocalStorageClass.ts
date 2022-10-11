export class LocalStorageClass {
    // key Name
    public TOKEN = 'TOKEN';


    constructor() {
    }

    public setSomeString(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public getSomeString(key: string): string {
        return <string>localStorage.getItem(key);
    }

    public setSomeBoolean(key: string, value: boolean): void {
        localStorage.setItem(key,  value + '');
    }


    public  getSomeBoolean(key: string): boolean {
        if (localStorage.getItem(key) == 'true'){
            return true;
        }
        return  false;

    }


}

