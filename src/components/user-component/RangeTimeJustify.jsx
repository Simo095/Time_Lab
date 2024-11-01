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
import { useDispatch } from "react-redux";
import {
  handleChangePresenceUser,
  handleChangeTimeUser,
  handleDeleteTimeUser,
} from "../../asset/handler&method";
import { MdSave } from "react-icons/md";

const RangeTimeJustify = ({ event, el, i }) => {
  const dispatch = useDispatch();

  const [startTimeMornign, setStartTimeMorning] = useState(
    event?.orarioLavorato[0]
  );
  const [endTimeMornign, setEndTimeMorning] = useState(
    event?.orarioLavorato[1]
  );
  const [startTimeEvening, setStartTimeEvening] = useState(
    event?.orarioLavorato[2]
  );
  const [endTimeEvening, setEndTimeEvening] = useState(
    event?.orarioLavorato[3]
  );
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

  const [errorAbsenceMorning, setErrorAbsenceMorning] = useState(
    (startTimeMornign === "" && endTimeMornign === "") ||
      (startTimeMornign === undefined && endTimeMornign === undefined)
      ? true
      : false
  );
  const [errorAbsenceEvening, setErrorAbsenceEvening] = useState(
    (startTimeEvening === "" && endTimeEvening === "") ||
      (startTimeEvening === undefined && endTimeEvening === undefined)
      ? true
      : false
  );

  const calculateLate = () => {
    const orarioTeorico = event.orarioTeorico;
    const arrayPresenceEffective = [
      startTimeMornign,
      endTimeMornign,
      startTimeEvening,
      endTimeEvening,
    ];
    const morningLate = [
      orarioTeorico[0],
      startTimeMornign && startTimeMornign !== ""
        ? startTimeMornign > orarioTeorico[0]
          ? startTimeMornign
          : orarioTeorico[0]
        : orarioTeorico[1],
      orarioTeorico[1],
      endTimeMornign && endTimeMornign !== ""
        ? endTimeMornign < orarioTeorico[1]
          ? endTimeMornign
          : orarioTeorico[1]
        : "",
    ];
    const eveningLate = orarioTeorico[2]
      ? [
          orarioTeorico[2],
          startTimeEvening && startTimeEvening !== ""
            ? startTimeEvening > orarioTeorico[2]
              ? startTimeEvening
              : orarioTeorico[2]
            : orarioTeorico[3],
          orarioTeorico[3],
          endTimeEvening && endTimeEvening !== ""
            ? endTimeEvening < orarioTeorico[3]
              ? endTimeEvening
              : orarioTeorico[3]
            : "",
        ]
      : [];
    const arrayLate = morningLate.concat(eveningLate);

    dispatch(handleChangeTimeUser(i, el, arrayPresenceEffective, arrayLate));
  };
  return (
    <Container fluid className="m-0 p-0">
      <Container className="m-0 p-0 my-1 d-flex justify-content-evenly gap-3">
        <MdSave size={20} onClick={calculateLate} />
        <CiTrash
          color="red"
          size={20}
          onClick={() => {
            dispatch(handleDeleteTimeUser(i, el));
          }}
        />
      </Container>
      <FormGroup controlId="formTimeRangeMorning">
        <Container className="m-0 p-0 d-flex align-items-center gap-3 mt-2">
          <FormLabel className="m-0 p-0 fw-lighter d-flex align-items-center">
            Mattina
          </FormLabel>
          <FormCheck
            value={errorAbsenceMorning}
            style={{
              fontSize: "0.7em",
              fontWeight: "lighter",
            }}
            label="assente?"
            className="d-flex align-items-center m-0 gap-1"
            onClick={(e) => {
              const checked = e.target.checked;
              if (checked && errorAbsenceEvening) {
                dispatch(handleChangePresenceUser(i, el));
              }
            }}
            onChange={(e) => {
              const checked = e.target.checked;
              setErrorAbsenceMorning(checked);
              if (checked) {
                setStartTimeMorning("");
                setEndTimeMorning("");
              } else {
                setStartTimeMorning(event?.orarioTeorico[0]);
                setEndTimeMorning(event?.orarioTeorico[1]);
              }
            }}
          />
        </Container>
        <Container
          fluid
          className="m-0 p-0 mb-3 d-flex align-items-center gap-2"
        >
          <FormControl
            size="sm"
            type="time"
            value={startTimeMornign}
            onChange={handleStartTimeMorningChange}
          />
          <FormControl
            size="sm"
            type="time"
            value={endTimeMornign}
            onChange={handleEndTimeMorningChange}
          />
        </Container>
      </FormGroup>
      {event?.orarioTeorico[2] && (
        <FormGroup controlId="formTimeRangeEvening">
          <Container className="m-0 p-0 d-flex align-items-center gap-3">
            <FormLabel className="m-0 p-0 fw-lighter d-flex align-items-center">
              Pomeriggio
            </FormLabel>
            <FormCheck
              className="d-flex align-items-center m-0 gap-1"
              value={errorAbsenceEvening}
              style={{
                fontSize: "0.7em",
                fontWeight: "lighter",
              }}
              label="assente?"
              onClick={(e) => {
                const checked = e.target.checked;
                if (errorAbsenceMorning && checked) {
                  dispatch(handleChangePresenceUser(i, el));
                }
              }}
              onChange={(e) => {
                const checked = e.target.checked;
                setErrorAbsenceEvening(checked);
                if (checked) {
                  setStartTimeEvening("");
                  setEndTimeEvening("");
                } else {
                  setStartTimeEvening(event?.orarioTeorico[2]);
                  setEndTimeEvening(event?.orarioTeorico[3]);
                }
              }}
            />
          </Container>
          <Container fluid className="m-0 p-0 d-flex align-items-center gap-2">
            <FormControl
              size="sm"
              type="time"
              value={startTimeEvening}
              onChange={handleStartTimeEveningChange}
            />

            <FormControl
              size="sm"
              type="time"
              value={endTimeEvening}
              onChange={handleEndTimeEveningChange}
            />
          </Container>
        </FormGroup>
      )}
    </Container>
  );
};
export default RangeTimeJustify;
