import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import EventCardBody from "./EventCardBody";
import EventCardHeader from "../header/EventCardHeader";

const EventCardCalendar = ({ selectedDate, el, setSelectedDate }) => {
  const elements = useSelector((state) => state.users.usersList);
  return (
    <Container className="event-container ms-2">
      {selectedDate &&
        el.schedule.map((event, i) =>
          event.giorno === selectedDate.toLocaleDateString("it-IT") ? (
            <Row key={el.id} className="event-card d-flex flex-column">
              <Col>
                <EventCardHeader
                  event={event}
                  el={el}
                  i={i}
                  setSelectedDate={setSelectedDate}
                />
              </Col>
              <Col>
                <EventCardBody event={event} i={i} el={el} />
              </Col>
            </Row>
          ) : null
        )}
    </Container>
  );
};
export default EventCardCalendar;
