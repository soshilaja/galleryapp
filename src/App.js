import { useMemo, useContext, useEffect } from "react";
import { Context } from "./context";
import Card from "./components/Card";
import Layout from "./components/Layout";
import Firestore from "./handlers/firestore";
import "./App.css";



function App() {
  const { state, read } = useContext(Context);

  const count = useMemo(() => {
    return `You have ${state.items.length} photo${
      state.items.length > 1 ? "s" : ""
    } in your gallery`;
  }, [state.items]);

  useEffect(() => {
    read();
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Gallery App</h1>
      {count}
      <div className="row">
        {state.items.map((item, index) => {
          return <Card key={index} {...item} />;
        })}
      </div>
    </Layout>
  );
}

export default App;
