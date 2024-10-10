import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AddUser from "./components/modals/AddUser";
import HeaderBar from "./components/header/HeaderBar";
import HeaderDate from "./components/header/HeaderDate";
import AccordionUser from "./components/user-component/AccordionUser";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";

const App = () => {
  const [elements, setElements] = useState([]);
  const [newElement, setNewElement] = useState({
    id: elements?.length + 1,
    nome: "",
  });
  const addElement = () => {
    setElements([...elements, { ...newElement }]);
    setNewElement({ id: elements?.length + 2, nome: "" });
  };

  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const handleSave = async () => {
    try {
      const response = await fetch("https://agne-manager.vercel.app/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(elements),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("File salvato correttamente:", result.url);
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
    //getFileAndAddOldElements();
  }, []);
  return (
    <Container fluid className="App m-0 p-0">
      <HeaderBar handleShowAdd={handleShowAdd} handleSave={handleSave} />
      {elements && (
        <Container>
          <HeaderDate />
          <AccordionUser elements={elements} setElements={setElements} />
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
};

export default App;
