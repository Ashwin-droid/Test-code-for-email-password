const vault = require("simple-and-secure-email-password");

const main = async () => {
const email = "example@example.com";
const password = "Passw0rd123";

const secureStore = vault.init(
    {
        "memcost": 8192, //optional (In KiB) per thread
        "threadcost": 2, //optional (default: 2) threads to use for hashing.
        "projectSalt": "TopSecretSaltForCompany" // required (Should be same for the project)
    }
);

// DB simulation

const newuser = await secureStore.signup(email, password);
const newuser2 = await secureStore.signup("example.123AAA@example.com", password+"njojtyouj44!@#");

console.log(JSON.stringify(newuser));
console.log(JSON.stringify(newuser2));
console.log(JSON.stringify(secureStore.getmail(email)));
const user = await secureStore.lookup([newuser, newuser2], email);
console.log(JSON.stringify(user));
console.log(JSON.stringify(await secureStore.verify(email, password, user.passwordHash)));
console.log(JSON.stringify(await secureStore.verify(email, "wrong password", user.passwordHash)));

};
main();
