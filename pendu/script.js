let words = [];

let letter, tab, canvas, ctx;
let usedLetters = [];
let emptyTab = [];

// Essaies
const nbTry = 6;
let counterTry = nbTry;

// HTML TAGS
const inputLetter = document.getElementById("inputLetter");
const tagEmptyTab = document.querySelector(".emptyTab");
const tagUsedLetters = document.querySelector(".usedLetters");
const tagCountTry = document.querySelector(".countTry");

// On stock les lettres utiliser par l'utilisateur
const stockVal = letter => {
  if (!usedLetters.includes(letter)) {
    usedLetters.push(letter);
  }
};

// Mise à jour des valeurs dans les balises html
const updateTag = () => {
  tagEmptyTab.innerHTML = emptyTab.join(" ");
  tagUsedLetters.innerHTML = usedLetters.join(", ");
  tagCountTry.innerHTML = counterTry;
};

const reset = () => {
  counterTry = nbTry;
  emptyTab = [];
  usedLetters = [];

  // generer un nouveau mot
  initWord();
  updateTag();
};

// Vérification de réussite
const verifyWord = () => {
  if (counterTry <= 0) {
    alert("Vous avez perdu ! \n Le mot était " + tab.join(""));
    reset();
  } else if (tab.join("") === emptyTab.join("")) {
    alert("Bravo");
    reset();
  }
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
    let verify = false;
    for (i = 0; i < tab.length; i++) {
      if (letter === tab[i]) {
        verify = true;
        emptyTab[i] = letter;
      }
    }

    if (!verify) counterTry--;

    updateTag();

    // Vérification réussite
    verifyWord();
  }
};

const getWordsFromFile = () => {
  // On prend tous les mots du fichier
  return new Promise(resolve => {
    fetch("liste_francais.txt").then(response => {
      response.text().then(text => {
        text.split("\n").map(x => {
          // Récuperer les mots sans accents
          x = x.replace(/\n|\r/g, "");
          if (/^[a-z]+$/i.test(x)) words.push(x);
        });

        resolve(words);
      });
    });
  });
};

const initWord = () => {
  let randomNb = Math.floor(Math.random() * Math.floor(words.length));
  tab = words[randomNb].toUpperCase().split("");
  console.log(tab);
  tab.forEach(() => emptyTab.push("_"));
};

const initCanvas = () => {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  console.log(canvas);
  console.log(ctx);

  ctx.fillStyle = "green";
};

/**
 * DOCUMENT READY
 */
(async () => {
  // Lorsqu'on clique sur le bouton
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

  // On attend de récupérer les mots du fichier
  await getWordsFromFile();

  // INIT les valeurs dans les balises html
  initWord();
  initCanvas();
  updateTag();
})();
