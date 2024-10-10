import {
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { GiSave } from "react-icons/gi";
import { IoPersonAdd } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";

const HeaderBar = ({ handleShowAdd, handleSave }) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Utenti</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-center w-50">
          <Nav className="d-flex gap-3">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 100, hide: 200 }}
              overlay={<Tooltip id="add-user">Aggiungi Utente</Tooltip>}
            >
              <Nav.Item onClick={handleShowAdd}>
                <IoPersonAdd size={30} />
              </Nav.Item>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 100, hide: 200 }}
              overlay={<Tooltip id="save">Salva le modifiche</Tooltip>}
            >
              <Nav.Item onClick={handleSave}>
                <GiSave size={30} />
              </Nav.Item>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 100, hide: 200 }}
              overlay={<Tooltip id="history-time">Un po' di Dati</Tooltip>}
            >
              <Nav.Item>
                <MdMenuBook size={30} />
              </Nav.Item>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default HeaderBar;
