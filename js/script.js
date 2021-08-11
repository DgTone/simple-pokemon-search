// Button e Input
const btnPesquisarPokemon = document.querySelector('#btn_pesquisar_pokemon');
const inpPesquisarPokemon = document.querySelector('#pesquisar_pokemon');

const btnHome = document.querySelector("#home_btn");
const btnSobre = document.querySelector("#about_btn");

//Area de mostrar Pokemon 
const mostrarPokemonArea = document.querySelector('.mostrar-pokemon');

//Saber que mostrei um erro
let onErro = false;

//Saber que mostrei um pokemon 
let onPokemon = false;

//Apertar Botao 'Home' (PokéInfo)
btnHome.addEventListener('click',()=>{
    mostrarHome();
})

//Apertar Botao Sobre
btnSobre.addEventListener('click',()=>{
    mostrarSobre();
})

//Apertar Botao de pesquisa
btnPesquisarPokemon.addEventListener('click',()=>{
    //Animação de voltar a bolinha
    if(onErro || onPokemon){
        defaultStylePokemon();
    }
    //Tempo para a animação
    setTimeout(getPokemonJSON,500);
});

//mostrar sobre
function mostrarSobre(){
    //retirando conteudo de home
    mostrarPokemonArea.style.display = "none";
    document.querySelector('.procurar-pokemon').style.display = "none";
    //mostrando div sobre
    document.querySelector('.sobre').style.display = "block";
    //mudando border bottom da barra de navegação
    btnHome.style.borderBottom = "none";
    btnSobre.style.borderBottom = "2px solid var(--cor-azul-letra)";
}

function mostrarHome(){
    //retirando conteudo sobre
    document.querySelector('.sobre').style.display = "none";
    //Deixando conteudo da home visivel
    mostrarPokemonArea.style.display = "block";
    document.querySelector('.procurar-pokemon').style.display = "flex";
    //mudando border bottom da barra de navegação
    btnHome.style.borderBottom = "2px solid var(--cor-azul-letra)";
    btnSobre.style.borderBottom = "none";
}

//mostrar o pokemon pesquisado
function mostrarPokemon(json){
    onPokemon = true;

    mostrarPokemonArea.style.overflowY = 'scroll';
    mostrarPokemonArea.style.transitionDuration = "1s";

    //largura da div 
    if(screen.width >= 600){
        mostrarPokemonArea.style.width = "600px";
    }else{
        mostrarPokemonArea.style.width = "300px";
    }

    mostrarPokemonArea.style.height = "90vh";
    mostrarPokemonArea.style.borderRadius = "5px";
    
    document.querySelector('.mostrar-pokemon-content').style.display = 'flex';

    //imgs do pokemon
    document.querySelector('#poke_img_front').setAttribute('src',json.sprites.front_default);
    document.querySelector('#poke_img_back').setAttribute('src',json.sprites.back_default);

    //nome do pokemon
    document.querySelector('#nome_pokemon').innerHTML = json.name;

    //id pokedex
    document.querySelector('#id').innerHTML = 'Pokédex id: '+json.id;

    //geral
    let stringGeral = ""; //altura,peso,tipo
    //percorrer types
    for(let i = 0; i <= json.types.length-1; i++){
        stringGeral += `<tr> <td> Tipo ${i+1} </td> <td> ${json.types[i].type.name} </td> </tr>`;
    }
    stringGeral += `<tr> <td> Altura </td> <td> ${json.height/10} m </td> </tr>`;
    stringGeral += `<tr> <td> Peso </td> <td> ${json.weight/10} kg </td> </tr>`;
    document.querySelector('.tabela-geral').innerHTML += stringGeral;

    //habilidades
    let stringHabilidades = "<tr class='tabela-top'> <td> Nome </td> </tr>";
    for(let i = 0; i <= json.abilities.length-1; i++){
        stringHabilidades += `<tr> <td> ${json.abilities[i].ability.name} </td> </tr>`;
    }
    document.querySelector('.tabela-habilidades').innerHTML += stringHabilidades;

    //status
    let stringStatus = "<tr class='tabela-top'> <td> Nome </td> <td> Valor </td> </tr>";
    for(let i = 0; i <= json.stats.length-1; i++){
        stringStatus += `<tr> <td> ${json.stats[i].stat.name} </td> <td> ${json.stats[i].base_stat} </td> </tr>`;
    }
    document.querySelector('.tabela-status').innerHTML += stringStatus;
}

//mostrar erro caso pesquise algo errado
function mostrarErro(){
    onErro = true;
    mostrarPokemonArea.style.transitionDuration = "1s";
    mostrarPokemonArea.style.width = "300px";
    mostrarPokemonArea.style.height = "100px";
    mostrarPokemonArea.style.borderRadius = "10px";
    document.querySelector('.erro-pokemon').style.display = "flex";
}

//voltar a ser a bolinha inicial
function defaultStylePokemon(){
    if(onErro){
        document.querySelector('.erro-pokemon').style.display = "none";
        onErro = false;
    }
    if(onPokemon){
        document.querySelector('.mostrar-pokemon-content').style.display = 'none';
        onPokemon = false;
    }
    mostrarPokemonArea.style.overflow = 'auto';
    mostrarPokemonArea.style.transitionDuration = "500ms";
    mostrarPokemonArea.style.borderRadius = "30px";
    mostrarPokemonArea.style.width = "60px";
    mostrarPokemonArea.style.height = "60px";
    //retirar as informações das tabelas
    document.querySelector('.tabela-geral').innerHTML = "";
    document.querySelector('.tabela-habilidades').innerHTML = "";
    document.querySelector('.tabela-status').innerHTML = "";
}

//consumindo a API
function getPokemonJSON(){
    // A API só funciona com o nome do pokemon em lowerCase
    let stringURL = `https://pokeapi.co/api/v2/pokemon/${inpPesquisarPokemon.value.toLowerCase()}`;
    axios.get(stringURL)
    .then((resp)=>{ 
        mostrarPokemon(resp.data)
    })
    .catch((erro)=>{
        mostrarErro();
    })
}