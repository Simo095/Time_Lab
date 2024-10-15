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
import OverviewUsers from "./components/modals/OverviewUsers";
import InputPassword from "./components/InputPassword";

const App = () => {
  const dispatch = useDispatch();
  const password = "";
  const [pw, setPw] = useState("");

  useEffect(() => {
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
          <OverviewUsers />
        </>
      ) : (
        <Container
          style={{ height: "100vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <InputPassword pw={pw} setPw={setPw} />
        </Container>
      )}
    </Container>
  );
};

export default App;
