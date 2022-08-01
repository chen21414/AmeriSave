import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [fileData, setFileData] = useState([]);

  var urlContainer = [];
  for (var i = 0; i <= 99; i++) {
    urlContainer.push(`./logs_${i}.json`);
  }

  const fetchAll = async (urlContainer) => {
    const res = await Promise.all(urlContainer.map((u) => fetch(u)));
    const jsons = await Promise.all(res.map((r) => r.json()));
    setFileData(jsons);
  };

  useEffect(() => {
    fetchAll(urlContainer);
  }, []);

  const mapData = fileData.map((file) => {
    return file;
  });

  let filterData = mapData.filter(
    (ele, ind) => ind === mapData.findIndex((elem) => elem.id === ele.id)
  );

  const tally = filterData.map((data) => {
    const Email_Total = data.logs.map((d, index) => {
      const object = { email: d.email, total: index + 1 };
      return object;
    });

    const newData = { logs_id: data.id, tally: Email_Total };
    return newData;
  });

  //flaten out array
  const messages = filterData.reduce((acc, cur) => {
    cur = cur.logs.reduce((acc, cur) => {
      return acc.concat(cur);
    }, []);
    return acc.concat(cur);
  }, []);

  const newTally = tally.map((t) => {
    t.tally.map((item) => {
      const filteredMessage = messages
        .filter((m) => {
          return m.email === item.email;
        })
        .map((m) => m.message);
      item.message = filteredMessage;
      return item;
    });
    return { ...t, tally: { ...t.tally } };
  });

  console.log("globalTally", newTally);

  return <div></div>;
}

export default App;
