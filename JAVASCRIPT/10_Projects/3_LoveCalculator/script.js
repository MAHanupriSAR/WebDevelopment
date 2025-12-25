function calculateNameSimilarity(name1, name2) {
    const s1 = name1.toLowerCase().trim();
    const s2 = name2.toLowerCase().trim();

    if (s1 === s2) return 100.0;
    if (s1.length === 0 || s2.length === 0) return 0.0;

    const matrix = [];
    for (let i = 0; i <= s1.length; i++) {
    matrix[i] = [i];
    }
    for (let j = 0; j <= s2.length; j++) {
    matrix[0][j] = j;
    }

    for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
        const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
        );
    }
    }
    const distance = matrix[s1.length][s2.length];

    const maxLength = Math.max(s1.length, s2.length);
    const similarity = ((maxLength - distance) / maxLength) * 100;

    return `${similarity.toFixed(2)}%`;
}

const btnContainer = document.getElementById("btns");
const form = document.querySelector("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const name1 = data.get("name1");
    const name2 = data.get("name2");

    if(!name1 || !name2){
        alert("Names can't be empty");
        return;
    }

    const similarity = calculateNameSimilarity(name1,name2);
    const scoreDiv = document.getElementById("score");
    if(!scoreDiv){
        const score = document.createElement("div");
        score.id = "score";
        score.textContent = "Chance of liking: "
        score.textContent += similarity;
        btnContainer.before(score);
    }
    else{
        scoreDiv.textContent = "Chance of liking: "
        scoreDiv.textContent += similarity;
    }

    if(!document.getElementById("reset_btn")){
        const resetBtn = document.createElement("button");
        resetBtn.type = "reset";
        resetBtn.textContent = "Reset";
        resetBtn.id = "reset_btn"
        btnContainer.append(resetBtn);
    }
})

form.addEventListener("reset", () => {
    const score = document.getElementById("score");
    const resetBtn = document.getElementById("reset_btn");
    if (score) score.remove();
    if (resetBtn) resetBtn.remove();
});