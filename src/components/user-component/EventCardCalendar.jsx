import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import EventCardBody from "./EventCardBody";
import EventCardHeader from "../header/EventCardHeader";

const EventCardCalendar = ({ selectedDate, el, setSelectedDate }) => {
  const elements = useSelector((state) => state.users.usersList);
  return (
    <Container fluid className="m-0 p-0 event-container">
      {elements.length > 0 && selectedDate && (
        <Container>
          <Container className="event-list">
            <Container className="event-cards">
              {el.schedule.map((event, i) =>
                event.giorno === selectedDate.toLocaleDateString("it-IT") ? (
                  <Row key={i} className="event-card d-flex flex-column gap-3">
                    <Col className="event-card-header">
                      <EventCardHeader
                        event={event}
                        el={el}
                        i={i}
                        setSelectedDate={setSelectedDate}
                      />
                    </Col>
                    <Col className="event-card-body">
                      <EventCardBody event={event} i={i} el={el} />
                    </Col>
                    <Col className="event-card-footer"></Col>
                  </Row>
                ) : null
              )}
            </Container>
          </Container>
        </Container>
      )}
    </Container>
  );
};
export default EventCardCalendar;
