import './App.css';
import {useContext, useState, useEffect, useMemo} from 'react'
import axios from 'axios'
import Register from './Register'
import Login from './Login'
import UserContext from './Login.js'

const App = (props) => {
  const [newName, setNewName] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newWatered, setNewWatered] = useState(false)
  const [plants, setPlants] = useState([])
  const [newCheck, setNewCheck] = useState(false)
  const [infoPlants, setInfoPlants] = useState([])
  const [registerCheck, setRegisterCheck] = useState(false)
  const [loginCheck, setLoginCheck] = useState(false)
  const [homeCheck, setHomeCheck] = useState(false)
  const [profileCheck, setProfileCheck] = useState(false)




useEffect(()=>{
  gotoHome()
}, [])

const showPlants = () => {
  setProfileCheck(true)
  setRegisterCheck(false)
  setHomeCheck(false)
  setLoginCheck(false)
  axios.get('https://plantwateringapi.herokuapp.com/plants').then((response)=>{
      setPlants(response.data)

  })
}
  const openLogin = () => {
    setPlants([])
    setRegisterCheck(false)
    setLoginCheck(true)
    setHomeCheck(false)
  }
  const openRegister = () => {
    setPlants([])
    setLoginCheck(false)
    setRegisterCheck(true)
    setHomeCheck(false)
  }
  const gotoHome = () => {
    setPlants([])
    setInfoPlants([])
    setRegisterCheck(false)
    setLoginCheck(false)
    setHomeCheck(true)
  }
  const showPlantInfo = () => {
    setPlants([])
    setRegisterCheck(false)
    setLoginCheck(false)
    setHomeCheck(false)
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
        username: props.user,
        name: newName,
        image: newImage,
        description: newDescription,
        wasWatered: newWatered
      }).then((response)=>{
        axios
          .get('https://plantwateringapi.herokuapp.com/plants')
          .then((response)=>{
            setPlants(response.data)
            setNewName('')
            setNewImage('')
            setNewDescription('')
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
    <h1>Hi there, {props.user} </h1>
    <section>
    <nav>
      <button onClick={openRegister}> Sign Up </button>
      <button onClick={openLogin}>Login!</button>
      <button onClick={showPlantInfo}>Plant Info</button>
      <button onClick={showPlants}>My Plants!</button>
      <button onClick={gotoHome}>Home</button>
      <button onClick={ (event) => {
        changeNewCheck(plants)}}>Add A New Plant</button>

      </nav>

        {registerCheck ? (<Register />):null}
        {loginCheck ? (<Login />):null}
      {newCheck ? (<form className="form" onSubmit={handleNewFormSubmit}>
        Username: <input type='text' value={props.user}/><br/>
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
    {homeCheck ? (<div className='home-div'>
      <h1>Why Use Us?</h1>
      <h2>The Importance</h2>
      <p>Without water, your plants will die simple as that. On the other hand, too much water, and again, you'll find yourself with some dead plants. To create the perfect reminder program, we have set-up Plant₂0</p>
      <aside>
      <img src='https://www.gardeningknowhow.com/wp-content/uploads/2008/05/water-plants-400x300.jpg' />
      </aside>
      <h2>How to Water Your Plants</h2>
      <p>Each plant needs a different amount of water. That's the first thing you'll have to consider. A cacti will never need as much water as a Tomato plant. In the future, we will be integrating a feature that allows the user to track how long it's been since they've last watered the plant, as well as automatically switching back to unwatered after X amount of days depending on plant species.</p>
      <p2> for more info on watering plants head to <a href='https://www.longfield-gardens.com/article/How-to-Water-Your-Plants'>How to Water your plants</a></p2>
  </div>  ): null}
    <div className="cardgrid">



      {

        plants.filter(plants=> plants.username === props.user).map((plant)=>{
          return<div className="plantcard" key={plant._id}>
            <p className='postedBy'>Posted By: {plant.username}</p>
            <h3 className="textdata">{plant.name}</h3>
            <p className="description">{plant.description}</p>
            <p className="textdata" onClick={ (event)=>{ handleToggleWatered(plant) }}>
            {
              (plant.wasWatered)?
                <img className="needWater" src='https://cdn-icons-png.flaticon.com/512/2432/2432368.png' title="Click to change water status"></img>
                :
                <img className="needWater" src='https://cdn0.iconfinder.com/data/icons/water-38/100/water-13-512.png' title="Click to change water status"></img>
            } <br/>
            </p>
            <img className="plantimg" src={plant.image}/><br/>
            <button onClick={ (event)=>{ handleDelete(plant) } }>Delete Plant</button>
          </div>

        })
      }
      </div>
    </section>
    <p>Created by Brian and Mack EST:Mar 2022</p>
  </div>
)}

export default App
