var MeticulousUser = (function () {
    function MeticulousUser(userName) {
        this.userName = userName;
        this.visits = 0;
    }
    MeticulousUser.prototype.showUser = function () {
        alert(this.userName);
        return true;
    };
    Object.defineProperty(MeticulousUser.prototype, "email", {
        get: function () {
            return this.userEmail;
        },
        set: function (val) {
            this.userEmail = val;
        },
        enumerable: true,
        configurable: true
    });
    return MeticulousUser;
}());
//# sourceMappingURL=meticuloususer.js.map