import { Container } from "react-bootstrap";
import CardBody from "./CardBody";
import CardHeader from "../header/CardHeader";

const DetailsDate = ({ selectedDate, el, setSelectedDate }) => {
  return (
    <Container
      className="event-container position-relative"
      style={{
        bottom: window.innerWidth < 575 ? "300px" : "inherit",
        left: window.innerWidth < 575 ? "-30px" : "inherit",
      }}
    >
      {selectedDate &&
        el.schedule.map(
          (event, i) =>
            event.giorno === selectedDate.toLocaleDateString("it-IT") && (
              <Container key={el.id} className="event-card">
                <CardHeader event={event} setSelectedDate={setSelectedDate} />
                <CardBody event={event} i={i} el={el} />
              </Container>
            )
        )}
    </Container>
  );
};
export default DetailsDate;
