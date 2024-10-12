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
            key={i}
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
          key={i}
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
              className="m-0 p-0 fw-lighter"
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

          <Container className="">
            <h6 className="fw-lighter">Promemoria per {el.nome}</h6>
            {el.reminders &&
              el.reminders.map((reminder, i) => (
                <Container
                  fluid
                  className="m-0 p-0 d-flex align-items-center justify-content-between"
                >
                  <p> {i + 1}-</p>
                  <p
                    key={i}
                    className="reminder m-0 p-0 fw-lighter overflow-x-scroll w-75"
                  >
                    {reminder.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < reminder.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <CiTrash
                    className="delete-memo"
                    onClick={() => {
                      dispatch(deleteReminder(el.id, reminder));
                    }}
                  />
                </Container>
              ))}
          </Container>
        </Container>
      )}
    </Container>
  );
};
export default EventCardBody;
