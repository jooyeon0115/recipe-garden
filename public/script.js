let lastRecipe = ""; // 마지막 AI 레시피 저장용

async function getRecipe() {
  const ingredients = document.getElementById("ingredients").value;
  const resultDiv = document.getElementById("result");
  const saveBtn = document.getElementById("saveToGarden");

  // AI 레시피 진행 중 메시지
  resultDiv.innerText = "🌱 레시피를 키우는 중입니다...";
  saveBtn.style.display = "none";

  try {
    const response = await fetch("http://localhost:3000/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients })
    });

    const data = await response.json();
    lastRecipe = data.recipe; // 마지막 레시피 저장
    resultDiv.innerText = data.recipe;

    // 카드 안에 버튼 추가
    saveBtn.style.display = "block"; // AI 레시피 나오면 버튼 표시
  } catch (error) {
    resultDiv.innerText = "⚠️ AI 레시피 생성 실패";
  }
}

// 정원에 저장 함수
function saveToGarden() {
  if (!lastRecipe) return alert("저장할 레시피가 없습니다 🌱");

  const recipes = JSON.parse(localStorage.getItem("myGarden") || "[]");
  recipes.push(lastRecipe);
  localStorage.setItem("myGarden", JSON.stringify(recipes));

  alert("🌿 레시피가 정원에 저장되었습니다!");
}
