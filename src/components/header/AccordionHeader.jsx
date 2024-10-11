import { Accordion, Container } from "react-bootstrap";

const AccordionHeader = ({ el }) => {
  return (
    <Accordion.Header>
      <Container className="d-flex justify-content-between">
        <Container className="d-flex gap-4">
          <p className="m-0 p-0 fw-lighter fs-6 d-flex flex-column justify-content-center align-items-center">
            ID: <span className="fw-bold">{el.id}</span>
          </p>
          <p className="m-0 p-0 fw-lighter fs-6 d-flex flex-column justify-content-center align-items-center">
            Utente: <span className="fw-bold">{el.nome}</span>
          </p>
        </Container>
      </Container>
    </Accordion.Header>
  );
};
export default AccordionHeader;
