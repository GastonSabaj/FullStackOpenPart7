import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  console.log("El name que recibí para el hook de useCountry es: ",name);
  const [country, setCountry] = useState(null);

  // Este efecto se va a ejecutar cada vez que el parámetro name cambie.
  useEffect(() => {
    if (name) {
      const fetchCountry = async () => {
        try {
          const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
          console.log("Response: ", response.data);
          setCountry({ found: true, data: response.data }); // Obtenemos el primer resultado
        } catch (error) {
          setCountry({ found: false }); // Si no se encuentra el país
        }
      };

      fetchCountry();
    } else {
      setCountry(null); // Si no hay nombre, reinicia el estado
    }
  }, [name]); // Dependemos del nombre para ejecutar el efecto

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  console.log("Country: ", country);
  console.log("country.data.flags.png: ", country.data.flags.png);
  return (
    <div>
      <h3>{country.data.name.common}</h3>
      <div>capital {country.data.capital}</div>
      <div>population {country.data.population}</div>
      <img src={country.data.flags.png} height="100" alt={`flag of ${country.data.name}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  console.log("Name: ", name);
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        {/* Al escribir {...nameInput}, lo que estoy diciendo es que quiero que las propiedades onChange, type y value del objeto nameInput sean usadas en el input */}
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
