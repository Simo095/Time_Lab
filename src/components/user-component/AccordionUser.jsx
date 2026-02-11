import { useState } from "react";
import { useSelector } from "react-redux";
import { Accordion, Container } from "react-bootstrap";
import AccordionHeader from "../header/AccordionHeader";
import Calendar from "react-calendar";
import TileContentCalendar from "./TileContentCalendar";
import DetailsDate from "./DetalisDate";

const AccordionUser = () => {
  const users = useSelector((state) => state.users.usersList);
  const sortedType = useSelector((state) => state.users.sortedType);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Accordion defaultActiveKey="0">
      {sortedType === "idAsc"
        ? [...users]
            .sort((a, b) => a.id - b.id)
            .map((el, i) => (
              <Accordion.Item eventKey={i} key={el.id}>
                <AccordionHeader el={el} />
                <Accordion.Body className="d-flex flex-column justify-content-center align-items-center gap-3">
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
            ))
        : sortedType === "abs+lat just"
          ? [...users]
              .sort((a, b) => [
                a.totaleAssenzeGiustificati +
                  a.totaleRitardiGiustificati -
                  (b.totaleAssenzeGiustificati + b.totaleRitardiGiustificati),
              ])
              .map((el, i) => (
                <Accordion.Item eventKey={i} key={el.id}>
                  <AccordionHeader el={el} />
                  <Accordion.Body className="d-flex flex-column justify-content-center align-items-center gap-3">
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
                          <TileContentCalendar
                            view={view}
                            el={el}
                            date={date}
                          />
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
              ))
          : sortedType === "abs+lat injust"
            ? [...users]
                .sort((a, b) => [
                  a.totaleAssenze -
                    a.totaleAssenzeGiustificati +
                    (a.totaleRitardi - a.totaleRitardiGiustificati) -
                    (b.totaleAssenze -
                      b.totaleAssenzeGiustificati +
                      b.totaleRitardi -
                      b.totaleRitardiGiustificati),
                ])
                .map((el, i) => (
                  <Accordion.Item eventKey={i} key={el.id}>
                    <AccordionHeader el={el} />
                    <Accordion.Body className="d-flex flex-column justify-content-center align-items-center gap-3">
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
                            <TileContentCalendar
                              view={view}
                              el={el}
                              date={date}
                            />
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
                ))
            : [...users]
                .sort((a, b) => b.id - a.id)
                .map((el, i) => (
                  <Accordion.Item eventKey={i} key={el.id}>
                    <AccordionHeader el={el} />
                    <Accordion.Body className="d-flex flex-column justify-content-center align-items-center gap-3">
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
                            <TileContentCalendar
                              view={view}
                              el={el}
                              date={date}
                            />
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

/* {users.map((el, i) => (
        <Accordion.Item eventKey={i} key={el.id}>
          <AccordionHeader el={el} />
          <Accordion.Body className="d-flex flex-column justify-content-center align-items-center gap-3">
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
      ))} */
