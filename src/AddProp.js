import React, {Component} from "react";
import { GENERALAPI } from "./API";

export class AddProp extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            type_of: '',
            locat: '',
            price: 0,
            descrip: '',
            contact: ''
        }
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
      
        const token = localStorage.getItem('token'); // Adjust this if you store it differently
        console.log(token);
        try {
          const response = await fetch(GENERALAPI.API_URL+'Property/addAuthorized', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(this.state)
          });

          console.log(JSON.stringify(this.state));
      
          if (!response.ok) {
            const errMsg = await response.text();
            throw new Error(errMsg || 'Failed to add property');
          }
      
          const result = await response.json();
          console.log('Property added:', result);
      
          // Optionally clear the form
          this.setState({
            type_of: '',
            locat: '',
            price: 0,
            descrip: '',
            contact: ''
          });
      
          alert('Property added successfully!');
        } catch (error) {
          console.error('Error adding property:', error.message);
          alert(`Failed: ${error.message}`);
        }
      };

      render() {
        return (
          <div style={styles.container}>
            <div style={styles.formContainer}>
            <h2>Add New Property</h2>
            <form onSubmit={this.handleSubmit}>
              <div style={styles.inputGroup}>
                <label>Type of Property:</label>
                <input
                  type="text"
                  name="type_of"
                  value={this.state.type_of}
                  onChange={this.handleInputChange}
                  required
                  style={styles.input}
                />
              </div>
    
              <div style={styles.inputGroup}>
                <label>Location:</label>
                <input
                  type="text"
                  name="locat"
                  value={this.state.locat}
                  onChange={this.handleInputChange}
                  required
                  style={styles.input}
                />
              </div>
    
              <div style={styles.inputGroup}>
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleInputChange}
                  required
                  style={styles.input}
                />
              </div>
    
              <div style={styles.inputGroup}>
                <label>Description:</label>
                <textarea
                  name="descrip"
                  value={this.state.descrip}
                  onChange={this.handleInputChange}
                  required
                  style={styles.input}
                />
              </div>
    
              <div style={styles.inputGroup}>
                <label>Contact Info:</label>
                <input
                  type="text"
                  name="contact"
                  value={this.state.contact}
                  onChange={this.handleInputChange}
                  required
                  style={styles.input}
                />
              </div>
    
              <button type="submit" style={styles.button}>Add Property</button>
            </form>
          </div>
        </div>
            
        );
      }
      
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#b3e0ff"
  },
  formContainer: {
    backgroundColor: "#f2f2f2", // Grayish with transparency
    padding: "30px",
    margin: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  header: {
    marginBottom: "15px",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  input: {
    width: "96%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#0044cc",
    color: "white",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
  },
};