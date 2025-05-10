import React, {Component} from "react";
import { GENERALAPI } from "./API";
import "./log.css";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      passwd: ''
    };
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleRegister = async (event) => {
    event.preventDefault();

    const regData = {
      username: this.state.username,
      email: this.state.email,
      passwd: this.state.passwd,
    };

    console.log(JSON.stringify(regData));

    try{
      const response = await fetch(GENERALAPI.API_URL + 'auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(regData)
      });

      const data = await response.json();
      if(response.ok){
        console.log('registration successful: ', data);
        window.location.href = "/login";
      }else{
        console.log('error');
      }
    }catch (error){
      console.error('error', error);
    }
  };

  render(){
    return(
      <div className="containerLog">
        <div className="formContainer">
        <h2 className="headerLog">Register</h2>
        <form onSubmit={this.handleRegister}>
          <div className="inputGroup">
            <label>Username:</label>
            <input 
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              className="input"/>
          </div>
          <div className="inputGroup">
            <label>Email:</label>
            <input 
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              className="input"/>
          </div>
          <div className="inputGroup">
            <label>Password:</label>
            <input 
              type="password"
              name="passwd"
              value={this.state.passwd}
              onChange={this.handleInputChange}
              className="input"/>
          </div>
          <button type="submit" className="button">Register</button>
        </form>
        </div>
      </div>
    )
  }
}
