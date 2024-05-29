import React, { Component } from "react";
import { db } from "../config/firebase";
import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

class PelaksanaEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelaksanaEvents: [],
    };
  }

  componentDidMount = () => {
    this.getAllPelaksana();
  };

  getAllPelaksana = async () => {
    try {
      const pelaksanaCollection = collection(db, "pelaksanaEvent");
      const snapshot = await getDocs(pelaksanaCollection);
      const pelaksana = [];

      snapshot.forEach((doc) => {
        pelaksana.push({ id: doc.id, ...doc.data() });
      });
      console.log(pelaksana);

      this.setState({
        pelaksanaEvents: pelaksana,
      });
    } catch (error) {
      console.error("Error getting Events:", error);
    }
  };

  // deleteAllDocument = async () => {
  //   try {
  //     const pelaksanaCollection = collection(db, "pelaksanaEvent");
  //     const snapshot = await getDocs(pelaksanaCollection);

  //     // Hapus semua dokumen satu per satu
  //     snapshot.forEach(async (doc) => {
  //       await deleteDoc(doc.ref);
  //     });

  //     console.log("Semua dokumen telah dihapus.");
  //   } catch (error) {
  //     console.error("Error deleting documents:", error);
  //   }
  // };

  render() {
    const { pelaksanaEvents } = this.state;

    return (
      <>
        <h4>Daftar Pelaksana Event</h4>

        <hr />
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Foto</th>
              <th>Nama Lengkap</th>
              <th>Email</th>
              <th>Nomor Hp</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {pelaksanaEvents.map((pelaksana, index) => (
              <tr key={pelaksana.id}>
                <td>{index + 1}</td>
                <td>{pelaksana.foto}</td>
                <td>{pelaksana.nama}</td>
                <td>{pelaksana.email}</td>
                <td>{pelaksana.nomorHp}</td>
                <td>{pelaksana.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default PelaksanaEvent;
