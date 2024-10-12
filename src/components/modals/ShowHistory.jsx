// import { Modal, Container } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { modalStaticUserChanger } from "../../redux/actions/usersAction";

// const ShowHistory = ({ el }) => {
//   const dispatch = useDispatch();
//   const show = useSelector((state) => state.users.handleModalStaticUsers);

//   const calculateScheduleStatistics = (schedule) => {
//     const today = new Date();

//     const validDays = schedule.filter((entry) => {
//       const entryDate = new Date(entry.giorno.split("/").reverse().join("-"));
//       return entryDate <= today;
//     });

//     const totalDays = validDays.length;
//     const presentDays = validDays.filter((day) => !day.assente).length;
//     const absentDays = validDays.filter((day) => day.assente).length;
//     const justifiedDays = validDays.filter((day) => day.giustificato).length;

//     const presentPercentage = ((presentDays / totalDays) * 100).toFixed(2);
//     const absentPercentage = ((absentDays / totalDays) * 100).toFixed(2);
//     const justifiedPercentage = ((justifiedDays / totalDays) * 100).toFixed(2);

//     return {
//       totalDays,
//       presentDays,
//       absentDays,
//       justifiedDays,
//       presentPercentage,
//       absentPercentage,
//       justifiedPercentage,
//     };
//   };

//   const stats = calculateScheduleStatistics(el.schedule);
//   return (
//     <Modal
//       show={show}
//       onHide={() => {
//         dispatch(modalStaticUserChanger(false));
//       }}
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Statistiche di {el.nome}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Container>
//           {/* Visualizzazione delle statistiche */}
//           <h5>Statistiche fino ad oggi:</h5>
//           <ul>
//             <li>Giorni totali: {stats.totalDays}</li>
//             <li>
//               Giorni di presenza: {stats.presentDays} ({stats.presentPercentage}
//               %)
//             </li>
//             <li>
//               Giorni di assenza: {stats.absentDays} ({stats.absentPercentage}%)
//             </li>
//             <li>
//               Giorni giustificati: {stats.justifiedDays} (
//               {stats.justifiedPercentage}%)
//             </li>
//           </ul>
//         </Container>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default ShowHistory;

import { Modal, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { modalStaticUserChanger } from "../../redux/actions/usersAction";

const ShowHistory = ({ el }) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.users.handleModalStaticUsers);

  const calculateMonthlyStatistics = (schedule) => {
    const today = new Date();
    const groupedByMonth = {};

    schedule.forEach((entry) => {
      const entryDate = new Date(entry.giorno.split("/").reverse().join("-"));
      if (entryDate <= today) {
        const month = entryDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });

        if (!groupedByMonth[month]) {
          groupedByMonth[month] = {
            totalDays: 0,
            presentDays: 0,
            absentDays: 0,
            justifiedDays: 0,
          };
        }

        groupedByMonth[month].totalDays += 1;
        if (!entry.assente) groupedByMonth[month].presentDays += 1;
        if (entry.assente) groupedByMonth[month].absentDays += 1;
        if (entry.giustificato) groupedByMonth[month].justifiedDays += 1;
      }
    });

    return groupedByMonth;
  };

  const calculateTotals = (monthlyStats) => {
    let totalDays = 0,
      presentDays = 0,
      absentDays = 0,
      justifiedDays = 0;

    Object.values(monthlyStats).forEach((monthStats) => {
      totalDays += monthStats.totalDays;
      presentDays += monthStats.presentDays;
      absentDays += monthStats.absentDays;
      justifiedDays += monthStats.justifiedDays;
    });

    const presentPercentage = ((presentDays / totalDays) * 100).toFixed(2);
    const absentPercentage = ((absentDays / totalDays) * 100).toFixed(2);
    const justifiedPercentage = ((justifiedDays / totalDays) * 100).toFixed(2);

    return {
      totalDays,
      presentDays,
      absentDays,
      justifiedDays,
      presentPercentage,
      absentPercentage,
      justifiedPercentage,
    };
  };

  const monthlyStats = calculateMonthlyStatistics(el.schedule);
  const totalStats = calculateTotals(monthlyStats);

  return (
    <Modal
      show={show}
      onHide={() => {
        dispatch(modalStaticUserChanger(false));
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Statistiche di {el.nome}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {/* Tabella riepilogativa */}
          <h5>Tabella riepilogativa mensile:</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Mese</th>
                <th>Giorni totali</th>
                <th>Giorni di presenza</th>
                <th>Giorni di assenza</th>
                <th>Giorni giustificati</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(monthlyStats).map(([month, stats]) => (
                <tr key={month}>
                  <td>{month}</td>
                  <td>{stats.totalDays}</td>
                  <td>{stats.presentDays}</td>
                  <td>{stats.absentDays}</td>
                  <td>{stats.justifiedDays}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Totali generali */}
          <h5>Totali generali fino ad oggi:</h5>
          <ul>
            <li>Giorni totali: {totalStats.totalDays}</li>
            <li>
              Giorni di presenza: {totalStats.presentDays} (
              {totalStats.presentPercentage}
              %)
            </li>
            <li>
              Giorni di assenza: {totalStats.absentDays} (
              {totalStats.absentPercentage}%)
            </li>
            <li>
              Giorni giustificati: {totalStats.justifiedDays} (
              {totalStats.justifiedPercentage}%)
            </li>
          </ul>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ShowHistory;
