import React, { useMemo } from "react";
import { useFirestoreContext } from "../context/FirestoreContext";
import { useAuthContext } from "../context/AuthContext";
import List from "./List";

const Stocks = () => {
  const { state } = useFirestoreContext();
  const { currentUser } = useAuthContext();

  const items = useMemo(() => {
    const filtered = state.items.filter((item) => {
      const username = currentUser?.displayName.split(" ").join("");
      return item.user === username.toLowerCase();
    });
    return currentUser ? filtered : [];
  }, [state.items, currentUser]);
  return (
    <>
      <h1>My Stocks</h1>
      <List items={items} />
    </>
  );
};

export default Stocks;
