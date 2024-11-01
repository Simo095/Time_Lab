import { Container } from "react-bootstrap";
import { IoMdCloseCircleOutline } from "react-icons/io";

const CardHeader = ({ event, setSelectedDate }) => {
  return (
    <Container className="d-flex flex-column">
      <Container
        style={{ cursor: "pointer" }}
        className="m-0 p-0 mt-2 d-flex justify-content-between"
      >
        <span className="mb-2 text-center">
          {new Date(
            event.giorno.split("/")[2],
            event.giorno.split("/")[1] - 1,
            event.giorno.split("/")[0]
          ).toLocaleDateString("it-IT", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </span>
        <IoMdCloseCircleOutline
          onClick={() => {
            setSelectedDate(null);
          }}
          color="red"
          size={30}
        />
      </Container>
    </Container>
  );
};
export default CardHeader;
