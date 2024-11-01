const TileContentCalendar = ({ view, el, date }) => {
  return (
    <>
      {view === "month" &&
        el.schedule.map((event, i) => {
          return (
            date.toLocaleDateString("it-IT") === event.giorno &&
            (event.assente === false ? (
              event.ritardo === true ? (
                <p
                  key={i}
                  style={{
                    fontSize: "0.8em",
                    color: "rebeccapurple",
                  }}
                >
                  Ritardo
                </p>
              ) : (
                <p
                  key={i}
                  style={{
                    fontSize: "0.8em",
                    color: "green",
                  }}
                >
                  Lab
                </p>
              )
            ) : (
              <p
                key={i}
                style={{
                  fontSize: "0.8em",
                  color: "red",
                }}
              >
                Assente
              </p>
            ))
          );
        })}
    </>
  );
};
export default TileContentCalendar;
