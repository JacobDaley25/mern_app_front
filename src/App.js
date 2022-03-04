import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import Register from './Register'
import Login from './Login'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newWatered, setNewWatered] = useState(false)
  const [plants, setPlants] = useState([])
  const [newCheck, setNewCheck] = useState(false)
  const [infoPlants, setInfoPlants] = useState([])
  const [registerCheck, setRegisterCheck] = useState(false)
  const [loginCheck, setLoginCheck] = useState(false)

  useEffect(()=>{
    axios.get('https://plantwateringapi.herokuapp.com/plants')
      .then((response)=>{
        setPlants(response.data)
    })
  }, [])

  const openLogin = () => {
    setPlants([])
    setRegisterCheck(false)
    setInfoPlants(false)
    setLoginCheck(true)
  }
  const openRegister = () => {
    setPlants([])
    setRegisterCheck(true)
  }
  const gotoHome = () => {
    setInfoPlants([])
    setRegisterCheck(false)
    axios
      .get('https://plantwateringapi.herokuapp.com/plants')
      .then((response)=>{
        setPlants(response.data)
      })
  }
  const showPlantInfo = () => {
    setPlants([])
    axios
      .get('growstuff.org/crops.json')
      .then((response)=>{
        setInfoPlants(response.data)
      })

  }
  const handleNewFormSubmit = (event) => {
    event.preventDefault();
    axios.post(
      'https://plantwateringapi.herokuapp.com/plants',
      {
        name: newName,
        image: newImage,
        description: newDescription,
        wasWatered: newWatered
      }).then((response)=>{
        axios
          .get('https://plantwateringapi.herokuapp.com/plants')
          .then((response)=>{
            setPlants(response.data)
        })
    })
  }

  const handleDelete = (plantData) => {
    axios
      .delete(`https://plantwateringapi.herokuapp.com/plants/${plantData._id}`)
      .then(() => {
          axios
            .get('https://plantwateringapi.herokuapp.com/plants')
            .then((response) => {
              setPlants(response.data)
            })
      })
  }

  const handleToggleWatered = (plantData) => {
    axios
      .put(`https://plantwateringapi.herokuapp.com/plants/${plantData._id}`,
        {
          name: plantData.name,
          image: plantData.image,
          description: plantData.description,
          wasWatered:!plantData.wasWatered
        }
      )
      .then(() => {
        axios
          .get('https://plantwateringapi.herokuapp.com/plants')
          .then((response) => {
            setPlants(response.data)
          })
      })
  }

  const changeNewCheck = () => {
    setNewCheck(true)
  }

  const closeNewCheck = () => {
    setNewCheck(false)
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNewImageChange = (event) => {
    setNewImage(event.target.value)
  }
  const handleNewDescriptionChange = (event) => {
    setNewDescription(event.target.value)
  }
  const handleNewWateredChange = (event) => {
    setNewWatered(event.target.checked)
  }

  return (
    <div>
    <h1>Plant₂0</h1>
    <section>
      <h2></h2>
      <button onClick={openRegister}> Sign Up </button>
      <button onCLick={openLogin}>Login!</button>
      <button onClick={showPlantInfo}>Plant Info</button>
      <button onClick={gotoHome}>Home</button>
      <button onClick={ (event) => {
        changeNewCheck(plants)}}>Add A New Plant</button>
        {registerCheck ? (<Register />):null}
        {loginCheck ? (<Login />):null}
      {newCheck ? (<form className="form" onSubmit={handleNewFormSubmit}>
        Name: <input type="text" onChange={handleNewNameChange}/><br/>
        Image: <input type="text" onChange={handleNewImageChange}/><br/>
        Description: <input type="text" onChange={handleNewDescriptionChange}/><br/>
        Needs to be Watered?: <input type="checkbox" onChange={handleNewWateredChange}/><br/>
        <input type="submit" value="Add Plant"/>
        <button onClick={ (event) => {
          closeNewCheck(plants)}}>Close Plant Form</button>
      </form>) : null
      }
    </section>
    <section>
    <h2>Plants In My Garden</h2>
    <div className="cardgrid">
      {

        plants.map((plant)=>{
          return<div className="plantcard" key={plant._id}>
            <h3 className="textdata">{plant.name}</h3>
            <p className="description">{plant.description}</p>
            <p className="textdata" onClick={ (event)=>{ handleToggleWatered(plant) }}>
            {
              (plant.wasWatered)?
                'needs water'
                :
                'does not need water'
            } <br/>
            </p>
            <img className="plantimg" src={plant.image}/><br/>
            <button onClick={ (event)=>{ handleDelete(plant) } }>Delete Plant</button>
          </div>

        })
      }
      </div>
    </section>
  </div>

)}

export default App
