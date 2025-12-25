const quotes = [
  "It always seems impossible until it's done.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Discipline is doing what needs to be done, even if you don't want to do it.",
  "The only way to do great work is to love what you do.",
  "Action is the foundational key to all success.",
  "Don’t count the days, make the days count.",
  "Your limitation—it’s only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The harder you work, the greater you’ll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don’t stop until you’re proud.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for.",
  "Little things make big days.",
  "It’s going to be hard, but hard does not mean impossible.",
  "Don’t wait for opportunity. Create it.",
  "Sometimes later becomes never. Do it now.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it."
];

function getRandomIndex(){
    return Math.floor(Math.random() * 20);
}

quote_txt = document.getElementById("quote_txt");
quote_txt.textContent = quotes[getRandomIndex()];

generateBtn = document.getElementById("btn");
generateBtn.addEventListener("click",()=>{
    quote_txt.textContent = quotes[getRandomIndex()];
})