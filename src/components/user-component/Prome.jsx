import { Container } from "react-bootstrap";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { deleteReminder } from "../../redux/actions/usersAction";

const Prome = ({ el }) => {
  const dispatch = useDispatch();
  return (
    <>
      <p className="m-0 p-0 my-1 fw-light">Promemoria per {el.nome}</p>
      {el.reminders && el.reminders.length !== 0 ? (
        el.reminders.map((reminder, i) => (
          <Container
            key={i}
            fluid
            className="m-0 p-0 d-flex justify-content-between"
          >
            <p className="m-0 p-0"> {i + 1}-</p>

            <p className="reminder m-0 p-0 fw-lighter overflow-x-scroll w-75">
              {reminder.split("\n").map((line, index) => (
                <span key={index} className="m-0 p-0">
                  {line}
                  {index < reminder.split("\n").length - 1 && <br />}
                </span>
              ))}
            </p>
            <CiTrash
              className="delete-memo m-0 p-0"
              onClick={() => {
                dispatch(deleteReminder(el.id, reminder));
              }}
            />
          </Container>
        ))
      ) : (
        <p className="m-0 p-0 fw-lighter">Nessun promemoria</p>
      )}
    </>
  );
};
export default Prome;
