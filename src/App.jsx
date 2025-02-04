import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import AuthProvider from "./components/AuthProvider";
import Login from "./components/Login";

const App = () => {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.auth.session);
  const password = "1234";
  const [pw, setPw] = useState("");

  useEffect(() => {
    dispatch(getFileAndAddOldElements());
  }, [dispatch]);
  return (
    <AuthProvider>
      <Container fluid className="App m-0 p-0">
        {session ? (
          <>
            <HeaderBar setPw={setPw} />
            <HeaderDate />
            <AccordionUser />
            <AddUser />
            <OverviewUsers />
          </>
        ) : (
          <Login />
        )}
      </Container>
    </AuthProvider>
  );
};

export default App;
