import { useState } from "react";
import { useSelector } from "react-redux";
import { Accordion, Container } from "react-bootstrap";
import AccordionHeader from "../header/AccordionHeader";
import Calendar from "react-calendar";
import TileContentCalendar from "./TileContentCalendar";
import EventCardCalendar from "./EventCardCalendar";
import EventAccordionHeader from "../header/EventAccordionHeader";

const AccordionUser = () => {
  const elements = useSelector((state) => state.users.usersList);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Accordion defaultActiveKey="0">
      {elements.map((el, i) => (
        <Accordion.Item eventKey={i} key={i}>
          <AccordionHeader el={el} />
          <Accordion.Body className="d-flex flex-column justify-content-center align-items-center gap-3">
            <EventAccordionHeader el={el} />
            <Container fluid className="m-0 p-0 d-flex">
              <Calendar
                className={"h-25 event-container"}
                onClickDay={(date) => {
                  setSelectedDate(date);
                }}
                tileClassName={({ date }) =>
                  selectedDate &&
                  date.toDateString() === selectedDate.toDateString()
                    ? "selected"
                    : ""
                    ? "event-marked"
                    : ""
                }
                tileContent={({ date, view }) => (
                  <TileContentCalendar view={view} el={el} date={date} />
                )}
              />
              <EventCardCalendar
                selectedDate={selectedDate}
                el={el}
                setSelectedDate={setSelectedDate}
              />
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
export default AccordionUser;
