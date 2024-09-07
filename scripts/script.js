const widgetJanela = document.getElementById("widget");
const lista = document.getElementById("lista");
const input = document.getElementById("search");
const btn = document.getElementById("btn");
const btnReload = document.getElementById("reload");
const selectOptions = document.getElementById("select");

input.value = '';
selectOptions.value = "Todos";

// Para chamar os pokémons 2 segundos depois.
let timeout;
if (lista.innerHTML === "") {
  lista.innerHTML = "<h3>Loading...</h3>";
}
timeout = setTimeout(() => {
  pokeRender(pokemons);
}, 2000);

// Para recarregar os pokémons
btnReload.addEventListener('click', () => {
  selectOptions.value = "Todos";
  pokeRender(pokemons);
});

// Para pesquisar pokémons específicos
btn.addEventListener('click', () => {
  pokeBusca(pokemons)
})

// Filtra os pokémons em tipos
selectOptions.addEventListener('change', () => {
  pokeRender(pokemons);
});

function pokeRender(pokemons) {
  // Tira o H3
  lista.innerHTML = "";

  let filteredPokemons;
  if (selectOptions.value === "Todos") {
    filteredPokemons = pokemons; // Mostra todos os pokémons
  } else {
    filteredPokemons = pokemons.filter(poke => poke.tipo.includes(selectOptions.value));
  }

  for (poke of filteredPokemons) {
    pokeTree(poke);
  }
  
  clearTimeout(timeout);
  timeout = null;
  pokeLista();
}

function pokeBusca(pokemons) {
  // Esvazia a seção de pokémons
  lista.innerHTML = "";

  if(input.value === "") {
    console.log('Digite algo pelo menos... :|')
  }

  for (poke of pokemons) {
    if (poke.nome.includes(input.value)) {
      pokeTree(poke);
    } else {
      if (poke.tipo.includes(input.value)) {
        selectOptions.value = input.value;
        pokeTree(poke);
      }
    }
  }

  input.value = '';
  input.focus();
  pokeLista();
}

function pokeWindow(pokemonSelecionado) {
  const img = pokemonSelecionado.querySelector(".img");
  const nome = pokemonSelecionado.querySelector(".poke-name").textContent;
  const descricao = pokemonSelecionado.querySelector(".desc").textContent;

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
          <img src="${img.src}" alt="${nome}" />
        </div>

        <p class="poke-name">${nome}</p>

        <div class="desc">
          <p>${descricao}</p>
        </div>

        <div class="stats">
          <p>HP: ${hp}</p>
          <p>Ataque: ${ataque}</p>
          <p>Defesa: ${defesa}</p>
          <p>Velocidade: ${velocidade}</p>
        </div>

        <div class="type">
          <p>Tipo: ${tipo}</p>
        </div>
      </div>
  `;

  closeWindow();
}


function closeWindow() {
  const btnClose = document.getElementById("btnClose");
  btnClose.addEventListener("click", () => {
    widgetJanela.classList.remove("widget--transition");
  });
}

function pokeTree(poke) {
  lista.innerHTML += `
  <li class="list-pokemon__item">
    <div class="sprite" id="poke">
      <img
      src="${poke.src}"
      alt="${poke.nome}"
      class="img"
      />
    </div>
    <p class="poke-name">${poke.nome}</p>

    <div class="desc none">
      <p>${poke.descricao}</p>
    </div>
    
    <div class="stats none">
      <p class="hp">HP: ${poke.hp}</p>
      <p class="attack">Ataque: ${poke.ataque}</p>
      <p class="defense">Defesa: ${poke.defesa}</p>
      <p class="speed">Velocidade: ${poke.velocidade}</p>
    </div>
    
    <div class="type none">
      <p class="type">Tipo: ${poke.tipo}</p>
    </div>
  </li>
`;
}

function pokeLista() {
  const itemLista = document.querySelectorAll("#poke");
  itemLista.forEach((item) => {
    item.addEventListener("click", (e) => {
      const pokemonSelecionado = e.target.parentNode.parentNode;
      pokeWindow(pokemonSelecionado);
    });
  });
}