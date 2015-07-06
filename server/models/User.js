import thinky from 'thinky';

var User = thinky().createModel("User", {
    id: String,
    name: String,
    email: String
})

export default User;
