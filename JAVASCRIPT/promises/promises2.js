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