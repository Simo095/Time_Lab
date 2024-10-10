import { Accordion, Container } from "react-bootstrap";
import { TiUserDelete } from "react-icons/ti";

const AccordionHeader = ({ el }) => {
  return (
    <Accordion.Header>
      <Container className="d-flex justify-content-between">
        {el.nome}
        <TiUserDelete size={30} color="red" className="me-5" />
      </Container>
    </Accordion.Header>
  );
};
export default AccordionHeader;
