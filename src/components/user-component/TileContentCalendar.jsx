const TileContentCalendar = ({ view, el, date }) => {
  return (
    <>
      {view === "month" &&
        el.schedule.map((event, i) => {
          return date.toLocaleDateString("it-IT") === event.giorno ? (
            event.assente === false ? (
              <p key={i} style={{ fontSize: "0.8em", color: "green" }}>
                Lab
              </p>
            ) : date.getDay() === 0 || date.getDay() === 6 ? (
              <p key={i} style={{ fontSize: "0.8em", color: "black" }}>
                Chiuso
              </p>
            ) : (
              <p key={i} style={{ fontSize: "0.8em", color: "red" }}>
                Assente
              </p>
            )
          ) : null;
        })}
    </>
  );
};
export default TileContentCalendar;
