import {useState} from "react";
import Router from 'next/router';
import FormInput from '../../components/form-input/form-input.component'
import Header from "../../components/Header";
import styles from './FormContainer.module.scss';
import Form from 'react-bootstrap/Form';
import { COUNTRIES } from '../../constants/countries';

const createPlayer = () => {

const [player, setPlayer] = useState({name: "", winnings: "", imageUrl: ""});

const [selectedCountry, setSelectedCountry] = useState("");

const { name, winnings, imageUrl } = player;

const countriesArray = Object.keys(COUNTRIES);

const handleSubmit = async event => {
    event.preventDefault();
    try {

      const response = await fetch(`http://localhost:3000/api/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            country: selectedCountry,
            winnings,
            imageUrl
        }),
      });
    const playerInfo = await response.json();


    if (playerInfo) {
        Router.push("/");
    }

    } catch (error) {
      console.error({error})
    }
  };

const handleChange = event => {
    const { value, name } = event.target;
    setPlayer({...player, [name]: value });
};

const handleSelectChange = event => {
  const { value } = event.target;
  console.log(value)
  setSelectedCountry(value);
};

  return (
<>
<Header />    
<div className={styles.container}>
  <h2 className={styles.titleContainer}>Create Player</h2>
  <form onSubmit={handleSubmit}>
  <FormInput
    name='name'
    type='text'
    handleChange={handleChange}
    value={name}
    placeholder='Enter Name Here'
    required
  />

  <Form.Select size="lg" onChange={(event) => handleSelectChange(event)}>
        <option>Open this select menu</option>
        {
          countriesArray.map((country, idx) => (
            <option key={idx} value={country}>{country}</option>
          ))
        }
  </Form.Select>

  <FormInput
    name='winnings'
    type='text'
    handleChange={handleChange}
    value={winnings}
    placeholder='Enter Winnings Here'
    required
  />

  <FormInput
    name='imageUrl'
    type='text'
    handleChange={handleChange}
    value={imageUrl}
    placeholder='imageUrl'
    required
  />
  <button className={styles.baseButton} type='submit'> Create Player </button>
  </form>
  </div>
  </>
  )
}

export default createPlayer;