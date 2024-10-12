import { useDispatch } from "react-redux";
import {
  Container,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { handleChangeNoteUser } from "../../asset/handler&method";

const AbsenceNote = ({ event, i, el }) => {
  const dispatch = useDispatch();

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
          onChange={(e) =>
            dispatch(handleChangeNoteUser(i, e.target.value, el))
          }
        />
      </Container>
    </Container>
  );
};
export default AbsenceNote;
