import { useDispatch } from "react-redux";
import { Container, FormControl } from "react-bootstrap";
import { MdEdit, MdSave } from "react-icons/md";
import { handleChangeNoteUser } from "../../asset/handler&method";
import { useState } from "react";

const AbsenceNote = ({ event, i, el }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  return (
    <Container
      fluid
      className="m-0 p-0 d-flex flex-column justify-content-center"
    >
      <Container fluid className="m-0 p-0 d-flex justify-content-between">
        <p className="m-0 p-0 fw-light" style={{ fontSize: "1em" }}>
          Motivi Assenza:
        </p>
        {isEdit ? (
          <MdSave size={20} onClick={handleEditClick} />
        ) : (
          <MdEdit size={20} onClick={handleEditClick} />
        )}
      </Container>

      {isEdit ? (
        <FormControl
          type="input"
          value={event.note}
          onChange={(e) =>
            dispatch(handleChangeNoteUser(i, e.target.value, el))
          }
        />
      ) : event.note === "" ? (
        <span
          className="m-0 p-0 my-1 fw-lighter border border-1"
          style={{ fontSize: "0.9em" }}
        >
          Nessuna nota
        </span>
      ) : (
        <span
          className="m-0 p-0 my-1 fw-lighter  border border-1"
          style={{ fontSize: "0.9em" }}
        >
          {event.note}
        </span>
      )}
    </Container>
  );
};
export default AbsenceNote;
