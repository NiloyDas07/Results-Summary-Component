async function fetchData() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    // returns undefined
  }
}

fetchData().then((data) => {
  if (data === undefined) {
    console.log("No data");
  }

  const summaryStats = document.querySelector(".summary-stats");

  let totalScore = 0;

  data.forEach((stat) => {
    totalScore += stat.score;

    const summaryStatElement = document.createElement("div");
    summaryStatElement.classList.add("summary__stats__element");
    summaryStats.appendChild(summaryStatElement);

    const icon = document.createElement("img");
    icon.src = stat.icon;
    icon.className = `${stat.category}-icon`;
    icon.alt = stat.category;

    const category = document.createElement("p");
    category.textContent = stat.category;
    category.className = `${stat.category}-category`;

    const score = document.createElement("p");
    score.textContent = stat.score;
    score.className = `scores`;

    summaryStatElement.append(icon, category, score);
  });
  totalScore = Math.floor(totalScore / data.length);

  document.querySelector(".total-score").textContent = totalScore;
});
