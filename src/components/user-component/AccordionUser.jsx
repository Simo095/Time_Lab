import { useState } from "react";
import { useSelector } from "react-redux";
import { Accordion } from "react-bootstrap";
import AccordionHeader from "../header/AccordionHeader";
import Calendar from "react-calendar";
import TileContentCalendar from "./TileContentCalendar";
import EventCardCalendar from "./EventCardCalendar";

const AccordionUser = () => {
  const elements = useSelector((state) => state.users.usersList);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Accordion defaultActiveKey="0">
      {elements.map((el, i) => (
        <Accordion.Item eventKey={i} key={i}>
          <AccordionHeader el={el} />
          <Accordion.Body className="d-flex">
            <Calendar
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
            <EventCardCalendar selectedDate={selectedDate} el={el} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
export default AccordionUser;
