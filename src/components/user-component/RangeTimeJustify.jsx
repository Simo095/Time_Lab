import { useState } from "react";
import { Container, FormControl, FormGroup } from "react-bootstrap";
import { FaBusinessTime } from "react-icons/fa";

const RangeTimeJustify = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };
  return (
    <Container fluid className="m-0 p-0">
      <FormGroup controlId="formTimeRange">
        <Container className="d-flex align-items-center gap-2">
          <FormControl
            type="time"
            value={startTime}
            onChange={handleStartTimeChange}
          />
          <span> - </span>
          <FormControl
            type="time"
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </Container>
      </FormGroup>
      <FaBusinessTime size={20} />
    </Container>
  );
};
export default RangeTimeJustify;
