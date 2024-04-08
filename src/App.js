import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_COUNTRIES = gql`
  {
    countries {
      code
      name
      emoji
      continent {
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredCountries = data.countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Busca de países</h1>
      <input
        type="text"
        placeholder="procure por um país..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredCountries.map(country => (
          <li key={country.code}>
            {country.emoji} {country.name} - {country.continent.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
