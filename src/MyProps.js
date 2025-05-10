import React, {Component} from "react";
import { GENERALAPI } from "./API";
import "./App.css";

export class MyProps extends Component{
    constructor(props){
        super(props);

        this.state = {
            myprop: []
        }
    }

    refreshList(){
      const token = localStorage.getItem('token'); // Retrieve token
          console.log("Token being sent:", token); 
      
          console.log(localStorage.getItem('token'));
          console.log(sessionStorage.getItem('token'));
      
      
          fetch(GENERALAPI.API_URL + 'Property/ViewMine', {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`, // Include the token
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
              this.setState({ myprop: data });
          })
          .catch(error => console.error("Error fetching properties:", error));  
    }

    handleDelete = async (id) => {
      const token = localStorage.getItem('token');
    
      try {
        const response = await fetch(GENERALAPI.API_URL + `Property/DeleteProperty?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (!response.ok) {
          const err = await response.text();
          throw new Error(err || 'Failed to delete');
        }
    
        // Remove the deleted property from local state
        this.refreshList();
      } catch (err) {
        console.error('Delete failed:', err.message);
        alert(`Error: ${err.message}`);
      }
    };
    

    componentDidMount(){
        this.refreshList();
    }

    render(){
        const {myprop} = this.state;
        return(
            <div className="container">
              <h2 className="heading">My Properties</h2>
              <div className="parent">
                <a href="/add">
                  <button className="buttonAdd">Add a Property</button>
                </a>
              </div>
              <div className="grid">
                {myprop.map((p) => (
                  <div key={p.id} className="card">
                    <div className="typeLocation">
                      <span>{p.type_of}, {p.locat}</span>                  
                    </div>
                    <p className="description">{p.descrip}</p>
                    <p className="price">Price: ${p.price}</p>
                    <p className="contact">Contact: {p.contact}</p>
                  </div>
                ))}
              </div>
            </div>
        )
    }
}