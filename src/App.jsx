import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import { Accordion, Button, Container } from "react-bootstrap";

function App() {
  //
  const [value, onChange] = useState < Value > new Date();
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
    <Container>
      {elements && (
        <div>
          <Button onClick={handleSave}>Save</Button>
          <h1>Gestione Elementi</h1>
          {/* Form per aggiungere un nuovo elemento */}
          <input
            type="text"
            placeholder="ID"
            value={newElement.id}
            onChange={(e) =>
              setNewElement({ ...newElement, id: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Nome"
            value={newElement.nome}
            onChange={(e) =>
              setNewElement({ ...newElement, nome: e.target.value })
            }
          />
          <Button onClick={addElement}>Aggiungi Elemento</Button>

          <h2>Lista Elementi</h2>

          <Accordion defaultActiveKey="0">
            {elements.map((el, i) => (
              <Accordion.Item eventKey={i} onClick={() => selectElement(el)}>
                <Accordion.Header>{el.nome}</Accordion.Header>
                <Accordion.Body>
                  <Calendar onChange={onChange} value={value} />
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
        </div>
      )}
    </Container>
  );
}

export default App;
