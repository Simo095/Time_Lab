import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import {
  Accordion,
  Button,
  Container,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import Calendar from "react-calendar";
import { IoPersonAdd } from "react-icons/io5";
import { FaBusinessTime } from "react-icons/fa";
import AddUser from "./modals/AddUser";
function App() {
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  //
  const [value, onChange] = useState(new Date());
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [newElement, setNewElement] = useState({
    id: elements?.length + 1,
    nome: "",
  });
  const [dailyData, setDailyData] = useState({
    giorno: "",
    ingresso: "",
    giustificate: 0,
    note: "",
  });

  // Aggiungi un nuovo elemento
  const addElement = () => {
    setElements([...elements, { ...newElement, dailyRecords: [] }]);
    setNewElement({ id: elements?.length + 2, nome: "" }); //ATTENZIONE +2
  };

  // Aggiungi record giornaliero all'elemento selezionato
  const addDailyRecord = () => {
    const updatedElements = elements.map((el) => {
      if (el.id === selectedElement.id) {
        el.dailyRecords.push({ ...dailyData });
      }
      return el;
    });
    setElements(updatedElements);
    setDailyData({ date: "", ingresso: "", oreGiustificate: 0, note: "" });
  };

  // Seleziona un elemento per aggiungere dati giornalieri
  const selectElement = (element) => {
    setSelectedElement(element);
  };

  // Calcola la somma delle ore giustificate
  const calculateTotalHours = (element) => {
    return element.dailyRecords.reduce(
      (total, record) => total + record.oreGiustificate,
      0
    );
  };

  const handleSave = async () => {
    try {
      const response = await fetch("https://agne-manager.vercel.app/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(elements), // Invia i dati come JSON
      });

      const result = await response.json();
      if (response.ok) {
        console.log("File salvato correttamente:", result.url); // L'URL del file salvato
        alert("File salvato correttamente");
      } else {
        console.error("Errore nel salvataggio:", result.error);
      }
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  const getFileAndAddOldElements = async () => {
    const getFile = await fetch(`https://agne-manager.vercel.app/api/get`, {
      method: "GET",
    });
    if (getFile.ok) {
      const objReq = await getFile.json();
      const url = objReq[0].url;
      const req = await fetch(`${url}`);
      if (req.ok) {
        const oldData = await req.json();
        setElements((prevElements) => [...prevElements, ...oldData]);
        setNewElement({ id: oldData.length + 1, nome: "" });
      }
    }
  };
  useEffect(() => {
    console.log("LOOP IN APP");
    getFileAndAddOldElements();
  }, {});
  return (
    <Container fluid className="m-0 p-0">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Agne-Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item onClick={handleShowAdd}>
                <IoPersonAdd />
              </Nav.Item>
              <Nav.Item>
                <FaBusinessTime />
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {elements && (
        <Container>
          <Button onClick={handleSave}>Save</Button>

          <h2>Lista Elementi</h2>

          <Accordion defaultActiveKey="0">
            {elements.map((el, i) => (
              <Accordion.Item eventKey={i} onClick={() => selectElement(el)}>
                <Accordion.Header>{el.nome}</Accordion.Header>
                <Accordion.Body className="d-flex">
                  <Calendar onChange={onChange} value={value} />
                  <span> Ore Totali del Mese: 30</span>
                  <span>
                    Ore Totali Giustificate: {calculateTotalHours(el)}
                  </span>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>

          {selectedElement && (
            <div>
              <h2>Aggiungi Dati Giornalieri per: {selectedElement.nome}</h2>
              <input
                type="date"
                value={dailyData.date}
                onChange={(e) =>
                  setDailyData({ ...dailyData, date: e.target.value })
                }
              />
              <input
                type="time"
                value={dailyData.ingresso}
                onChange={(e) =>
                  setDailyData({ ...dailyData, ingresso: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Ore Giustificate"
                value={dailyData.oreGiustificate}
                onChange={(e) =>
                  setDailyData({
                    ...dailyData,
                    oreGiustificate: parseFloat(e.target.value),
                  })
                }
              />
              <input
                type="text"
                placeholder="Note"
                value={dailyData.note}
                onChange={(e) =>
                  setDailyData({ ...dailyData, note: e.target.value })
                }
              />
              <button onClick={addDailyRecord}>Aggiungi Dati</button>
            </div>
          )}
        </Container>
      )}
      <AddUser
        showAdd={showAdd}
        handleCloseAdd={handleCloseAdd}
        newElement={newElement}
        setNewElement={setNewElement}
        addElement={addElement}
      />
    </Container>
  );
}

export default App;
