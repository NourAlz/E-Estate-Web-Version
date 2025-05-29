import React, {Component} from "react";
import { GENERALAPI } from "./API";
import "./App.css";
import logo from "./logo.png";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export class Home extends Component{
  constructor(props){
    super(props);

    this.state ={
      properties: [],
      fav: [],
    }
  }

  refreshList() {
    const token = localStorage.getItem('token');
    console.log("Token being sent:", token); 

    console.log(localStorage.getItem('token'));
    console.log(sessionStorage.getItem('token'));


    fetch(GENERALAPI.API_URL + 'Property/ViewOther', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch properties');
        }
        return response.json();
    })
    .then(data => {
        console.log("Fetched data:", data);
        this.setState({ properties: data });
    })
    .catch(error => console.error("Error fetching properties:", error));
  }

  refreshFav(){
    const token = localStorage.getItem('token');
    fetch(GENERALAPI.API_URL + 'Property/ViewFav', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      })
      .then(response => {
      if(!response.ok){
        throw new Error('Failed to fetch properties');
      }
      return response.json();
      })
      .then(data => {
        this.setState({fav: data});
      })
      .catch(error => console.error("Error Fetching", error));
  }

  componentDidMount(){
    this.refreshList();
    this.refreshFav();
  }

  addFav = async (id) => {
    const token = localStorage.getItem('token');
    try{
      const response = await fetch(GENERALAPI.API_URL + `Property/AddFav?p_id=${id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      if (!response.ok) {
          const err = await response.text();
          throw new Error(err || 'Failed to add');
        }
        this.refreshFav();
    }catch(err){
      console.error('Add failed:', err.message);
      alert(`Error: ${err.message}`);
    }
  }

  delFav = async (id) => {
    const token = localStorage.getItem('token');
    try{
      const response = await fetch(GENERALAPI.API_URL + `Property/DelFav?p_id=${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      if (!response.ok) {
          const err = await response.text();
          throw new Error(err || 'Failed to delete');
        }
        this.refreshFav();
    }catch(err){
      console.error('Delete failed:', err.message);
      alert(`Error: ${err.message}`);
    }
  }

  render(){
    const {properties, fav} = this.state;
    console.log("fav", fav);
    console.log("prop", properties);
    const favIds = new Set(fav.map(f => f.id));

    console.log(favIds);
      return (
        <div className="container">
        <div className="main">
          <header className="header">
            <img src={logo} alt="Logo" className="logo"/>
          </header>

          <nav className="navbar">
            <a href="/mine" className="navLink">My Properties</a>
            <a href="/profile" className="navLink">Profile</a>
          </nav>
        </div>
          
        <h2 className="heading">Properties</h2>
        <div className="grid">
          {properties.map((p) => {
            const isFav = favIds.has(p.id);
            const handleFavoriteToggle = () => {
              if (isFav) {
                console.log("Remove from fav:", p.id);
                // call remove from favorites API
                this.delFav(p.id);
              } else {
                console.log("Add to fav:", p.id);
                // call add to favorites API
                this.addFav(p.id);
              }
            };
            return (
              <div key={p.id} className="card" style={{ position: 'relative' }}>
              <div className="typeLocation">
                <span>{p.type_of}, {p.locat}</span>
              </div>
              <p className="description">{p.descrip}</p>
              <p className="price">Price: ${p.price}</p>
              <p className="contact">Contact: {p.contact}</p>
              <button
                onClick={handleFavoriteToggle}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: isFav ? 'red' : 'gray'
                }}
              >
                {isFav ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          );
        })}
      </div>    
    </div>
    );
  }
}