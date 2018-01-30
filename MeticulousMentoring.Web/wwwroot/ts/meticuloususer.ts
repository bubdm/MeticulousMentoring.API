class MeticulousUser {
    constructor(private userName:string) {
       
    }

    public visits: number = 0;
    private userEmail: string;

    public showUser() {
        alert(this.userName);
        return true;
    }

    set email(val) {
        this.userEmail = val;
    }

    get email() {
        return this.userEmail;
    }
}

