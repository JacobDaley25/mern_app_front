import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [plants, setPlants] = useState([])
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newImage, setNewImage] = useState('')

  const newImageChange = (event) => {
    setNewImage(event.target.value)
  }
  const newNameChange = (event) => {
    setNewName(event.target.value)
  }
  const newDescriptionChange = (event) => {
    setNewDescription(event.target.value)
  }
  const formSubmitt = (event) => {
    axios.post('http://localhost:3000/plants',
  {
    name: newName,
    description: newDescription,
    image: newImage
  }).then((resposne)=>{
    axios.get('http://localhost:3000/plants').then((response)=>{
      setPlants(response.data)
    })
  })
  }
  useEffect(()=>{
    axios.get('http://localhost:3000/plants').then((response)=>{
      setPlants(response.data)
    })
  }, [])

  return(
    <div>
    <h1>this works</h1>
    {
    plants.map((plants)=>{
      return <div className='plants' key={plants._id}>
      <div>
      <h1>{plants.name}</h1>
      <p>{plants.description}</p>
      <img src={plants.image}/>
      </div>
      </div>

    })
  }
  
    </div>
  )
}

export default App;
