# Arrays for React
- From what I understand you don't want to modify anything (and this is a blackbox to me right now) in the React "STATE". So that means arrays are read-only.
- Methods that are allowed include `filter`, `reduce`, `map`, `slice` and the spread syntax. `sort` is not preferred and you might want to copy the array first. `push` and `pop` are especially risky.
- arrays (and every object in JS) are passed by reference while primitive values (Number, strings (VERIFY)) are passed by value.
> In JavaScript primitive types are passed around as values: meaning that each time a value is assigned, a copy of that value is created.

> On the other side objects (including plain objects, array, functions, class instances) are references. If you modify the object, then all variables that reference that object are going to see the change.
## Spread syntax
- spread operator (...) allows you to unpack elements from an iterable (which can be a string, an array or an object). It returns a new array containing those unpacked elements. 
- It can also be used to make a shallow copy of the array. 

``` javascript
const array = [1, 2, 3];
const newArray = [...array];
// [1, 2, 3]
```
- To concatenate one array into another:
``` javascript
const array = [1, 2, 3];
const newArray = [4, 5, 6];
const joined = [...array, ...newArray];
// [1, 2, 3, 4, 5, 6]
```
- Remember that it works with any iterable, including objects
```javascript
const clonedObj = { ...obj1 };
// { foo: "bar", x: 42 }
```
- To conditionally add stuff to an array:
``` javascript
const fruits = ["apple", "banana"];
let isSummer = false;
// if it's summer unpack watermelon array otherwise unpack nothing:
const summerFruits = [...fruits, ...(isSummer ? ["watermelon"] : [])];

// ["apple", "banana", "watermelon"]
```
- Note how ... does **NOT** modify the original array, but helps create new arrays from it.

## Destructuring
- Destructuring allows you to extract values from an object (plain or array) and reassign them in a convenient way
```javascript
const foo = ["one", "two", "three"];

const [red, yellow, green] = foo;
console.log(red); // "one"
console.log(yellow); // "two"
console.log(green); // "three"

// you could even do
const [myFavNumber, ...rest] = foo;
console.log(myFavNumber); // "one"
console.log(rest); // ["two", "three"]
```
- you can even swap values using python tuple unpacking syntax.
- taking out variables from an object and using new variable names:
``` javascript
const user = {
  id: 42,
  isVerified: true,
};

const {id, isVerified} = user;
console.log(id); // 42
console.log(isVerified); // true

// giving new variable names
const {id: myId, isVerified: myVerification} = user;
console.log(myId); // 42
console.log(myVerification); // true
```
- Skipping values in destructuring:
```javascript
// in arrays you could do this -
const myArray = [1, 2, 3];
const [, , third] = myArray;
console.log(third); // 3

// but in objects you simply don't mention the values you don't want; you can't "skip" values
const myObj = {id: 1, name: "John", lastName: "Doe", favFood: "pizza"};
const {id, name, lastName} = myObj;
console.log(`${name} ${lastName}`); // John Doe

// also, if you're modifying a property and keeping everything else the order matters. Modify properties at the end.
const newObj = { ...myObj, id: id + 100 }; 
```


