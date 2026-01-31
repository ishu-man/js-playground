A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action. 

```javascript
myDiv.addEventListener("click", function(){
  // function is a callback here.
})
```

I am stuck on this line but I think this is important, [source](https://github.com/max-mapper/art-of-node#callbacks)
>The key to understanding callbacks is to realize that they are used when you don't know **when** some async operation will complete, but you do know **where** the operation will complete, the last line of the async function.

Also, there is something known as a callback hell where you have a function calling another function which calls another function which calls.. you know the drill, nested functions.
***
## Promises
A promise is a JavaScript object that essentially acts as an "I owe you". They are objects that *might* produce a value sometime in the future. It's literally a promise to return some information to the program.
The constructor syntax for a promise object is:

```javascript
let promise = new Promise(function(resolve, reject) {
	// executor
});
```

The function passed to `new Promise` is called the _executor_. When `new Promise` is created, the executor runs automatically. It contains the producing code which should eventually produce the result. 
Executor runs automatically and attempts to perform a job. When it is finished with the attempt, it calls `resolve` if it was successful or `reject` if there was an error. Both of those are predefined JS functions.

**.then**'s first argument is a function that runs when the promise is resolved and receives the result. It essentially allows you to react to the promise. The `then` callback is triggered when the promise is resolved.  You can also chain then method callbacks.
The second argument is a function that runs when the promise is rejected and receives the error. 
`.catch(f)` is same as `promise.then(null, f)`. It is executed when the promise is rejected.

The idea of `finally` is to set up a handler for performing cleanup/finalizing after the previous operations are complete.
The main advantage of promises over callbacks is that they allow us to do things naturally - first I `load(something)` and `.then` I write something to the result instead of `load(something, callback)` where I must know what to do with the result before I know what it is.

>**This ties in with the `fetch` API**
>`fetch()` returns a promise with a `Response` object for a valid URL. As it turns out, when you do `promise.json()` you get another promise which when resolved gives you the JSON data itself. This is something known as _promise chaining_ - you would first `fetch` something, and `.then` get the response and feed it to `.json()` and `.then` you get the final JSON. 

Look into my code example for this for `Promise.all()` and `Promise.race()`.
***
# The JavaScript Event Loop
JS is a single threaded programming language which means that it's got a single call stack - only a single thing can run at a time - if not for the webapis!
The call stack is basically a data structure that records where in the program you are. It is a stack for function calls. Blocking the call stack means writing synchronous calls that might take forever, like network requests.

How does the event loop interact with a web API like `settimeout`?
Essentially, when a line of code executes, there's this thing known as the mighty event loop, which from my python async knowledge is an infinite loop that looks for tasks to be executed. When I call `settimeout`, the **task queue** or the **callback queue** gets fed the call.

_The event loop's job is to look at the task queue and look at my call stack. If my stack is empty, it takes the first thing on the queue and pushes it to the stack._ 

`settimeout` is a callback based API - so it enters the task queue. The task queue holds web API callbacks and event handlers to be executed sometime in the future.
The `timer` would be handled by the browser, so 1, 2, 3, 4, 5... if the call stack was empty, you `settimeout` executes. 
Thus, the time you put in there is not definite - it's simply the time it takes for it to go from the task queue to the call stack, which may be larger or smaller than what you've fed it based on what the call stack holds right now. Maybe you wrote some other code that could slow this down.
By the way, this is what `settimeout(0)` does - it defers execution until the stack is clear. Do you get it? Try this:
```javascript
console.log('This is the start');
settimeout( () => {
	console.log('This is inside the settimeout');
}5000);
console.log('This is the end');
```
The output would be:
```Terminal
This is the start // top to bottom execution
This is the end
This is inside the settimeout
```
See how clever that was? The event loop sent the callback inside the task (or callback) queue and executed the rest of the code. When the call stack was finally empty, we got our result.
>Try [this tool](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D) for visualising the JS runtime. It's excellent!

Building on my previous definition of a callback, here we are more concerned with asynchronous callbacks instead of synchronous ones.

**Microtask queue**
`fetch` is a promise based web API which menas that it uses the microtask queue which gets *higher* priority than the task queue by the event loop. Examples of stuff that ends up in the microtask queue - good old `then` `catch` `finally`.

The microtask queue is reserved for asynchronous calls and promise based APIs while the task queue is reserved for callback based APIs - like `settimeout`.
***
# Async and Await
The `async` keyword before a function has two effects:
1. Makes it always return a promise.
2. Allows `await` to be used in it.
So, when a function is declared with `async`, it automatically returns a promise; returning in an `async` function is the same as resolving a promise. Likewise, throwing an error will reject the promise.

The `await` keyword before a promise makes JavaScript wait until that promise settles, and then:
3. If it’s an error, an exception is generated — same as if `throw error` were called at that very place. Using `try catch` is recommended. If you're not doing that you can just `catch` an error from a promise returned by the function itself.
4. Otherwise, it returns the result.

Together they provide a great framework to write asynchronous code that is easy to both read and write.

With `async/await` we rarely need to write `promise.then/catch`, but we still shouldn’t forget that **they are just promises written in a different way** (_syntactic sugar_), because sometimes (e.g. in the outermost scope) we have to use these methods. To resolve multiple promises you can just `await` a `Promise.all()`.

## Error Handling strategies for async and await
`try` and `catch` are good, but another way to handle errors is to create a higher order function and feed it your current function and using both create a new function that is a "safer" version of your old function. Here's how the code for that looks:
```javascript
function handleErorrs() {
	return function(request, response, next) {
		return function(request, response, next).catch(next);
	}
}
const safeFunction = handleErors(unsafeFunction);
safeFunction();
```
You can also chain a `.catch()` at the end like you would do in normal code.
***
>**NOTE**: Most, if not all, of this is based on my understanding of the assignments/readings from the Odin project.