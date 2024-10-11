import { useEffect } from "react";
import { Container } from "react-bootstrap";
import AddUser from "./components/modals/AddUser";
import HeaderBar from "./components/header/HeaderBar";
import HeaderDate from "./components/header/HeaderDate";
import AccordionUser from "./components/user-component/AccordionUser";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import { getFileAndAddOldElements } from "./redux/actions/usersAction";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("LOOP IN APP");
    dispatch(getFileAndAddOldElements());
  }, []);
  return (
    <Container fluid className="App m-0 p-0">
      <HeaderBar />
      <Container>
        <HeaderDate />
        <AccordionUser />
      </Container>
      <AddUser />
    </Container>
  );
};

export default App;
