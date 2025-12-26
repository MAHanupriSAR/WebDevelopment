``` javascript
const p1 = fetch("https://api.github.com/users");
// code1
p1.then(()=>{
    console.log(p1);
})
// code2
p1.then((response)=>{
    console.log(response);
})
```


# Difference between code1 and code 2

## 1. The "Box vs. Gift" Analogy

Think of a Promise (p1) as a delivery box. Think of the response argument as the gift inside the box.

`console.log(p1)`: You are looking at the Box.

The box has labels like "State: Fulfilled" and "Result: Response Object".
You cannot "eat" the box or "wear" the box. It is just a container.

`console.log(response)`: You are looking at the Gift.

You have taken the item out of the box. You can now use it directly.

## 2. You cannot access data properties on p1
This is the most practical reason. p1 is a generic Promise object. It does not have the properties of the data you fetched.

The fetch API returns a Response object. This object has methods like .json(), .text(), and properties like .status.

If you try to access these on p1, it will fail:
``` javascript
const p1 = fetch("https://api.github.com/users");

p1.then((response) => {
    // ✅ CORRECT: 'response' is the actual data object
    console.log(response.status); // Prints: 200
    
    // ❌ WRONG: 'p1' is just the Promise wrapper
    console.log(p1.status);       // Prints: undefined
});
```


What it means is
`p1` is a promise.
If `p1` gets completed then execute the callback function(which we passed as argument in the `then` function). The callback function takes a argument `respoonse` and puts the 'gift'(which is inside the box `p1`) into `response`.