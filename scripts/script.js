const lista = document.getElementById("lista");
const widgetJanela = document.getElementById("widget");

console.log(pokemons[0].nome);
renderPoke();

function renderPoke() {
  // Para cada pokemon da lista "pokemons"
  for (poke of pokemons) {
    lista.innerHTML += `
    <li class="list-pokemon__item">
    <div class="sprite">
    <img
    src="${poke.src}"
    alt="${poke.nome}"
    id="poke"
    class="img"
    />
    </div>
    <p class="poke-name">${poke.nome}</p>

    <div class="desc none">
      <p>${poke.descricao}</p>
    </div>
    
    <div class="stats none">
    <p class="hp">HP: ${poke.hp}</p>
    <p class="attack">Attack: ${poke.ataque}</p>
    <p class="defense">Defense: ${poke.defesa}</p>
    <p class="speed">Speed: ${poke.velocidade}</p>
    </div>
    
    <div class="type none">
    <p class="type">Type: ${poke.tipo}</p>
    </div>
    </li>
    `;
  }

  const itemLista = document.querySelectorAll("#poke");
  itemLista.forEach((item) => {
    item.addEventListener("click", (e) => {
      const pokemonSelecionado = e.target.parentNode.parentNode;
      pokeWindow(pokemonSelecionado);
    });
  });
}

function pokeWindow(pokemonSelecionado) {
  const img = pokemonSelecionado.querySelector(".img");
  const nome = pokemonSelecionado.querySelector(".poke-name").textContent;
  const descricao = pokemonSelecionado.querySelector(".poke-name").textContent;

  // Esta montanha de constantes selecionam os valores dos pokémons e extraiem
  // apenas o valor númerico sem espaços sobrando.
  const hp = pokemonSelecionado.querySelector(".hp").textContent.split(":")[1].trim();
  const ataque = pokemonSelecionado.querySelector(".attack").textContent.split(":")[1].trim();
  const defesa = pokemonSelecionado.querySelector(".defense").textContent.split(":")[1].trim();
  const velocidade = pokemonSelecionado.querySelector(".speed").textContent.split(":")[1].trim();
  const tipo = pokemonSelecionado.querySelector(".type").textContent.split(":")[1].trim();

  // Adiciona uma transição de exibição a janela e exibi ela.
  widgetJanela.classList.add("widget--transition");
  widgetJanela.innerHTML = `
      <div class="widget__window">
        <button id="btnClose">Fechar</button>

        <div class="sprite sprite-widget">
          <img src="${img.src}" alt="" />
        </div>

        <p class="poke-name">${nome}</p>

        <div class="desc">
          <p>${poke.descricao}</p>
        </div>

        <div class="stats">
          <p>HP: ${hp}</p>
          <p>Attack: ${ataque}</p>
          <p>Defense: ${defesa}</p>
          <p>Speed: ${velocidade}</p>
        </div>

        <div class="type">
          <p>Type: ${tipo}</p>
        </div>
      </div>
  `;

  const btnClose = document.getElementById("btnClose");
  btnClose.addEventListener("click", () => {
    widgetJanela.classList.remove("widget--transition");
  });
}

// itemLista.forEach((poke) => {
//   poke.addEventListener("click", (e) => {
//     let divFather = e.target.parentNode.parentNode;
//     console.log(divFather)
//     document.body.innerHTML += `
//       <img src="">
//     `
//   });
// });
