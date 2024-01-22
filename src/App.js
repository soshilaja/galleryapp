import { useMemo, useContext } from "react";
import { Context } from "./context/FirestoreContext";
import List from "./components/List";
import "./App.css";

function App() {
  const { state } = useContext(Context);

  const count = useMemo(() => {
    return `you have ${state?.items?.length || 0} image${
      state?.items?.length > 1 ? "s" : ""
    }`;
  }, [state]);

  return (
    <>
      <h1 className="text-center">Gallery</h1>
      {count}
      <List items={state?.items || []} />
    </>
  );
}

export default App;
