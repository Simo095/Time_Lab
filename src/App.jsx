import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import {
  Accordion,
  Button,
  Col,
  Container,
  Nav,
  Navbar,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import Calendar from "react-calendar";
import { IoPersonAdd } from "react-icons/io5";
import { FaBusinessTime } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import AddUser from "./modals/AddUser";
import AddMonthlyTimetable from "./modals/AddMonthlyTimetable";
import { GiSave } from "react-icons/gi";
import { VscSaveAs } from "react-icons/vsc";

function App() {
  // Array dei giorni della settimana
  const daysOfWeek = [
    "lunedì",
    "martedì",
    "mercoledì",
    "giovedì",
    "venerdì",
    "sabato",
    "domenica",
  ];

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

  // Stato per gestire le ore per ciascun giorno
  const [hoursPerDay, setHoursPerDay] = useState({
    mese: handlerNameMonth(),
    lunedì: 0,
    martedì: 0,
    mercoledì: 0,
    giovedì: 0,
    venerdì: 0,
    sabato: 0,
    domenica: 0,
  });

  // Funzione per aggiornare le ore per ogni giorno
  const handleHoursChange = (day, value) => {
    setHoursPerDay((prevHours) => ({
      ...prevHours,
      [day]: value,
    }));
  };

  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const [showAddM, setShowAddM] = useState(false);
  const handleCloseAddM = () => setShowAddM(false);
  const handleShowAddM = () => setShowAddM(true);

  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const DateClick = (date) => {
    setSelectedDate(date);
  };

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

  const addElement = () => {
    setElements([...elements, { ...newElement, dailyRecords: [] }]);
    setNewElement({ id: elements?.length + 2, nome: "" });
  };

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

  const selectElement = (element) => {
    setSelectedElement(element);
  };

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

  // const getFileAndAddOldElements = async () => {
  //   const getFile = await fetch(`https://agne-manager.vercel.app/api/get`, {
  //     method: "GET",
  //   });
  //   if (getFile.ok) {
  //     const objReq = await getFile.json();
  //     const url = objReq[0].url;
  //     const req = await fetch(`${url}`);
  //     if (req.ok) {
  //       const oldData = await req.json();
  //       setElements((prevElements) => [...prevElements, ...oldData]);
  //       setNewElement({ id: oldData.length + 1, nome: "" });
  //     }
  //   }
  // };

  useEffect(() => {
    console.log("LOOP IN APP");
    //getFileAndAddOldElements();
  }, []);
  return (
    <Container fluid className="m-0 p-0">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Agne-Manager</Navbar.Brand>
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
                overlay={
                  <Tooltip id="change-time">
                    Modifica orario settimanale del mese
                  </Tooltip>
                }
              >
                <Nav.Item onClick={handleShowAddM}>
                  <FaBusinessTime size={30} />
                </Nav.Item>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 200 }}
                overlay={<Tooltip id="change-time">Salva le modifiche</Tooltip>}
              >
                <Nav.Item onClick={handleSave}>
                  <GiSave size={30} />
                </Nav.Item>
              </OverlayTrigger>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {elements && (
        <Container>
          <h2>Lista Elementi</h2>
          <Accordion defaultActiveKey="0">
            {elements.map((el, i) => (
              <Accordion.Item
                eventKey={i}
                onClick={() => selectElement(el)}
                key={i}
              >
                <Accordion.Header>
                  <Container className="d-flex justify-content-between">
                    {el.nome}
                    <TiUserDelete size={30} color="red" className="me-5" />
                  </Container>
                </Accordion.Header>
                <Accordion.Body className="d-flex">
                  <Calendar
                    onChange={onChange}
                    value={value}
                    onClickDay={DateClick}
                    tileClassName={({ date }) =>
                      selectedDate &&
                      date.toDateString() === selectedDate.toDateString()
                        ? "selected"
                        : null
                        ? "event-marked"
                        : ""
                    }
                    tileContent={({ date, view }) => {
                      return view === "month";
                    }}
                  />
                  <div className="event-container">
                    {
                      <>
                        <div className="event-list">
                          <div className="event-cards">
                            {selectedDate &&
                            selectedDate.toLocaleDateString("fr-CA") ? (
                              <Row className="event-card d-flex flex-column gap-3">
                                <Col className="event-card-header">
                                  <Row className="d-flex flex-column gap-2">
                                    <Col>
                                      <span className="event-date">
                                        {selectedDate.toLocaleDateString(
                                          "fr-CA"
                                        )}
                                      </span>
                                    </Col>
                                    <Col className="event-card-body">
                                      event card body
                                    </Col>
                                    <Col
                                      style={{ zIndex: 9999999999 }}
                                      className="d-flex justify-content-between"
                                    >
                                      ore
                                      <OverlayTrigger
                                        placement="left"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={
                                          <Tooltip id="add-user">
                                            Aggiungi Utente
                                          </Tooltip>
                                        }
                                      >
                                        <Button
                                          style={{
                                            background: "#00000000",
                                            border: "none",
                                          }}
                                        >
                                          <VscSaveAs
                                            color="black"
                                            className="update-btn"
                                          />
                                        </Button>
                                      </OverlayTrigger>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            ) : null}
                          </div>
                        </div>
                      </>
                    }
                  </div>

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
                value={dailyData.giustificate}
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
      <AddMonthlyTimetable
        showAddM={showAddM}
        handleCloseAddM={handleCloseAddM}
        handleShowAddM={handleShowAddM}
        handlerNameMonth={handlerNameMonth}
        daysOfWeek={daysOfWeek}
        hoursPerDay={hoursPerDay}
        handleHoursChange={handleHoursChange}
      />
    </Container>
  );
}

export default App;
