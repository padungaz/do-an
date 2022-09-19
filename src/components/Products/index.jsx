import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTodos } from "../../slices/todoSlice";
import Card from "./TodoItem";
import "./style.scss";


function Products() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const todoArray = useSelector((state) => state.todo.todos); 
  
  const renderItem = () => {
    return todoArray?.map((item) => {
      return (
        <div key={item?.id}>
          <Card
            item={item}
          />
        </div>
      );
    });
  };

  return (
    <div className="body">
      <div className="body__tasklist">{renderItem()}</div>
 
    </div>
  );
}

export default Products;
