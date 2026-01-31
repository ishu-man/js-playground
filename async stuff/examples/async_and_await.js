// jsinfo exercises
loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404


// task two:
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson(url) {
    let response = await fetch(url); // if this were axios we would not have to attach an if block for the status
    if (response.status == 200) {
        return response.json(); // this is a promise
    }
    else {
        throw new Error(response.status);
    }
}

// Ask for a user name until github returns a valid user
async function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");
  let user;
  while (true) {
        try {
            user = await loadJson(`https://api.github.com/users/${name}`);
            break;
        } catch (error) {
            alert("No such user, please reenter.");
        }
    }
    window.alert(`Full name: ${user.name}.`);
}

demoGithubUser();

// task three:
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
  // well async functions return a promise so .then is still valid
  console.log(wait().then(returnValue));
}
