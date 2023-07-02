import React, { useEffect, useState } from "react";

const CharacterDetails = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch(
        "https://character-history-default-rtdb.firebaseio.com/character.json"
      );
      const responseData = await response.json();

      const loadedCharacters = [];

      for (const key in responseData) {
        loadedCharacters.push({
          id: key,
          name: responseData[key].name,

          content: responseData[key].content,
        });
      }

      setCharacters(loadedCharacters);
    };

    fetchCharacters();
  }, []);

  return (
    <div>
      {characters.map((character) => (
        <div key={character.id}>
          <h1>{character.name}</h1>

          <p>{character.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CharacterDetails;
