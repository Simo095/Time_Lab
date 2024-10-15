import { Container } from "react-bootstrap";
import { TiUserDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { modalStaticUserChanger } from "../../redux/actions/usersAction";
import { MdOutlineAutoAwesomeMotion } from "react-icons/md";
import { PiBookBookmarkLight } from "react-icons/pi";
import OverviewUser from "../modals/OverviewUser";
import {
  handleAddReminder,
  handleDeleteUser,
} from "../../asset/handler&method";

const UserTools = ({ el }) => {
  const dispatch = useDispatch();

  return (
    <Container
      fluid
      className="m-0 p-0 d-flex justify-content-center align-items-center"
    >
      <Container
        fluid
        className="m-0 p-0 d-flex flex-column justify-content-center align-items-center"
      >
        <MdOutlineAutoAwesomeMotion
          size={30}
          color="black"
          className=""
          onClick={() => dispatch(handleAddReminder(el))}
        />
        <p className="m-0 p-0 fw-lighter fs-6"> Aggiungi promemoria</p>
      </Container>
      <Container
        fluid
        className="m-0 p-0 d-flex flex-column justify-content-center align-items-center"
      >
        <PiBookBookmarkLight
          size={30}
          color="black"
          className=""
          onClick={() => dispatch(modalStaticUserChanger(true))}
        />
        <p className="m-0 p-0 fw-lighter fs-6"> Visualizza Statistiche</p>
      </Container>
      <Container
        fluid
        className="m-0 p-0 d-flex flex-column justify-content-center align-items-center"
      >
        <TiUserDelete
          size={30}
          color="black"
          cursor={"pointer"}
          className=""
          onClick={() => dispatch(handleDeleteUser(el))}
        />
        <p className="m-0 p-0 fw-lighter fs-6"> Elimina utente</p>
      </Container>
      <OverviewUser el={el} />
    </Container>
  );
};

export default UserTools;
