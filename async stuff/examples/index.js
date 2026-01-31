let p = new Promise((resolve, reject) => {
    let a = 3;
    if (a === 2) {
        resolve('Success');
    }
    else {
        reject('Failure');
    }
})
// pending, fulfilled, or rejected states
// Then only runs when a promise is resolved. You react to the promise with then.
p.then((message) => {
    console.log(`This message is inside the then: ${message}`);
}).catch((message) => {
    console.log(`This message is inside the catch: ${message}`);
})

// promise.all => takes in an array of promises that run at the same time
// promise.race => runs as soon as the first one is completed and resolves that.

const study1 = new Promise((resolve, reject) => {
    resolve('Studied subject 1');
})
const study2 = new Promise((resolve, reject) => {
    resolve('Studied subject 2');
})
const study3 = new Promise((resolve, reject) => {
    resolve('Studied subject 3');
})
Promise.all([study1, study2, study3]).then((messages) => {
    console.log(messages);
})
Promise.race([study1, study2, study3]).then((message) => {
    console.log(message);
})

// exercise from jsinfo:
function delay(ms) {
  // your code
  promise = new Promise((resolve, reject) => {
    setTimeout(() => {
       resolve(message);
    }, ms);
    reject(Error("There was an error"));
  })
  return promise;
}
delay(3000).then(() => alert('runs after 3 seconds'));


