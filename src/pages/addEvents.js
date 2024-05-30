import { addDoc, collection, doc } from "firebase/firestore";
import { Component } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";

class AddEvenet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: sessionStorage.getItem("userID"),
      userEmail: sessionStorage.getItem("userEmail"),
      judul: "",
      deskripsi: "",
      tanggal: "",
      jamMulai: "",
      jamSelesai: "",
      lokasi: "",
      targetPeserta: null,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const pelaksanaRef = doc(db, "pelaksanaEvent", this.state.userId);

    try {
      const eventRow = {
        judul: this.state.judul,
        deskripsi: this.state.deskripsi,
        tanggal: this.state.tanggal,
        jamMulai: this.state.jamMulai,
        jamSelesai: this.state.jamSelesai,
        lokasi: this.state.lokasi,
        targetPeserta: this.state.targetPeserta,
        pelaksanaRef: pelaksanaRef,
        capaianPeserta: 0,
        status: "upcoming",
      };
      const docRef = await addDoc(collection(db, "event"), eventRow);
      console.log("data berhasil disimpan dengan id: ", docRef.id);
    } catch (error) {
      console.error("terjadi error karena: ", error);
    }
  };

  render() {
    return (
      <>
        <form>
          <div>
            <label>Nama Event:</label>
            <input
              onChange={(e) => this.setState({ judul: e.target.value })}
              type="text"
              required=""
            />
          </div>
          <div>
            <label>Deskripsi:</label>
            <textarea
              onChange={(e) => this.setState({ deskripsi: e.target.value })}
              rows={4}
              required=""
              defaultValue={""}
            />
          </div>
          <div>
            <label>Tanggal:</label>
            <input
              onChange={(e) => this.setState({ tanggal: e.target.value })}
              type="date"
              required=""
            />
          </div>
          <div>
            <label>jamMulai:</label>
            <input
              onChange={(e) => this.setState({ jamMulai: e.target.value })}
              type="time"
              required=""
            />
          </div>
          <div>
            <label>jam Selesai:</label>
            <input
              onChange={(e) => this.setState({ jamSelesai: e.target.value })}
              type="time"
              required=""
            />
          </div>
          <div>
            <label>Lokasi:</label>
            <input
              onChange={(e) => this.setState({ lokasi: e.target.value })}
              type="text"
              required=""
            />
          </div>
          <div>
            <label>Target peserta:</label>
            <input
              onChange={(e) => this.setState({ targetPeserta: e.target.value })}
              type="number"
              required=""
            />
          </div>
          <button onClick={this.handleSubmit} type="submit">
            Submit
          </button>
        </form>
      </>
    );
  }
}

export default AddEvenet;
