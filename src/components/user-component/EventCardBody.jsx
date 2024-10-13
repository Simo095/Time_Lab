import { Container } from "react-bootstrap";
import RangeTimeJustify from "./RangeTimeJustify";
import AbsenceNote from "./AbsenceNote";
import AbsenceState from "./AbsenceState";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { deleteReminder } from "../../redux/actions/usersAction";
import { getDayForEvent } from "../../asset/handler&method";

const EventCardBody = ({ event, i, el }) => {
  const dispatch = useDispatch();

  return (
    <Container fluid className="m-0 p-0">
      {event.assente === false ? (
        <Container fluid className="m-0 p-0">
          <p
            style={{
              fontSize: "0.8em",
              color: "green",
            }}
          >
            Presente
          </p>
          <p>{event.orarioLavorato.join(" - ")}</p>
        </Container>
      ) : dispatch(getDayForEvent(event.giorno)) === 0 ||
        dispatch(getDayForEvent(event.giorno)) === 6 ? (
        <p
          style={{
            fontSize: "0.8em",
            color: "black",
          }}
        >
          Chiuso
        </p>
      ) : (
        <Container>
          <Container fluid className="m-0 p-0">
            <p
              className="m-0 p-0 mt-2 fw-light"
              style={{
                fontSize: "0.9em",
                color: "red",
              }}
            >
              Inserisci l'orario di assenza
            </p>
            <RangeTimeJustify event={event} el={el} i={i} />
          </Container>

          <Container
            fluid
            className="d-flex flex-column justify-content-between m-0 p-0"
          >
            {event.assente === false ? null : (
              <Container fluid className="m-0 p-0">
                <AbsenceState event={event} el={el} i={i} />
                {event.giustificato === true ? null : null}
                <AbsenceNote event={event} el={el} i={i} />
              </Container>
            )}
          </Container>

          <Container fluid className="m-0 p-0">
            <p className="m-0 p-0 my-1 fw-light">Promemoria per {el.nome}</p>
            {el.reminders && el.reminders.length !== 0 ? (
              el.reminders.map((reminder, i) => (
                <Container
                  fluid
                  className="m-0 p-0 d-flex justify-content-between"
                >
                  <p className="m-0 p-0"> {i + 1}-</p>

                  <p
                    key={i}
                    className="reminder m-0 p-0 fw-lighter overflow-x-scroll w-75"
                  >
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
        </Container>
      )}
    </Container>
  );
};
export default EventCardBody;
