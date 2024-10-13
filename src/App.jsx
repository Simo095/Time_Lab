import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import AddUser from "./components/modals/AddUser";
import HeaderBar from "./components/header/HeaderBar";
import HeaderDate from "./components/header/HeaderDate";
import AccordionUser from "./components/user-component/AccordionUser";
import { getFileAndAddOldElements } from "./redux/actions/usersAction";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";

const App = () => {
  const dispatch = useDispatch();
  const password = "03011997";
  const [pw, setPw] = useState("");

  useEffect(() => {
    console.log("LOOP IN APP");
    dispatch(getFileAndAddOldElements());
  }, [dispatch]);
  return (
    <Container fluid className="App m-0 p-0">
      {pw === password ? (
        <>
          <HeaderBar setPw={setPw} />
          <HeaderDate />
          <Container className="">
            <AccordionUser />
          </Container>
          <AddUser />
        </>
      ) : (
        <Container
          style={{ height: "100vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="group">
            <svg
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></path>
            </svg>
            <input
              className="input"
              type="password"
              placeholder="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
              }}
            />
          </div>
        </Container>
      )}
    </Container>
  );
};

export default App;
