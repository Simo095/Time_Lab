import { useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";

function App() {
  // await fetch(`https://nome progetto.vercel.app/api/get`, {
  //         method: "GET"
  //       });
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [newElement, setNewElement] = useState({ id: "", nome: "" });
  const [dailyData, setDailyData] = useState({
    giorno: "",
    ingresso: "",
    giustificate: 0,
    note: "",
  });

  // Aggiungi un nuovo elemento
  const addElement = () => {
    setElements([...elements, { ...newElement, dailyRecords: [] }]);
    setNewElement({ id: "", nome: "" });
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

  return (
    <Container>
      <div>
        <h1>Gestione Elementi</h1>
        {/* Form per aggiungere un nuovo elemento */}
        <input
          type="text"
          placeholder="ID"
          value={newElement.id}
          onChange={(e) => setNewElement({ ...newElement, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nome"
          value={newElement.nome}
          onChange={(e) =>
            setNewElement({ ...newElement, nome: e.target.value })
          }
        />
        <button onClick={addElement}>Aggiungi Elemento</button>

        <h2>Lista Elementi</h2>
        <ul>
          {elements.map((el) => (
            <li key={el.id}>
              {el.nome} (ID: {el.id})
              <button onClick={() => selectElement(el)}>Seleziona</button>
              <span> - Ore Totali Giustificate: {calculateTotalHours(el)}</span>
              <span> - {JSON.stringify(el)}</span>
            </li>
          ))}
        </ul>

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
    </Container>
  );
}

export default App;
