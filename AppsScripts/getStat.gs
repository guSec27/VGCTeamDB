function getStat(pokemonName, stat) {
  var baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  var response = UrlFetchApp.fetch(baseUrl + pokemonName.replace(" ","-").toLowerCase());
  var data = response.getContentText();
  var parsedData = JSON.parse(data);

  var base_stat = null;

  stats = parsedData.stats;

  for (var i=0; i<stats.length; i++){

    if (stats[i].stat.name == stat.toLowerCase().replace(" ", "-")){
      base_stat = stats[i].base_stat;
      break
    } 
  }

  return base_stat; 

}
