import './ImageGenerator.css';
import { useState } from "react";
import axios from "axios";
// `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=gAkMPA_j3hqczVPCtI-ugjPWET8AzNXkcjb6pcH1tk4&per_page=12`

function App() {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [page, setPage] = useState(1);
  const [display, setDisplay] = useState(true);

  async function generateData() {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=${page}&query=${inputText}&client_id=gAkMPA_j3hqczVPCtI-ugjPWET8AzNXkcjb6pcH1tk4&per_page=${page}`
      );
      console.log(response.data.results);
      setData(response.data.results);
    } catch {}
  }

  return (
    <>
        <h2>Text Image Generator</h2>
    <h2>📄 ➡️ 🖼️ </h2>
      <div className="main">
      
        <br />
      
        {display ? (
          <div className="cards">
            {data.map((ele, index, array) => {
              return (
                <div className="card" key={ele.id}>
                  <img src={ele.urls.small} alt="" />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        <input
          type="text"
          placeholder="Search Image"
          onChange={(e) => {
            setInputText(e.target.value);
            
          }}
        
        />
        <button onClick={generateData}>Generate Image</button>

        <button
          id="load"
          onClick={() => {
            setPage((prev) => prev + 1);
            generateData();
            setDisplay(true);
          }}
        >
          Load More
        </button>
      </div>
    </>
  );
}

export default App;