// 로컬스토리지에 레시피 저장 및 불러오기

const gardenList = document.getElementById("gardenList");

function loadGarden() {
  const recipes = JSON.parse(localStorage.getItem("myGarden") || "[]");
  gardenList.innerHTML = "";
  recipes.forEach((r, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <pre>${r}</pre>
      <button onclick="deleteRecipe(${index})">삭제 ❌</button>
    `;
    gardenList.appendChild(div);
  });
}

function saveRecipe() {
  const newRecipe = document.getElementById("newRecipe").value;
  if (!newRecipe) return alert("레시피를 입력해주세요 🌱");

  const recipes = JSON.parse(localStorage.getItem("myGarden") || "[]");
  recipes.push(newRecipe);
  localStorage.setItem("myGarden", JSON.stringify(recipes));
  document.getElementById("newRecipe").value = "";
  loadGarden();
}

function deleteRecipe(index) {
  const recipes = JSON.parse(localStorage.getItem("myGarden") || "[]");
  recipes.splice(index, 1);
  localStorage.setItem("myGarden", JSON.stringify(recipes));
  loadGarden();
}

// 페이지 로드 시 자동 불러오기
loadGarden();
