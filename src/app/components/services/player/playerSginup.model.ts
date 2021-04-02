export class playerSignup {
    constructor(
        public playerName: String,
        public playerPhone:string,
        public location: String,
        public password:string,
        public repeatPassword: String
    ){}
}
export class Errors {
    msg : string 
}