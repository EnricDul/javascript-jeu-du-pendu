const tab = ["D", "E", "V", "I", "N", "E", "R"];

let letter;
let usedLetters = [];

const inputLetter = document.getElementById("inputLetter");
const tagEmptyTab = document.querySelector(".emptyTab");
const tagUsedLetters = document.querySelector(".usedLetters");

let emptyTab = [];
tab.forEach(() => emptyTab.push("_"));

// On stock les lettres utiliser par l'utilisateur
const stockVal = letter => {
  if (!usedLetters.includes(letter)) {
    usedLetters.push(letter);
  }
};

// Mise à jour des valeurs dans les balises html
const updateTag = () => {
  tagEmptyTab.innerHTML = emptyTab.join(" - ");
  tagUsedLetters.innerHTML = usedLetters.join(", ");
};

// Vérification de réussite
const verifyWord = () => {
  if (tab.join("") === emptyTab.join("")) alert("Bravo");
};

/*Fonction :
- Itérer dans lettre
- Si lettre deviner se trouve dans le mot
- If (yes) changer guessLetter pour ajouter lettre devniée au bon index
*/
const guessLetter = () => {
  letter = inputLetter.value.toUpperCase();

  if (letter !== "") {
    // Reset input
    inputLetter.value = "";

    // On stock la valeur
    stockVal(letter);
    console.log(usedLetters);

    // Verification de la lettre dans le tableau
    for (i = 0; i < tab.length; i++) {
      if (letter === tab[i]) {
        emptyTab[i] = letter;
      }
    }

    updateTag();

    // Vérification réussite
    verifyWord();
  }
};

document
  .getElementById("run")
  .addEventListener("click", () => (guessLetter(), false));

// Press enter to submit
Array.from(document.querySelectorAll("input")).map(input => {
  const type = input.getAttribute("type");
  if (type && type !== "submit") {
    input.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        e.preventDefault();
        const submit = input.parentElement.querySelector('[type="submit"]');
        if (submit) submit.click();
      }
    });
  }
});

// INIT les valeurs dans les balises html
updateTag();
