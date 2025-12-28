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

-----

# Another Concept

``` javascript
const orderDetail = {
    cost: 520,
    items: ["biryani", 'pani puri', 'pizza'],
    customer_name: "Rohit",
    customer_location: "Dwarka",
    restaurant_name: "Dominos",
};

function placeOrder(orderDetail, Callback) {
    console.log(`Processing the payment of ${orderDetail.cost}`);

    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log("Payment completed and Order is placed");
            orderDetail.paymetStatus = true;
            resolve(orderDetail);
        }, 3000);
    })

    // setTimeout(() => {
    //     console.log("Payment completed and Order is placed");
    //     orderDetail.paymetStatus = true;
    //     return new Promise((resolve,reject)=>{resolve(orderDetail)});
    // }, 3000);

}

function preparingOrder(orderDetail, Callback) {
    console.log(`Your Order is getting Prepared ${orderDetail.items}`);

    setTimeout(() => {
        console.log("Your Order is prepared");
        orderDetail.token = "10";
        Callback(orderDetail);
    }, 3000);
}

function pickupOrder(orderDetail, Callback) {
    console.log(`Delivery partner is on the way to pickup the order from ${orderDetail.restaurant_name}`);

    setTimeout(() => {
        console.log("I have picked up your order");
        orderDetail.pickup = true;
        Callback(orderDetail);
    }, 3000);
}

function deleiverOrder(orderDetail) {
    console.log(`I am on my way to deliver the order ${orderDetail.customer_location}`);

    setTimeout(() => {
        console.log("Your order is delivered successfully");
        orderDetail.delivery = true;
    }, 1000);
}


// placeOrder(orderDetail)
// .then((orderDetail)=>preparingOrder(orderDetail))
// .then((orderDetail)=>pickupOrder(orderDetail))
// .then((orderDetail)=>deleiverOrder(orderDetail))
placeOrder(orderDetail).then((response)=>{
    console.log(response)
})
```

in the above code, 
why did we do 

``` javascript
//code1
return new Promise((resolve,reject)=>{
    setTimeout(() => {
        console.log("Payment completed and Order is placed");
        orderDetail.paymetStatus = true;
        resolve(orderDetail);
    }, 3000);
})
```

and not do

``` javascript
//code2
setTimeout(() => {
    console.log("Payment completed and Order is placed");
    orderDetail.paymetStatus = true;
    return new Promise((resolve,reject)=>{resolve(orderDetail)});
}, 3000);
```

## 1 The Return Problem:
When you chain functions using .then(), the previous function must return a Promise object immediately.

in code 1, 

``` javascript
function placeOrder(orderDetail) {
    // 1. A Promise object is created immediately.
    return new Promise((resolve, reject) => {
        // 2. The timer is set inside the promise
        setTimeout(() => {
            resolve(orderDetail);
        }, 3000);
    });
    // 3. This Promise is returned to the main code IMMEDIATELY.
}
```

Because placeOrder returns a Promise object right away, the code placeOrder(orderDetail).then(...) works perfectly. The .then() attaches to that returned Promise.

in code 2

``` javascript
function placeOrder(orderDetail) {
    // 1. You set a timer.
    setTimeout(() => {
        // 3. (3 seconds later) This runs. 
        // Even if you return a Promise here, WHERE does it go? 
        return new Promise((resolve) => { resolve(orderDetail) }); 
    }, 3000);

    // 2. The function execution reaches here immediately.
    // Since there is no return statement in the main scope...
    // IT RETURNS "undefined".
}
```

If you try to run this: placeOrder(orderDetail).then(...)

JavaScript sees: undefined.then(...)

Result: Uncaught TypeError: Cannot read properties of undefined (reading 'then')

## 2. The `setTimeout` void
The setTimeout function is a browser API. It takes a callback function and puts it in a queue to run later. It does not care what that callback function returns.

If you return a value (or a Promise) from inside a setTimeout callback, that return value goes nowhere. It is lost into the "void" of the JavaScript runtime environment. No other part of your code can access it.

## 3. Visualising the Container
Think of a Promise as a "shipping container" or an "envelope."

Correct Way: You create the envelope (Promise) first. You put the work (setTimeout) inside the envelope. You hand the envelope to the user immediately. When the work is done, the envelope status changes to "Resolved."

Your Way: You tell the worker (setTimeout) to wait 3 seconds. You walk away empty-handed (return undefined). 3 seconds later, the worker creates an envelope and holds it up, but no one is there to take it.