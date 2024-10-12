import { useState } from "react";
import {
  Container,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { CiTrash } from "react-icons/ci";
import { FaBusinessTime } from "react-icons/fa";
import { updateUserSchedule } from "../../redux/actions/usersAction";
import { useDispatch } from "react-redux";

const RangeTimeJustify = ({ event, el, i }) => {
  const dispatch = useDispatch();
  const [startTimeMornign, setStartTimeMorning] = useState(
    event?.orarioTeorico[0]
  );
  const [endTimeMornign, setEndTimeMorning] = useState(event?.orarioTeorico[1]);
  const [startTimeEvening, setStartTimeEvening] = useState(
    event?.orarioTeorico[2]
  );
  const [endTimeEvening, setEndTimeEvening] = useState(event?.orarioTeorico[3]);

  const handleStartTimeMorningChange = (e) => {
    setStartTimeMorning(e.target.value);
  };
  const handleStartTimeEveningChange = (e) => {
    setStartTimeEvening(e.target.value);
  };

  const handleEndTimeMorningChange = (e) => {
    setEndTimeMorning(e.target.value);
  };
  const handleEndTimeEveningChange = (e) => {
    setEndTimeEvening(e.target.value);
  };

  const calculateAbsenceHours = (
    startTimeM,
    endTimeM,
    startTimeE,
    endTimeE
  ) => {
    if ((!startTimeM || !endTimeM) && (!startTimeE || !endTimeE)) {
      return 0;
    } else if (!startTimeE || !endTimeE) {
      const startParts = startTimeM.split(":");
      const endParts = endTimeM.split(":");
      const startMinutes =
        parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
      const endMinutes = parseInt(endParts[0]) * 60 + parseInt(endParts[1]);
      return Math.max(endMinutes - startMinutes, 0);
    } else {
      const startPartsM = startTimeM.split(":");
      const endPartsM = endTimeM.split(":");
      const startPartsE = startTimeE.split(":");
      const endPartsE = endTimeE.split(":");
      const startMinutes =
        parseInt(startPartsM[0]) * 60 +
        parseInt(startPartsM[1]) +
        parseInt(startPartsE[0]) * 60 +
        parseInt(startPartsE[1]);
      const endMinutes =
        parseInt(endPartsM[0]) * 60 +
        parseInt(endPartsM[1]) +
        parseInt(endPartsE[0]) * 60 +
        parseInt(endPartsE[1]);
      return Math.max(endMinutes - startMinutes, 0);
    }
  };

  const absenceDuration = calculateAbsenceHours(
    event.orarioAssente[0],
    event.orarioAssente[1],
    event.orarioAssente[2],
    event.orarioAssente[3]
  );
  const absenceHours = Math.floor(absenceDuration / 60);
  const absenceMinutes = absenceDuration % 60;

  const handleChangeTimeUser = (eventIndex) => {
    if (startTimeMornign === "" || endTimeMornign === "") return;
    const arrayAbsence = [
      startTimeMornign,
      endTimeMornign,
      startTimeEvening && startTimeEvening,
      endTimeEvening && endTimeEvening,
    ];
    const updatedUser = {
      ...el,
      schedule: el.schedule.map((ev, idx) =>
        idx === eventIndex ? { ...ev, orarioAssente: arrayAbsence } : ev
      ),
    };
    dispatch(updateUserSchedule(updatedUser));
  };

  return (
    <Container fluid className="m-0 p-0">
      <FormGroup controlId="formTimeRange">
        <FormLabel className="m-0 p-0 mt-3 fw-lighter">Mattina</FormLabel>
        <Container className="m-0 p-0 d-flex align-items-center gap-2">
          <FormCheck
            onClick={(e) => {
              if (e.target.checked) {
                setStartTimeMorning("");
                setEndTimeMorning("");
              } else {
                setStartTimeMorning(event?.orarioTeorico[0]);
                setEndTimeMorning(event?.orarioTeorico[1]);
              }
            }}
          />
          <p style={{ fontSize: "0.7em" }} className="fw-lighter m-0 p-0">
            0 Ore
          </p>
        </Container>
        <Container fluid className="m-0 p-0 d-flex align-items-center gap-2">
          <FormControl
            type="time"
            value={startTimeMornign}
            onChange={handleStartTimeMorningChange}
          />
          <span> - </span>
          <FormControl
            type="time"
            value={endTimeMornign}
            onChange={handleEndTimeMorningChange}
          />
        </Container>
      </FormGroup>
      {event?.orarioTeorico[2] && (
        <FormGroup controlId="formTimeRange">
          <FormLabel className="m-0 p-0 mt-3 fw-lighter">Pomeriggio</FormLabel>

          <Container className="m-0 p-0 d-flex align-items-center gap-2">
            <FormCheck
              onClick={(e) => {
                if (e.target.checked) {
                  setStartTimeEvening("");
                  setEndTimeEvening("");
                } else {
                  setStartTimeEvening(event?.orarioTeorico[2]);
                  setEndTimeEvening(event?.orarioTeorico[3]);
                }
              }}
            />
            <p style={{ fontSize: "0.7em" }} className="fw-lighter m-0 p-0">
              0 Ore
            </p>
          </Container>
          <Container fluid className="m-0 p-0 d-flex align-items-center gap-2">
            <FormControl
              type="time"
              value={startTimeEvening}
              onChange={handleStartTimeEveningChange}
            />
            <span> - </span>
            <FormControl
              type="time"
              value={endTimeEvening}
              onChange={handleEndTimeEveningChange}
            />
          </Container>
        </FormGroup>
      )}

      <div className="d-flex justify-content-between">
        orario di assenza: <br />
        <span>
          ({absenceHours}h {absenceMinutes}m)
        </span>
        <FaBusinessTime
          size={20}
          onClick={() => {
            handleChangeTimeUser(i);
          }}
        />
        <CiTrash color="red" size={20} />
      </div>
    </Container>
  );
};
export default RangeTimeJustify;
