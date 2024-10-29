import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://reqres.in/api/users/")
      .then((res) => res.json())
      .then((jsonData) => setData(jsonData.data))
      .catch((error) => setError(error));
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="items">
      {data &&
        data.map((item) => (
          <div key={item.id}>
            <img src={item.avatar} alt={item.first_name} />
            <h3>{`${item.first_name} ${item.last_name}`}</h3>
            <p>{item.email}</p>
          </div>
        ))}
    </div>
  );
}

function MoveMent() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function updateMove(e) {
      setPos({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", updateMove);

    return () => {
      window.removeEventListener("mousemove", updateMove);
    };
  },[]);

  useEffect(() => {
    document.title = `Mouse Position - X: ${pos.x}, Y: ${pos.y}`;
  }, [pos]);

  return (
    <div className="position">
      <p>X-Axis: {pos.x}</p>
      <p>Y-Axis: {pos.y}</p>
    </div>
  );
}

export default App;
export { MoveMent };
