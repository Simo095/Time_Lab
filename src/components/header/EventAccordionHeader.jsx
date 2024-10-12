import { Container } from "react-bootstrap";
import { TiUserDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import {
  addReminder,
  deleteUser,
  modalStaticUserChanger,
} from "../../redux/actions/usersAction";
import { MdOutlineAutoAwesomeMotion } from "react-icons/md";
import { PiBookBookmarkLight } from "react-icons/pi";
import ShowHistory from "../modals/ShowHistory";

const EventAccordionHeader = ({ el }) => {
  const dispatch = useDispatch();
  const handleDeleteUser = (userId) => {
    const confirmed = window.confirm(
      `Sei sicuro di voler eliminare l'utente ${el.nome}?`
    );
    if (confirmed) {
      dispatch(deleteUser(userId));
    }
  };
  const handleAddReminder = (userId) => {
    const reminder = prompt("Inserisci il promemoria:");
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    const today = new Date();
    const formattedDate = today.toLocaleDateString("it-IT", options);
    if (reminder) {
      dispatch(
        addReminder(userId, formattedDate + " hai scritto:\n" + reminder)
      );
    }
  };

  return (
    <Container
      fluid
      className="m-0 p-0 d-flex justify-content-center align-items-center"
    >
      <Container
        fluid
        className="m-0 p-0 d-flex flex-column justify-content-center align-items-center"
      >
        <TiUserDelete
          size={30}
          color="black"
          className=""
          onClick={() => handleDeleteUser(el.id)}
        />
        <p className="m-0 p-0 fw-lighter fs-6"> Elimina utente</p>
      </Container>
      <Container
        fluid
        className="m-0 p-0 d-flex flex-column justify-content-center align-items-center"
      >
        <MdOutlineAutoAwesomeMotion
          size={30}
          color="black"
          className=""
          onClick={() => handleAddReminder(el.id)}
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
      <ShowHistory el={el} />
    </Container>
  );
};

export default EventAccordionHeader;
