import { Container } from "react-bootstrap";

const OverviewUser = () => {
  return (
    <Container>
      <p>
        Ore Totali del Mese:
        <span> {""}</span>
      </p>
      <p>
        Ore Totali della Settimana:
        <span> {""}</span>
      </p>
      <p>
        Ore Totali Lavorate del Mese:
        <span>{""}</span>
      </p>
      <p>
        Ore Totali Lavorate della Settimana:
        <span>{""}</span>
      </p>
      <p>
        Ore Totali Giustificate del Mese:
        <span>{""}</span>
      </p>
      <p>
        Ore Totali Giustificate della Settimana:
        <span>{""}</span>
      </p>
    </Container>
  );
};
export default OverviewUser;
