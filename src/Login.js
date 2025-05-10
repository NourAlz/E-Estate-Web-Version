import React, {Component} from "react";
import { GENERALAPI } from "./API";
import { Link } from "react-router-dom";
import "./log.css";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      passwd: '',
      errorMessage: '' // To display errors
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(name);
  };

  handleLogin = async (event) => {
    event.preventDefault(); // Prevent page reload

    const loginData = {
      username: this.state.username,
      passwd: this.state.passwd, // Make sure this matches the API field
    };
    console.log(JSON.stringify(loginData));

    try {
      const response = await fetch(GENERALAPI.API_URL + 'auth/login', { // Replace with actual API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
      console.log("data", loginData);

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        console.log('Login successful:', data);
        console.log('Token:', data.Token);
        localStorage.setItem('token', data.Token); // Save token for authentication
        window.location.href = "/home"; // Redirect to home page
      } else {
        this.setState({ errorMessage: data.message || 'Login failed. Incorrect name or password.'});
      }
    } catch (error) {
      console.error('Error during login:', error);
      this.setState({ errorMessage: 'Network error. Please try again.' });
    }
  };

  render() {
    return (
      <div className="containerLog">
      <div className="formContainer">
      <h2 className="headerLog">Login</h2>
        {this.state.errorMessage && <p className="error">{this.state.errorMessage}</p>}
        <form onSubmit={this.handleLogin}>
          <div className="inputGroup">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label>Password:</label>
            <input
              type="password"
              name="passwd"
              value={this.state.passwd}
              onChange={this.handleInputChange}
              className="input"
            />
          </div>
          <button type="submit" className="button">Login</button>
        </form>
        <div>
        <p>Don't have an account?</p>
        <Link to="/register">
          <button className="button">Register</button>
        </Link>
      </div>
      </div>
        
      </div>
    );
  }
}