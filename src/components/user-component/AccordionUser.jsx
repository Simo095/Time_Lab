import { useState } from "react";
import { useSelector } from "react-redux";
import { Accordion, Container } from "react-bootstrap";
import AccordionHeader from "../header/AccordionHeader";
import Calendar from "react-calendar";
import TileContentCalendar from "./TileContentCalendar";
import DetailsDate from "./DetalisDate";
import UserTools from "../header/UserTools";

const AccordionUser = () => {
  const elements = useSelector((state) => state.users.usersList);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Accordion defaultActiveKey="0">
      {elements.map((el, i) => (
        <Accordion.Item eventKey={i} key={el.id}>
          <AccordionHeader el={el} />
          <Accordion.Body className="d-flex flex-column justify-content-center align-items-center gap-3">
            <UserTools el={el} />
            <Container fluid className="container-calendarDetails">
              <Calendar
                className={"h-25 event-container position-relative"}
                onClickDay={(date) => {
                  setSelectedDate(date);
                }}
                tileClassName={({ date }) =>
                  selectedDate &&
                  date.toDateString() === selectedDate.toDateString()
                    ? "selected"
                    : ""
                }
                tileContent={({ date, view }) => (
                  <TileContentCalendar view={view} el={el} date={date} />
                )}
              />
              <DetailsDate
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
