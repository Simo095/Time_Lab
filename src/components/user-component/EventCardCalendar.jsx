import { Col, Container, Row } from "react-bootstrap";
import OverviewUser from "./OverviewUser";
import EventCardBody from "./EventCardBody";
import EventCardHeader from "../header/EventCardHeader";

const EventCardCalendar = ({ elements, selectedDate, el, setElements }) => {
  return (
    <Container className="event-container">
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
                        setElements={setElements}
                      />
                    </Col>
                    <Col className="event-card-body">
                      <EventCardBody
                        event={event}
                        i={i}
                        el={el}
                        setElements={setElements}
                      />
                    </Col>
                    <Col className="event-card-footer"></Col>
                  </Row>
                ) : null
              )}
            </Container>
          </Container>
        </Container>
      )}

      <OverviewUser />
    </Container>
  );
};
export default EventCardCalendar;
