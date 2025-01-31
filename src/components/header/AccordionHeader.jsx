import { Accordion, Container } from "react-bootstrap";
import UserTools from "./UserTools";
import { generateYearScheduleNewYear } from "../../asset/handler&method";
import { useDispatch } from "react-redux";

const AccordionHeader = ({ el }) => {
  const dispatch = useDispatch();
  const extendUserSchedule = (user) => {
    const newSchedule = generateYearScheduleNewYear("01/01/2025", 2025);
    const updatedUser = {
      ...user,
      schedule: [...user.schedule, ...newSchedule],
    };
    dispatch(updateUserSchedule(updatedUser));
  };
  return (
    <Accordion.Header>
      <Container className="d-flex justify-content-between">
        <Container className="d-flex gap-4">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="m-0 p-0 fw-lighter fs-6 ">ID: </p>
            <span className="fw-bold">{el.id}</span>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="m-0 p-0 fw-lighter fs-6 ">Utente: </p>{" "}
            <span className="fw-bold">{el.nome}</span>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="m-0 p-0 fw-lighter fs-6 ">Aggiungi 2025 </p>
            <span onClick={() => extendUserSchedule(el)} className="fw-bold">
              +
            </span>
          </div>
        </Container>
        <UserTools el={el} />
      </Container>
    </Accordion.Header>
  );
};
export default AccordionHeader;
