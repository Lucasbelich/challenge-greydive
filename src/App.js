import { Routes, Route } from "react-router-dom";

import Form from "./components/Form/Form";
import Registered from "./components/Registered/Registered";

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<h1>NOT FOUND 404</h1>} />
        <Route path="/" element={<Form />} />
        <Route path="/registered" element={<Registered />} />
      </Routes>
    </div>
  );
}

export default App;
