import "./login.scss";
import { useContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
        // ...
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };
  const handleSignup = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
        // ...
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  };

  return (
    <div className="login">
      <div className="intro">
        <h2>Welcome :)</h2>
        <p>
          This web app is still <strong>work in progress</strong> and is being
          constantly updated.
        </p>
        <p>
          Come on in and test it out by signing up or logging in with the
          credentials below to play with the existing data:
        </p>
        <div className="account">
          <p>
            email: <strong>a@a.com</strong>
          </p>
          <p>
            password: <strong>123123</strong>
          </p>
        </div>
      </div>
      <div className="forms">
        <form onSubmit={handleLogin}>
          <h3>Log in</h3>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log in</button>
          {error && <span>Wrong email or password!</span>}
        </form>
        <form onSubmit={handleSignup}>
          <h3>Sign up</h3>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign up</button>
          {error && <span>Type in your email and password</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
