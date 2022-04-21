console.log("tu sam");

let polje = [
  { username: "Markić", odigrano: [], bodovi: 0 },
  { username: "Darkić", odigrano: [], bodovi: 0 },
  { username: "Farkić", odigrano: [], bodovi: 0 },
  { username: "dankic", odigrano: [], bodovi: 0 },
  { username: "asss", odigrano: [], bodovi: 0 },
  { username: "abc", odigrano: [], bodovi: 0 },
  { username: "bankić", odigrano: [], bodovi: 0 },
  { username: "šarkić", odigrano: [], bodovi: 0 },
];
let parovi = [];
function dodajBodove(ime, bod) {
  let Iplayer1 = polje.findIndex((a) => a.username === ime);
  polje[Iplayer1].bodovi += bod;
}
function compare(a, b) {
  if (a.bodovi > b.bodovi) {
    return -1;
  }
  if (a.bodovi < b.bodovi) {
    return 1;
  }
  return 0;
}
spariIgrace();
dodajBodove("Markić", 3);
dodajBodove("Farkić", 3);
dodajBodove("asss", 3);
dodajBodove("bankić", 3);
polje.sort(compare);
spariIgrace();
dodajBodove("Markić", 3);
dodajBodove("asss", 3);
dodajBodove("šarkić", 3);
dodajBodove("abc", 3);
polje.sort(compare);
spariIgrace();
dodajBodove("Markić", 3);
dodajBodove("asss", 3);
dodajBodove("šarkić", 3);
dodajBodove("abc", 3);
polje.sort(compare);
spariIgrace();

console.log(polje);
console.log(parovi);

function spariIgrace() {
 
  let player22 = { username: "", odigrano: [] };
  let pomPlayeri = [...polje];

  while (pomPlayeri.length !== 0) {
    let vrati = [];
    let player11 = pomPlayeri.shift();
    do {
      if (pomPlayeri.length === 0) {
        break;
      }
      player22 = pomPlayeri.shift();
      vrati.push(player22);
    } while (player11.odigrano.some((player) => player === player22.username));
    vrati.pop();
    pomPlayeri.unshift(...vrati);

    let Iplayer1 = polje.findIndex((a) => a.username === player11.username);
    let Iplayer2 = polje.findIndex((a) => a.username === player22.username);
    polje[Iplayer1].odigrano.push(player22.username);
    polje[Iplayer2].odigrano.push(player11.username);
    parovi.push({ player1: player11.username, player2: player22.username });
  }
}
