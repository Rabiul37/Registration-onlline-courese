import { FaBookReader } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [courseName, setCourseName] = useState([]);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [TotalHour, setTotalHour] = useState(0);
  const [remainingHour, setRemainHour] = useState(20);

  const handleCourseName = (name) => {
    const isExist = courseName.find((item) => item == name.title);
    // let count = name.credit;
    if (isExist) {
      return alert("You added this item please try another one");
    } else {
      const newHour = TotalHour + name.credit;
      if (newHour > 20) {
        return alert("this not allowed");
      }
      setTotalHour(newHour);
      const remainHour = 20 - newHour;
      setRemainHour(remainHour);
      setCourseName([...courseName, name.title]);
      setTotalPrice(TotalPrice + name.price);
    }
  };
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  return (
    <>
      <h1 className="text-4xl text-center font-semibold mt-5">
        Course Registration
      </h1>
      {/* this is full container start */}
      <div className="w-11/12 m-auto mt-8 flex gap-8">
        {/* this is card section start */}
        <div className="grid  gap-3 w-3/4 bg-gray-200 lg:grid-cols-3">
          {cards.map((card) => (
            <div className="border-2 border-gray-300 p-2" key={card.id}>
              <img src={card.img} alt="" />
              <h1 className="text-xl font-semibold text-gray-600">
                {card.title}
              </h1>
              <p className="text-sm font-medium text-gray-600 text-justify">
                {card.details}
              </p>
              <div className="flex gap-3 items-center">
                <h3 className="text-2xl">$</h3>
                <h2 className="text-xl font-semibold text-orange-600">
                  Price : {card.price}
                </h2>
                <h3 className="text-blue-500">
                  <FaBookReader></FaBookReader>
                </h3>
                <h2 className="text-1xl font-bold text-green-800">
                  Credit : {card.credit}{" "}
                </h2>
              </div>
              <button
                onClick={() => handleCourseName(card)}
                className="bg-blue-500 w-full rounded-xl p-2 text-xl font-bold text-white"
              >
                Select
              </button>
            </div>
          ))}
        </div>
        {/* this is card section end */}

        {/* this is cart section start */}
        <div className="w-1/4 text-center">
          <div>
            <h1 className="text-xl font-semibold text-blue-600">
              Credit Hour Remaining {remainingHour} hr
            </h1>
          </div>
          <hr />
          <div>
            <h1 className="text-xl font-semibold">Course Name</h1>
            <div>
              {courseName.map((course, idx) => (
                <ul key={idx}>
                  <li className="text-xl font-semibold bg-gray-400 p-2 mt-2 rounded text-white">
                    {course}
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <hr />
          <div>
            <h1 className="text-xl font-semibold text-green-800">
              Total Credit : {TotalHour} Hour
            </h1>
          </div>
          <hr />
          <div>
            <h1 className="text-xl font-semibold text-orange-600">
              Total Price : {TotalPrice} USD
            </h1>
          </div>
        </div>
        {/* this is cart section end */}
      </div>
    </>
  );
}

export default App;
