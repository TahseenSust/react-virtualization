import React, { Children, FC } from "react";
import "./App.css";
import { List } from "./components/List";
import { useDictionary } from "./hooks/useDictionary";

function App() {
  const dictionary = useDictionary();
  return (
    <div className="app">
      <div className="header">
        <div>Render Virtualized</div>
      </div>
      <div className="content">
        <List items={dictionary} />
      </div>
    </div>
  );
}

export default App;
