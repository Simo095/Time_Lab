import { Accordion, Container } from "react-bootstrap";
import UserTools from "./UserTools";

const AccordionHeader = ({ el }) => {
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
        </Container>
        <UserTools el={el} />
      </Container>
    </Accordion.Header>
  );
};
export default AccordionHeader;
