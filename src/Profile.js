import React, {Component} from "react";
import { GENERALAPI } from "./API";
import "./log.css";
import "./App.css";

export class Profile extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            email: '',
            favorites: []
        }
    }

    refreshList(){
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
            this.setState({favorites: data});
        })
        .catch(error => console.error("Error Fetching", error));
    }

    refreshUserList(){
        const token = localStorage.getItem('token');
        fetch(GENERALAPI.API_URL + 'Users/UserInfo', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(!response.ok){
                throw new Error('Failed to fetch');
            }
            return response.json();
        })
        .then(data => {
            console.log("fetched info: ", data);
            console.log(data.email);
            this.setState({
                username: data.username,
                email: data.email
            })
        })
        .catch(error => console.error("error", error));
    }

    componentDidMount(){
        this.refreshList();
        this.refreshUserList();
    }

    render(){
        const{username, email, favorites} = this.state;
        return(
          <div>
            <div className="containerDis">
              <div className="formContainerDis">
                <h2 className="heading">UserInfo</h2>
                <p><strong>Username: </strong>{username}</p>
                <p><strong>Email: </strong>{email}</p>
              </div>
            </div>

            <div className="container">
              <h2 className="heading">Favorites</h2>
              <div className="grid">
                {favorites.map((p) => (
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
          </div>
        )
    }
}