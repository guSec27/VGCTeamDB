function getSpriteUrl(pokemonName) {
  var baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  var response = UrlFetchApp.fetch(baseUrl + pokemonName.replace(" ","-").toLowerCase());
  var data = response.getContentText();
  var parsedData = JSON.parse(data);
  
  var spriteUrl = parsedData.sprites.other["official-artwork"].front_default;
  
  return spriteUrl;
}