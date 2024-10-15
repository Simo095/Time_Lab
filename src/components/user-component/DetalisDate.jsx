import { Container } from "react-bootstrap";
import CardBody from "./CardBody";
import CardHeader from "../header/CardHeader";

const DetailsDate = ({ selectedDate, el, setSelectedDate }) => {
  return (
    <Container className="event-container ms-2">
      {selectedDate &&
        el.schedule.map((event, i) =>
          event.giorno === selectedDate.toLocaleDateString("it-IT") ? (
            <Container key={el.id} className="event-card">
              <CardHeader event={event} setSelectedDate={setSelectedDate} />
              <CardBody event={event} i={i} el={el} />
            </Container>
          ) : null
        )}
    </Container>
  );
};
export default DetailsDate;
