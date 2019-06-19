const fetch = require("node-fetch");
const sha1 = require("sha1");
const prompt = require("prompt");

prompt.start();

const schema = {
  properties: {
    password: {
      hidden: true
    }
  }
};

prompt.get(schema, function(err, result) {
  const password = result.password;

  const sha1Password = sha1(password).toUpperCase();
  const firstFive = sha1Password.substring(0, 5);
  const lastPart = sha1Password.substring(5, sha1Password.length);

  const url = "https://api.pwnedpasswords.com/range/" + firstFive;

  fetch(url)
    .then(res => res.text())
    .then(passwordList => {
      passwordList.split(/\r?\n/).forEach(element => {
        if (lastPart === element.substring(0, element.indexOf(":"))) {
          console.log("HIT!");
          console.log(
            element.substring(element.indexOf(":") + 1, element.length)
          );
        }
      });
    });
});
