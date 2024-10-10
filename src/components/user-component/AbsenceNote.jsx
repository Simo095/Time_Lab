import { Tooltip } from "bootstrap";
import { Container, FormControl, OverlayTrigger } from "react-bootstrap";
import { MdEdit } from "react-icons/md";

const AbsenceNote = ({ event, i, el, setElements }) => {
  const handleChangeNoteUser = (elementId, eventIndex, comment) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === elementId
          ? {
              ...el,
              schedule: el.schedule.map((event, i) =>
                i === eventIndex ? { ...event, note: comment } : event
              ),
            }
          : el
      )
    );
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
          placement="bottom"
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
          onChange={(e) => handleChangeNoteUser(el.id, i, e.target.value)}
        />
      </Container>
    </Container>
  );
};
export default AbsenceNote;
