import { useDispatch } from "react-redux";
import { Container, FormCheck } from "react-bootstrap";
import {} from "../../redux/actions/usersAction";
import {
  getDayForEvent,
  handleChangePresenceUser,
} from "../../asset/handler&method";
import { IoMdCloseCircleOutline } from "react-icons/io";

const EventCardHeader = ({ event, el, i, setSelectedDate }) => {
  const dispatch = useDispatch();
  return (
    <Container className="d-flex flex-column">
      <Container
        style={{ cursor: "pointer" }}
        className="m-0 p-0 mt-2 d-flex justify-content-between"
        onClick={() => {
          setSelectedDate(null);
        }}
      >
        <span className="mb-2 text-center">
          {new Date(
            event.giorno.split("/")[2],
            event.giorno.split("/")[1] - 1,
            event.giorno.split("/")[0]
          ).toLocaleDateString("it-IT", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </span>
        <IoMdCloseCircleOutline color="red" size={20} />
      </Container>

      {dispatch(getDayForEvent(event.giorno)) === 0 ||
      dispatch(getDayForEvent(event.giorno)) === 6 ? null : (
        <FormCheck
          type="switch"
          id={el.id}
          label={event.assente === false ? "Presente" : "Assente"}
          checked={event.assente}
          onChange={() => dispatch(handleChangePresenceUser(i, el))}
          className="fs-6 fw-lighter"
        />
      )}
    </Container>
  );
};
export default EventCardHeader;
