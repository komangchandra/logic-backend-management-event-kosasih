import { Component } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const pelaksanaCollection = collection(db, "pelaksanaEvent");
      const q = query(
        pelaksanaCollection,
        where("email", "==", email),
        where("password", "==", password),
        limit(1)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const userId = snapshot.docs[0].id;
        console.log(userId);
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("userID", userId);
        sessionStorage.setItem("userEmail", email);
        window.location.href = `/events`;
      } else {
        console.log("User not found");
        return null;
      }
    } catch (error) {
      console.error("Error finding user:", error);
      throw error;
    }
  };

  render() {
    return (
      <>
        <h3>Login</h3>
        <form>
          <div>
            <label>Email:</label>
            <input
              onChange={(e) => this.setState({ email: e.target.value })}
              type="email"
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
          <button onClick={this.handleLogin} type="submit">
            Register
          </button>
        </form>
      </>
    );
  }
}

export default Login;
