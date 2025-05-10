import React, {Component} from "react";
import { GENERALAPI } from "./API";
import "./App.css"

export class Home extends Component{
  constructor(props){
    super(props);

    this.state ={
      properties: [],
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

  handleAddFav = async (id) => {
      const token = localStorage.getItem('token');
    
      try {
        const response = await fetch(GENERALAPI.API_URL + `Property/AddFav?id=${id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (!response.ok) {
          const err = await response.text();
          throw new Error(err || 'Failed to delete');
        }

      } catch (err) {
        console.error('Delete failed:', err.message);
        alert(`Error: ${err.message}`);
      }
  };

  componentDidMount(){
    this.refreshList();
  }

  render(){
    const {properties} = this.state;
    console.log("prop", properties);
      return (
        <div className="container">
        <div className="main">
          <header className="header">
            <img src="/logo.png" alt="Logo" className="logo" />
          </header>

          <nav className="navbar">
            <a href="/mine" className="navLink">My Properties</a>
            <a href="/profile" className="navLink">Profile</a>
          </nav>
        </div>
          
        <h2 className="heading">Properties</h2>
        <div className="grid">
          {properties.map((p) => {
            return (
              <div key={p.id} className="card" style={{ position: 'relative' }}>
              <div className="typeLocation">
                <span>{p.type_of}, {p.locat}</span>
              </div>
              <p className="description">{p.descrip}</p>
              <p className="price">Price: ${p.price}</p>
              <p className="contact">Contact: {p.contact}</p>
            </div>
          );
        })}
      </div>    
    </div>
    );
  }
}