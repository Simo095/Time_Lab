import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFileAndAddOldElements } from "./redux/actions/usersAction";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import AddUser from "./components/modals/AddUser";
import HeaderBar from "./components/header/HeaderBar";
import HeaderDate from "./components/header/HeaderDate";
import AccordionUser from "./components/user-component/AccordionUser";
import OverviewUsers from "./components/modals/OverviewUsers";

const App = () => {
  const dispatch = useDispatch();
  // const session = useSelector((state) => state.auth.session);

  useEffect(() => {
    dispatch(getFileAndAddOldElements());
  }, [dispatch]);
  return (
    // <AuthProvider>
    //   <Container fluid className="App m-0 p-0">
    //     {session ? (
    <>
      <HeaderBar />
      <HeaderDate />
      <AccordionUser />
      <AddUser />
      <OverviewUsers />
    </>
    // ) : (
    //   <Login />
    // )}
    //   </Container>
    // </AuthProvider>
  );
};

export default App;
