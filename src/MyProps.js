import React, { Component } from "react";
import { FaTrash } from "react-icons/fa";
import { GENERALAPI } from "./API";
import "./App.css";

export class MyProps extends Component {
  constructor(props) {
    super(props);
    this.state = { myprop: [] };
  }

  refreshList() {
    const token = localStorage.getItem("token");
    fetch(GENERALAPI.API_URL + "Property/ViewMine", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch properties");
        return res.json();
      })
      .then((data) => this.setState({ myprop: data }))
      .catch((e) => console.error(e));
  }

  handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        GENERALAPI.API_URL + `Property/DeleteProperty?id=${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to delete");
      }
      this.refreshList();
    } catch (err) {
      console.error("Delete failed:", err);
      alert(`Error: ${err.message}`);
    }
  };

  componentDidMount() {
    this.refreshList();
  }

  render() {
    const { myprop } = this.state;
    return (
      <div className="container">
        <h2 className="heading">My Properties</h2>
        <div className="parent">
          <a href="/add">
            <button className="buttonAdd">Add a Property</button>
          </a>
        </div>
        <div className="grid">
          {myprop.map((p) => (
            <div
              key={p.id}
              className="card"
              style={{ position: "relative" }} /* make it a positioning context */
            >
              {/* TRASH BUTTON */}
              <button
                onClick={() => this.handleDelete(p.id)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "18px",
                  color: "#c00",
                }}
                title="Delete property"
              >
                <FaTrash />
              </button>

              <div className="typeLocation">
                <span>
                  {p.type_of}, {p.locat}
                </span>
              </div>
              <p className="description">{p.descrip}</p>
              <p className="price">Price: ${p.price}</p>
              <p className="contact">Contact: {p.contact}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
