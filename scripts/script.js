const widgetJanela = document.getElementById("widget");
const lista = document.getElementById("lista");
const input = document.getElementById("search");

const btn = document.getElementById("btn");
const btnReload = document.getElementById("reload");
const selectOptions = document.getElementById("select");
let containsClasse = btnReload.classList.contains('giro');

input.value = '';
input.focus();
selectOptions.value = "Todos";

// Para chamar os pokémons 2 segundos depois.
let timeout;
if (lista.innerHTML === "") {
  lista.innerHTML = "<h3 class='play'>Loading...</h3>";
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
  pokeBusca(pokemons);
})
input.addEventListener('keyup', (e) => {
  if(e.key === 'Enter') {
    pokeBusca(pokemons);
  }
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
        <div class="first-part">
          <div class="sprite sprite-widget">
            <img src="${img.src}" alt="${nome}" />
          </div>

          <div class="nome-type">
            <h3 class="poke-name">${nome}</h3>
          
            <div class="type">
              <p>Tipo: ${tipo}</p>
            </div>
          </div>
        </div>

        <div class="desc">
          <p>${descricao}</p>
        </div>

        <div class="second-part">
          <div class="stats stats-widget">
            <p class="hp attr"><span class='key'>HP:</span> <span class='word'>${hp}</span></p>
            <p class="attack attr"><span class='key'>Ataque:</span> <span class='word'>${ataque}</span></p>
            <p class="defense attr"><span class='key'>Defesa:</span> <span class='word'>${defesa}</span></p>
            <p class="speed attr"><span class='key'>Velocidade:</span> <span class='word'>${velocidade}</span></p>
          </div>
        </div>
        <button id="btnClose">Fechar</button>
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
      data-sprite="${poke.backSrc}"
      />
    </div>
    <h3 class="poke-name">${poke.nome}</h3>

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