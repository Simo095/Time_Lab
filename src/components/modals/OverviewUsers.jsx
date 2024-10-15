import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalStaticUsersChanger } from "../../redux/actions/usersAction";

const OverviewUsers = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.users.usersList);
  const show = useSelector((state) => state.users.handleModalStaticUsers);
  return (
    <Modal
      show={show}
      autoFocus
      fullscreen
      onHide={() => {
        dispatch(modalStaticUsersChanger(false));
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Statistiche di Tutti</Modal.Title>
      </Modal.Header>
      <Modal.Body>{console.log(elements)}</Modal.Body>
    </Modal>
  );
};
export default OverviewUsers;
