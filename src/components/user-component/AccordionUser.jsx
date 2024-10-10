import { Accordion } from "react-bootstrap";
import AccordionHeader from "../header/AccordionHeader";
import Calendar from "react-calendar";
import TileContentCalendar from "./TileContentCalendar";
import EventCardCalendar from "./EventCardCalendar";
import { useState } from "react";

const AccordionUser = ({ elements, setElements }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const DateClick = (date) => {
    setSelectedDate(date);
  };
  return (
    <Accordion defaultActiveKey="0">
      {elements.map((el, i) => (
        <Accordion.Item eventKey={i} key={i}>
          <AccordionHeader el={el} />
          <Accordion.Body className="d-flex">
            <Calendar
              onClickDay={DateClick}
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
              elements={elements}
              selectedDate={selectedDate}
              el={el}
              setElements={setElements}
            />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
export default AccordionUser;
