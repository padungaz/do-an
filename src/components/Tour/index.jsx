import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTour } from "../../store/admin/tourSlice";

function Tour() {
  const dispatch = useDispatch();

  const todoArray = useSelector((state) => state.tourReducer.tours);
  console.log("todoArray", todoArray);

  useEffect(() => {
    // console.log("fdsfdsfsd");
    dispatch(fetchTour());
  }, [dispatch]);

  return (
    <>
      {" "}
      {todoArray.map((item) => (
        <h1 id={item.id}>{item.nameTour}</h1>
      ))}
    </>
  );
}

export default Tour;
