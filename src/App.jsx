import { useEffect } from "react";
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

  useEffect(() => {
    console.log("LOOP IN APP");
    dispatch(getFileAndAddOldElements());
  }, []);
  return (
    <Container fluid className="App m-0 p-0">
      <HeaderBar />
      <HeaderDate />
      <Container className="">
        <AccordionUser />
      </Container>
      <AddUser />
    </Container>
  );
};

export default App;
