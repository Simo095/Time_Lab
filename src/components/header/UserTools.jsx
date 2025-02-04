import { Container } from "react-bootstrap";
import { TiUserDelete } from "react-icons/ti";
import { useDispatch } from "react-redux";
import {
  modalStaticUserChanger,
  updateUserSchedule,
} from "../../redux/actions/usersAction";
import { MdOutlineAutoAwesomeMotion } from "react-icons/md";
import { PiBookBookmarkLight } from "react-icons/pi";
import OverviewUser from "../modals/OverviewUser";
import {
  generateYearScheduleNewYear,
  handleAddReminder,
  handleDeleteUser,
} from "../../asset/handler&method";
import { FaPlus } from "react-icons/fa";

const UserTools = ({ el }) => {
  const dispatch = useDispatch();
  // const extendUserSchedule = (user) => {
  //   const newSchedule = generateYearScheduleNewYear("01/01/2025", 2025);
  //   const updatedUser = {
  //     ...user,
  //     schedule: [...user.schedule, ...newSchedule],
  //   };
  //   dispatch(updateUserSchedule(updatedUser));
  // };
  const extendUserSchedule = (user) => {
    const newSchedule = generateYearScheduleNewYear("01/01/2025", 2025);
    const updatedSchedule = [...user.schedule, ...newSchedule];
    const {
      totaleAssenze,
      totalePresenze,
      totaleRitardi,
      totaleRitardiAssenzeGiustificati,
      totaleAssenzeGiustificati,
      totaleRitardiGiustificati,
    } = calculateUserStats(updatedSchedule);
    const updatedUser = {
      ...user,
      schedule: updatedSchedule,
      totaleAssenze,
      totalePresenze,
      totaleRitardi,
      totaleRitardiAssenzeGiustificati,
      totaleAssenzeGiustificati,
      totaleRitardiGiustificati,
    };

    dispatch(updateUserSchedule(updatedUser));
  };

  return (
    <Container
      fluid
      className="m-0 p-0 d-flex justify-content-center align-items-center"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Container
        fluid
        className="m-0 p-0 d-flex flex-column justify-content-center align-items-center"
      >
        <TiUserDelete
          size={30}
          color="black"
          cursor={"pointer"}
          className=""
          onClick={(e) => {
            e.stopPropagation();
            dispatch(handleDeleteUser(el));
          }}
        />
        <p className="m-0 p-0 fw-lighter fs-6">Elimina</p>
      </Container>
      <Container
        fluid
        className="m-0 p-0 d-flex flex-column justify-content-center align-items-center"
      >
        <MdOutlineAutoAwesomeMotion
          size={30}
          color="black"
          className=""
          onClick={(e) => {
            e.stopPropagation();
            dispatch(handleAddReminder(el));
          }}
        />
        <p className="m-0 p-0 fw-lighter fs-6">Prome</p>
      </Container>
      <Container
        fluid
        className="m-0 p-0 d-flex flex-column justify-content-center align-items-center"
      >
        <FaPlus
          size={30}
          color=""
          className=""
          onClick={(e) => {
            e.stopPropagation();
            extendUserSchedule(el);
          }}
        />
        <p className="m-0 p-0 fw-lighter fs-6">Agg. Anno</p>
        <p className="m-0 p-0 fw-lighter" style={{ fontSize: "0.6em" }}>
          Disabled
        </p>
      </Container>
      <Container
        fluid
        className="m-0 p-0 d-flex flex-column justify-content-center align-items-center"
      >
        <PiBookBookmarkLight
          size={30}
          color="black"
          className=""
          onClick={(e) => {
            e.stopPropagation();
            dispatch(modalStaticUserChanger(el.id));
          }}
        />
        <p className="m-0 p-0 fw-lighter fs-6">Stats</p>
      </Container>

      <OverviewUser el={el} />
    </Container>
  );
};

export default UserTools;
