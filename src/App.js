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
  const [infoCheck, setInfoCheck] = useState(false)




useEffect(()=>{
  gotoHome()
}, [])

const showPlants = () => {
  setProfileCheck(true)
  setRegisterCheck(false)
  setHomeCheck(false)
  setLoginCheck(false)
  setInfoCheck(false)
  axios.get('https://plantwateringapi.herokuapp.com/plants').then((response)=>{
      setPlants(response.data)

  })
}
  const openLogin = () => {
    setPlants([])
    setRegisterCheck(false)
    setLoginCheck(true)
    setHomeCheck(false)
    setProfileCheck(false)
    setInfoCheck(false)
  }
  const openRegister = () => {
    setPlants([])
    setLoginCheck(false)
    setRegisterCheck(true)
    setHomeCheck(false)
    setProfileCheck(false)
    setInfoCheck(false)
  }
  const gotoHome = () => {
    setPlants([])
    setInfoPlants([])
    setRegisterCheck(false)
    setLoginCheck(false)
    setHomeCheck(true)
    setProfileCheck(false)
    setInfoCheck(false)
  }
  const showPlantInfo = () => {
    setPlants([])
    setRegisterCheck(false)
    setLoginCheck(false)
    setHomeCheck(false)
    setProfileCheck(false)
    setInfoCheck(true)

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
      <button>Fun Builds</button>
      <button onClick={showPlantInfo}>Plant Info</button>
      <button onClick={showPlants}>My Plants!</button>
      <button onClick={gotoHome}>Home</button>


      </nav>

        {registerCheck ? (<Register />):null}
        {loginCheck ? (<Login />):null}
      {newCheck ? (<form className="form" onSubmit={handleNewFormSubmit}>
        Username: <input type='text' value={props.user}/><br/>
        Name: <input type="text" onChange={handleNewNameChange}/><br/>
        Image: <input type="text" onChange={handleNewImageChange}/><br/>
        Description: <input type="text" onChange={handleNewDescriptionChange}/><br/>
        Needs to be Watered?: <input type="checkbox" onChange={handleNewWateredChange}/><br/>
        <input type="submit" value="Submit"/>
        <button onClick={ (event) => {
          closeNewCheck(plants)}}>Close Plant Form</button>
      </form>) : null
      }
    </section>
    <section>
    {infoCheck ? (<div className='info-div'>
    <h1>What are the best things I can do for my Plants?</h1>
    <h2>1. Good Soil</h2>
    <p>Despite what most people think, soil matters a lot for your plant to grow big and healthy. Miricle Grow also is not the <i>BEST</i> soil for your plants. It has time release fertilizer that may go off later than you need/want it to, and in turn, burn your plants.

    Some of our most reccommended soils are:
    <ul>
    <li><card className='soil-rec1'><a href='https://foxfarm.com/product/happy-frog-potting-soil'>Fox Farms Happy Frog</a>
    <img src='https://foxfarm.com/wp-content/uploads/2019/02/happyfrogpottingsoil_12qt-391x500.png' /></card>
    </li>
    <li><card className='soil-rec2'><a href='https://www.nehydro.com/nectar-for-the-gods-soil-4-1-5cf/'>Nectar of The Gods</a>
    <img src='https://cdn11.bigcommerce.com/s-33e97/images/stencil/1280x1280/products/4656/5779/NOGSOIL__35560.1601657818.jpg?c=2' />
    </card></li>
    <li><card className='soil-rec3'><a href='https://foxfarm.com/product/ocean-forest-potting-soil'>Fox Farms Ocean Forest</a>
    <img src='https://foxfarm.com/wp-content/uploads/2019/02/oceanforest_12qt-391x500.png' /></card>
    </li>
  <li><card className='soil-rec4'>  <a href='https://fatplantssandiego.com/product/premium-organic-cacti-and-succulent-soil-with-nutrients/'>Fat Plants San Deigo Succulent Soil</a>
  <img src='https://fatplantssandiego.com/wp-content/uploads/2019/12/Soil-Bag-Front2-600x600-1.jpg' />
  </card></li>
  </ul>

  These soils are extremely high quality, and will no doubt improve your luck on growing a flourishing garden.

    </p>
    <h2> 2. Good Watering Habits </h2>
    <p>Although we've already linked to an information page on watering your plants, here we wanted to provide a product that's a solution to that problem on it's own. You will need different varients of this product for different kinds of plants, but the:</p>
    <div className = 'water-rec'>
    <h4><a href='https://blumat.com/en'>Blumat AutoWatering Systems</a></h4>
    <img src='https://blumat.com/storage/app/media/classic/uber2.jpg' />
    </div>
    <p>provides an automated means to watering your plants the correct amount each day, even when you arent there to tend to them!</p>
    <h2> 3. A Perfect Environment </h2>
    <p>Although some plants <i>CAN</i> thrive on a windowsill, most need to have some sort of dialed in enviroment to really show off what they're capable of. In this part of our reccomendations, we are showing a product bundle to help you achieve this.
    *Note: More "fun" versions of this build are available in the Fun tab.*
    </p>
    <h4><a href='https://www.spider-farmer.com/collections/grow-tent-kits/'>Spider Farmer Complete Packages</a></h4>
    <img src='https://www.spider-farmer.com/wp-content/uploads/2022/02/Spider-Farmer-SF1000-SET--600x600.jpg' />
    <p>Although some are on the more expensive side, theres practically nothing you <b>CAN'T</b> grow inside one of these things. Their kits come with:
    <ul>
      <li>A grow-light</li>
      <li>Growing Tent</li>
      <li>In-line Fan to control temp</li>
      <li>De/Humidifier (controls both to have optimal humidity for your plants)</li>
      <li>Timed Outlight to make sure your plants don't get too much light</li>
      <li>And More!</li>
    </ul>
    its truely everything anyone who want's to grow anything year round could dream of.</p>

</div>

)


  :null}
    {profileCheck ? (<button onClick={ (event) => {
      changeNewCheck(plants)}}>Add A New Plant</button>):null}
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
