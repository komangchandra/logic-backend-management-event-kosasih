import { Component } from "react";
import { db } from "../config/firebase";
import { collection, add, addDoc } from "firebase/firestore";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: "",
      email: "",
      nomorHp: null,
      password: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { nama, email, nomorHp, password } = this.state;
    try {
      const pelaksana = {
        nama: nama,
        email: email,
        nomorHp: nomorHp,
        password: password,
        foto: "null.jpg",
      };
      const docRef = await addDoc(collection(db, "pelaksanaEvent"), pelaksana);
      console.log("data berhasil disimpan dengan id: ", docRef.id);
    } catch (error) {
      console.error("terjadi error karena: ", error);
    }
  };

  render() {
    return (
      <>
        <h1>register</h1>

        <form>
          <div>
            <label>Nama Lengkap:</label>
            <input
              onChange={(e) => this.setState({ nama: e.target.value })}
              type="text"
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              onChange={(e) => this.setState({ email: e.target.value })}
              type="email"
              required
            />
          </div>
          <div>
            <label>Nomor HP:</label>
            <input
              onChange={(e) => this.setState({ nomorHp: e.target.value })}
              type="number"
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              onChange={(e) => this.setState({ password: e.target.value })}
              type="password"
              required
            />
          </div>
          <button onClick={this.handleSubmit} type="submit">
            Register
          </button>
        </form>
      </>
    );
  }
}

export default Register;
