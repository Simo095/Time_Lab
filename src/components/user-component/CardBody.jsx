import { Container } from "react-bootstrap";
import RangeTimeJustify from "./RangeTimeJustify";
import AbsenceNote from "./AbsenceNote";
import LateState from "./LateState";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { deleteReminder } from "../../redux/actions/usersAction";
import { calculateAbsenceHours } from "../../asset/handler&method";
import JustifyState from "./JustifyState";
import AbsenceState from "./AsenceState";

const CardBody = ({ event, i, el }) => {
  const dispatch = useDispatch();

  const absenceDuration = calculateAbsenceHours(
    event?.orarioRitardo[0],
    event?.orarioRitardo[1],
    event?.orarioRitardo[2],
    event?.orarioRitardo[3]
  );
  const absenceHours = Math.floor(absenceDuration / 60);
  const absenceMinutes = absenceDuration % 60;

  return (
    <Container fluid className="m-0 p-0">
      <AbsenceState event={event} el={el} i={i} />
      {event.assente === false ? (
        <>
          <Container
            style={{
              fontSize: "0.9em",
            }}
            fluid
            className="m-0 p-0 fw-light"
          >
            <p className="m-0 p-0">{event.orarioTeorico.join(" - ")}</p>
          </Container>
          <Container
            fluid
            className="m-0 p-0 d-flex justify-content-start gap-5"
          >
            <LateState event={event} el={el} i={i} />
            {event.ritardo && <JustifyState event={event} i={i} el={el} />}
          </Container>
          <Container className="m-0 p-0 fw-lighter">
            {event.ritardo && (
              <Container fluid className="m-0 p-0 ">
                <p className="m-0 p-0">
                  {event.orarioLavorato.length > 0
                    ? event.orarioLavorato.join(" - ")
                    : "nessun orario inserito"}
                </p>
                <p
                  style={{ fontSize: "0.9em" }}
                  className="fw-lighter m-0 p-0 "
                >
                  Effettivo{" "}
                  <span className="d-inline">
                    ({absenceHours}h {absenceMinutes}m)
                  </span>
                </p>
                <RangeTimeJustify event={event} el={el} i={i} />
              </Container>
            )}
          </Container>
        </>
      ) : (
        <JustifyState event={event} el={el} i={i} />
      )}

      <AbsenceNote event={event} el={el} i={i} />
      <p className="m-0 p-0 my-1 fw-light">Promemoria per {el.nome}</p>
      {el.reminders && el.reminders.length !== 0 ? (
        el.reminders.map((reminder, i) => (
          <Container
            key={i}
            fluid
            className="m-0 p-0 d-flex justify-content-between"
          >
            <p className="m-0 p-0"> {i + 1}-</p>

            <p className="reminder m-0 p-0 fw-lighter overflow-x-scroll w-75">
              {reminder.split("\n").map((line, index) => (
                <span key={index} className="m-0 p-0">
                  {line}
                  {index < reminder.split("\n").length - 1 && <br />}
                </span>
              ))}
            </p>
            <CiTrash
              className="delete-memo m-0 p-0"
              onClick={() => {
                dispatch(deleteReminder(el.id, reminder));
              }}
            />
          </Container>
        ))
      ) : (
        <p className="m-0 p-0 fw-lighter">Nessun promemoria</p>
      )}
    </Container>
  );
};
export default CardBody;
