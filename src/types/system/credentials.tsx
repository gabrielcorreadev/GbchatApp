export class Credentials {
    constructor(
        public email: string,
        public password: string,
        public device_name: string,
        public lat: number,
        public lng: number
    ) { }
}