import { useDispatch } from "react-redux";
import {
  Container,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { updateUserSchedule } from "../../redux/actions/usersAction";

const AbsenceNote = ({ event, i, el }) => {
  const dispatch = useDispatch();
  const handleChangeNoteUser = (eventIndex, comment) => {
    const updatedUser = {
      ...el,
      schedule: el.schedule.map((ev, idx) =>
        idx === eventIndex ? { ...ev, note: comment } : ev
      ),
    };
    dispatch(updateUserSchedule(updatedUser));
  };
  return (
    <Container
      fluid
      className="m-0 p-0 d-flex flex-column justify-content-between align-items-center "
    >
      <p className="m-0 p-0 fw-lighter" style={{ fontSize: "0.8em" }}>
        Motivi Assenza:
        <br />
        <span className="m-0 p-0">{event.note}</span>
      </p>

      <Container fluid className="m-0 p-0">
        <OverlayTrigger
          placement="top"
          delay={{
            show: 100,
            hide: 200,
          }}
          overlay={<Tooltip id="change-note">Modifica Note</Tooltip>}
        >
          <MdEdit size={20} />
        </OverlayTrigger>
        <FormControl
          type="input"
          value={event.note}
          onChange={(e) => handleChangeNoteUser(i, e.target.value)}
        />
      </Container>
    </Container>
  );
};
export default AbsenceNote;
