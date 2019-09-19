const tab = [
  'D',
  'E',
  'V',
  'I',
  'N',
  'E',
  'R'
];
let letter;
let emptyTab = new Array();
let stockTab = new Array();
let stock = new Array();

/*Fonction :
- Itérer dans lettre
- Si lettre deviner se trouve dans le mot
- If (yes) changer guessLetter pour ajouter lettre devniée au bon index
*/
function guessLetter() {
  letter = prompt("Encodez une lettre pour deviner le mot");
  for (i = 0; i < tab.length; i++) {
    if (letter == tab[i]) {
      emptyTab[i] = letter;
    }
  }

}

function stockVal(letter) {
  letter
}
while (JSON.stringify(tab) != JSON.stringify(emptyTab)) {
  guessLetter();
}
alert(emptyTab);
alert("bravo");