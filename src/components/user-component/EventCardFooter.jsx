import { Container } from "react-bootstrap";
import { TiUserDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/actions/usersAction";

const EventCardFooter = ({ el }) => {
  const dispatch = useDispatch();
  const handleDeleteUser = (userId) => {
    const confirmed = window.confirm(
      `Sei sicuro di voler eliminare l'utente ${el.nome}?`
    );
    if (confirmed) {
      dispatch(deleteUser(userId));
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
          color="red"
          className=""
          onClick={() => handleDeleteUser(el.id)}
        />
        <p className="m-0 p-0 fw-lighter fs-6"> Elimina utente</p>
      </Container>
    </Container>
  );
};

export default EventCardFooter;
