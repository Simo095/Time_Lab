// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { Accordion, Container } from "react-bootstrap";
// import AccordionHeader from "../header/AccordionHeader";
// import Calendar from "react-calendar";
// import TileContentCalendar from "./TileContentCalendar";
// import DetailsDate from "./DetalisDate";
// import UserTools from "../header/UserTools";

// const AccordionUser = () => {
//   const elements = useSelector((state) => state.users.usersList);
//   const [selectedDate, setSelectedDate] = useState(null);

//   return (
//     <Accordion defaultActiveKey="0">
//       {elements.map((el, i) => (
//         <Accordion.Item eventKey={i} key={el.id}>
//           <AccordionHeader el={el} />
//           <Accordion.Body className="d-flex flex-column justify-content-center align-items-center gap-3">
//             <UserTools el={el} />
//             <Container fluid className="m-0 p-0 d-sm-flex overflow-x-scroll">
//               <Calendar
//                 className={"h-25 event-container position-relative"}
//                 onClickDay={(date) => {
//                   setSelectedDate(date);
//                 }}
//                 tileClassName={({ date }) =>
//                   selectedDate &&
//                   date.toDateString() === selectedDate.toDateString()
//                     ? "selected"
//                     : ""
//                 }
//                 tileContent={({ date, view }) => (
//                   <TileContentCalendar view={view} el={el} date={date} />
//                 )}
//               />
//               <DetailsDate
//                 selectedDate={selectedDate}
//                 el={el}
//                 setSelectedDate={setSelectedDate}
//               />
//             </Container>
//           </Accordion.Body>
//         </Accordion.Item>
//       ))}
//     </Accordion>
//   );
// };
// export default AccordionUser;

import { useState, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import { Accordion, Container } from "react-bootstrap";
import AccordionHeader from "../header/AccordionHeader";
import Calendar from "react-calendar";
import TileContentCalendar from "./TileContentCalendar";
import DetailsDate from "./DetalisDate";
import UserTools from "../header/UserTools";
import { FixedSizeList as List } from "react-window";

const AccordionUser = () => {
  const elements = useSelector((state) => state.users.usersList);
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = useCallback(
    (key) => {
      setActiveKey(key === activeKey ? null : key);
    },
    [activeKey]
  );

  const renderUserItem = useCallback(
    ({ index, style }) => {
      const el = elements[index];
      return (
        <div style={style} key={el.id}>
          <Accordion.Item eventKey={index.toString()}>
            <AccordionHeader el={el} />
            <Accordion.Body className="d-flex flex-column justify-content-center align-items-center gap-3">
              <UserTools el={el} />
              {activeKey === index.toString() && (
                <Container
                  style={{ zIndex: "99999999999999999999999999" }}
                  fluid
                  className="m-0 p-0 d-sm-flex overflow-x-scroll"
                >
                  <Calendar
                    className={"h-25 event-container position-relative"}
                    onClickDay={(date) => setSelectedDate(date)}
                    tileClassName={({ date }) =>
                      selectedDate &&
                      date.toDateString() === selectedDate.toDateString()
                        ? "selected"
                        : ""
                    }
                    tileContent={({ date, view }) => (
                      <TileContentCalendar view={view} el={el} date={date} />
                    )}
                  />
                  <DetailsDate
                    selectedDate={selectedDate}
                    el={el}
                    setSelectedDate={setSelectedDate}
                  />
                </Container>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </div>
      );
    },
    [elements, activeKey, selectedDate]
  );

  return (
    <Accordion
      activeKey={activeKey}
      onSelect={handleToggle}
      defaultActiveKey="0"
    >
      <List
        height={window.innerHeight} // o un'altezza statica che preferisci
        itemCount={elements.length}
        itemSize={150} // altezza del singolo item
        width="100%"
      >
        {renderUserItem}
      </List>
    </Accordion>
  );
};

export default memo(AccordionUser);
