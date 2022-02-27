
import { useEffect, useState } from 'react';
import './App.css';
import {db} from './firebase';
import {collection, getDocs,addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';


function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
   const [users,setUsers] = useState([]);
   const usersCollectionRef = collection(db,"users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, age: Number(newAge)});
  }   


  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newFields = {age: age + 1}
    await updateDoc(userDoc, newFields)
  }
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

   useEffect(() => {
     const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
     }
     getUsers();
       })
  return (
    <div className="App">
      <h1 className='title'>Sali's Crud App</h1>
      
      <input className="nameinput" placeholder='Name...' onChange={(e) => {setNewName(e.target.value)}}/>
      <input className="ageinput" placeholder='Age...' type="number" onChange={(e) => {setNewAge(e.target.value)}}/>
      <button className="createuserbtn"onClick={createUser}>Create User</button>
      <div className="boxes-container">
      {users.map((user) => {
        return <div className='boxes'>
          <h1>Name: {user.name}</h1>
          <h1>Age {user.age}</h1>
          <button className='increasebtn' onClick={() => {updateUser(user.id, user.age)}}>Increase Age</button>
          <button className="deletebtn" onClick={() => {deleteUser(user.id)}}>Delete User</button>
        </div>
      })}
      </div>
    </div>
  );
}

export default App;
