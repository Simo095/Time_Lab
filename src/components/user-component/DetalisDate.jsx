import { Container } from "react-bootstrap";
import CardBody from "./CardBody";
import CardHeader from "../header/CardHeader";
import { useEffect } from "react";

const DetailsDate = ({ selectedDate, el, setSelectedDate }) => {
  useEffect(() => {
    console.log("LOOOOOOP");
    const handleResize = () => {
      if (window.innerWidth >= 600 && selectedDate !== null) {
        setSelectedDate(null);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [selectedDate, setSelectedDate]);
  return (
    <Container
      className="event-container position-relative"
      style={{
        bottom: window.innerWidth < 570 ? "300px" : "inherit",
        left: window.innerWidth < 570 ? "-70px" : "inherit",
        backgroundColor: window.innerWidth < 570 ? "#198753" : "inherit",
      }}
    >
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
