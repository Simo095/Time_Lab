import { Container } from "react-bootstrap";
import RangeTimeJustify from "./RangeTimeJustify";
import AbsenceNote from "./AbsenceNote";
import LateState from "./LateState";
import { calculateAbsenceHours } from "../../asset/handler&method";
import JustifyState from "./JustifyState";
import AbsenceState from "./AsenceState";
import Prome from "./Prome";

const CardBody = ({ event, i, el }) => {
  const absenceDuration = calculateAbsenceHours(event?.orarioRitardo);
  const absenceHours = absenceDuration.hours;
  const absenceMinutes = absenceDuration.minutes;

  return (
    <Container fluid className="m-0 p-0">
      <AbsenceState event={event} el={el} i={i} />
      {event.assente === false ? (
        <>
          <p
            style={{
              fontSize: "0.9em",
            }}
            className="m-0 p-0 fw-light"
          >
            {event.orarioTeorico.join(" - ")} - Teorico
          </p>

          <Container
            fluid
            className="m-0 p-0 d-flex justify-content-start gap-5"
          >
            <LateState event={event} el={el} i={i} />
            {event.ritardo && <JustifyState event={event} i={i} el={el} />}
          </Container>

          {event.ritardo && (
            <>
              <p
                style={{ fontSize: "0.9em" }}
                className="m-0 p-0 fw-lighter d-inline"
              >
                {event.orarioLavorato.length > 0
                  ? event.orarioLavorato.join(" - ") + " - Effettivo "
                  : "nessun orario inserito"}
              </p>
              <span
                className="m-0 p-0 fw-lighter"
                style={{
                  color:
                    absenceHours === 0 && absenceMinutes === 0
                      ? "red"
                      : "black",
                  fontSize: "0.9em",
                }}
              >
                ({absenceHours}h {absenceMinutes}m)
              </span>
              <p style={{ fontSize: "0.9em" }} className="fw-lighter m-0 p-0 ">
                <span style={{ color: "red" }}>
                  {absenceHours === 0 && absenceMinutes === 0
                    ? "Ricorda di salvare i dati "
                    : ""}
                </span>
              </p>
              <RangeTimeJustify event={event} el={el} i={i} />
            </>
          )}
        </>
      ) : (
        <JustifyState event={event} el={el} i={i} />
      )}

      <AbsenceNote event={event} el={el} i={i} />
      <Prome el={el} />
    </Container>
  );
};
export default CardBody;
