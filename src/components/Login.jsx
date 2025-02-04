import { useState } from "react";
import { useDispatch } from "react-redux";

import { Alert, Container } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { CiAt } from "react-icons/ci";
import { GrLock } from "react-icons/gr";
import { loginUser, resetUser, signupUser } from "../redux/reducers/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEnter, setErrorEnter] = useState(false);
  const [errorReset, setErrorReset] = useState(false);
  const [errorSignup, setErrorSignup] = useState(false);

  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(loginUser(email, password));
  };
  const handleReset = () => {
    dispatch(resetUser(email));
  };
  const handleSignUp = () => {
    dispatch(signupUser(email, password));
  };

  return (
    <Container className="formLogin">
      <h3 className="text-white">Archive Manager</h3>
      <div className="divLabel">
        <label>Email </label>
      </div>
      <div className="inputForm">
        <CiAt size={20} color="white" />
        <input
          autoComplete="none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onClick={() => {
            setErrorEnter(false);
            setErrorReset(false);
            setErrorSignup(false);
          }}
          type="text"
          required
          className="inputLogin"
        />
      </div>

      <div className="divLabel">
        <label>Password </label>
      </div>
      <div className="inputForm">
        <GrLock size={20} color="white" />
        <input
          autoComplete="none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClick={() => {
            setErrorEnter(false);
            setErrorReset(false);
            setErrorSignup(false);
          }}
          type="password"
          className="inputLogin"
          required
        />
      </div>

      <div className="divSpan">
        {!errorReset ? (
          <span
            className="spanLogin"
            onClick={() => {
              if (email !== "") {
                handleReset(email);
              } else {
                setErrorReset(true);
              }
            }}
          >
            Forgot password?
          </span>
        ) : (
          <Alert variant="danger">Ops, E-mail per il recupero, grazie!</Alert>
        )}
      </div>
      {!errorEnter ? (
        <button
          className="button-submit text-center"
          onClick={() => {
            if (email !== "" && password !== "") {
              handleLogin(email, password);
            } else {
              setErrorEnter(true);
            }
          }}
        >
          Sign In
        </button>
      ) : (
        <Alert variant="danger">Ops, E-mail e Password per Accedere!</Alert>
      )}
      <p className="pSpan">
        Don't have an account?
        {!errorSignup ? (
          <span
            onClick={() => {
              if (email !== "" && password !== "") {
                handleSignUp(email, password);
              } else {
                setErrorSignup(true);
              }
            }}
            className="spanLogin"
          >
            Sign Up
          </span>
        ) : (
          <Alert variant="danger">
            Ops, E-mail e Password per Registrarsi!
          </Alert>
        )}
      </p>
      <p className="pSpan line">Or With</p>

      <div className="divSpan">
        <button disabled className="btnLogin google">
          <FcGoogle />
          Google
        </button>
        <button disabled className="btnLogin apple">
          <FaApple />
          Apple
        </button>
      </div>
    </Container>
  );
};
export default Login;
