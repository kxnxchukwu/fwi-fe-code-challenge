import React, {useState} from "react"
import Router from 'next/router';
import FormInput from '../../components/form-input/form-input.component'
import Header from "../../components/Header";
import Form from 'react-bootstrap/Form';
import styles from './FormContainer.module.scss';
import { COUNTRIES } from '../../constants/countries';

export async function getStaticProps(context) {
  const playerId = context.params.playerId;
  const response = await fetch(`http://localhost:3000/api/players/${playerId}`);
  console.log(response)
  const {id, name, country, winnings, imageUrl} = await response.json();
  return {
    props: {
      id,
      name,
      country,
      winnings,
      imageUrl
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["cdafe80b-6dc0-48f4-88d7-a51d96440808", "20525a2e-c8df-4435-a2a4-1212d0f44b41", "430850f2-1ed2-43e4-b9bc-6506456f28af"];
  const paths = listOfVideos.map((playerId) => ({
    params: { playerId },
  }));

  return { paths, fallback: "blocking" };
}

const playerDetails = ({ id, name, country, winnings, imageUrl}) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [player, setPlayer] = useState({name, country, winnings, imageUrl});
  const countriesArray = Object.keys(COUNTRIES);

const handleSubmit = async event => {
    event.preventDefault();
    const playerObject = {...player, country: selectedCountry}
    try {
      const response = await fetch(`http://localhost:3000/api/players/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playerObject),
      });
    const playerInfo = await response.json();

   if (playerInfo) {
        Router.push(`/`);
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
  event.preventDefault();
  const { value } = event.target;
  setSelectedCountry(value);
  console.log(selectedCountry)
};

  return (
  <>
  <Header />
  <div className={styles.container}>
  <h2 className={styles.titleContainer}>Update Player Details</h2>
  <form onSubmit={handleSubmit}>
  
  <FormInput
    name='name'
    type='text'
    handleChange={handleChange}
    value={player.name}
    placeholder='Enter Name Here'
    required
  />

  <Form.Select size="lg" onChange={handleSelectChange}>
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
    value={player.winnings}
    placeholder='Enter Winnings Here'
    required
  />

  <FormInput
    name='imageUrl'
    type='text'
    handleChange={handleChange}
    value={player.imageUrl}
    placeholder='Enter Image URL Here'
    required
  />
  <button className={styles.invertedButton} type='submit'> Update Player </button>
  </form>
  </div>
  </>
  )
}

export default playerDetails;
