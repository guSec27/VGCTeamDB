function getPokemonNamesFromUrl(url) {
  try {
    if (typeof url !== 'string' || !url.trim()) {
      throw new Error('URL non valido.');
    }

    // Recupera il contenuto HTML dall'URL
    const response = UrlFetchApp.fetch(url);
    const htmlContent = response.getContentText();
    
    // Verifica che l'HTML non sia vuoto
    if (!htmlContent) {
      throw new Error('Il contenuto HTML è vuoto.');
    }
    
    const regex = /<pre>([\s\S]*?)<\/pre>/g;
    let match;
    const pokemonNames = [];
    
    while ((match = regex.exec(htmlContent)) !== null) {
      // Otteniamo il testo all'interno del tag <pre>
      const preContent = match[1].trim();
      const lines = preContent.split('\n');
      
      lines.forEach(line => {
        const nameMatch = line.match(/^(.*?) @/);
        if (nameMatch) {
          let name = nameMatch[1].replace(/<[^>]+>/g, "");
          pokemonNames.push(name);
        }
      });
      
      // Se abbiamo trovato 6 Pokémon, possiamo fermarci
      if (pokemonNames.length === 6) {
        break;
      }
    }
    
    return pokemonNames;
  } catch (error) {
    Logger.log('Errore: ' + error.message);
    return [];
  }
}

// Example usage:
const url = "https://pokepast.es/3f8b33133ad4224f";
const pokemonNames = getPokemonNamesFromUrl(url);
console.log(pokemonNames);