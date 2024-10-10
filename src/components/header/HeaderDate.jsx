import { Container } from "react-bootstrap";

const HeaderDate = () => {
  const handlerNameMonth = () => {
    const date = new Date().getMonth();
    return date === 0
      ? "Gennaio"
      : date === 1
      ? "Febbraio"
      : date === 2
      ? "Marzo"
      : date === 3
      ? "Aprile"
      : date === 4
      ? "Maggio"
      : date === 5
      ? "Giugno"
      : date === 6
      ? "Luglui"
      : date === 7
      ? "Agosto"
      : date === 8
      ? "Settembre"
      : date === 9
      ? "Ottobre"
      : date === 10
      ? "Novembre"
      : date === 11
      ? "Dicembre"
      : "";
  };

  return (
    <Container fluid className="m-0 p-0">
      {" "}
      <p className="m-0 p-0">Oggi è </p>
      <h2>
        {new Date().getDate() +
          " " +
          handlerNameMonth() +
          " " +
          new Date().getFullYear()}
      </h2>
    </Container>
  );
};
export default HeaderDate;
