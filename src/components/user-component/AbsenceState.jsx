import { Container, FormCheck } from "react-bootstrap";

const AbsenceState = ({ event, i, el, setElements }) => {
  const handleChangeJustifyUser = (elementId, eventIndex) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === elementId
          ? {
              ...el,
              schedule: el.schedule.map((event, i) =>
                i === eventIndex
                  ? { ...event, giustificato: !event.giustificato }
                  : event
              ),
            }
          : el
      )
    );
  };

  return (
    <Container fluid className="m-0 p-0">
      <FormCheck
        type="switch"
        id={toString(el.id) + "-justify"}
        label={event.giustificato === false ? "Giustificato" : "Ingiustificato"}
        checked={event.giustificato}
        onChange={() => handleChangeJustifyUser(el.id, i)}
        className="fs-6 fw-lighter"
      />
    </Container>
  );
};
export default AbsenceState;
