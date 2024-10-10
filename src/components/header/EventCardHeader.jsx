import { Container, FormCheck } from "react-bootstrap";

const EventCardHeader = ({ event, el, i, setElements }) => {
  const handleChangePresenceUser = (elementId, eventIndex) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === elementId
          ? {
              ...el,
              schedule: el.schedule.map((event, i) =>
                i === eventIndex ? { ...event, assente: !event.assente } : event
              ),
            }
          : el
      )
    );
  };
  return (
    <Container className="d-flex flex-column">
      <span className="event-date">{event.giorno}</span>
      <FormCheck
        type="switch"
        id={el.id}
        label={event.assente === false ? "Presente" : "Assente"}
        checked={event.assente}
        onChange={() => handleChangePresenceUser(el.id, i)}
        className="fs-6 fw-lighter"
      />
    </Container>
  );
};
export default EventCardHeader;
