import { useState } from "react";
import CreditCard from "./components/CreditCard";

const App = () => {
  const currentMounth = new Date().getMonth();
  const formatting = String(currentMounth).length <= 1 ? "0" : null;
  const formattedCurrentMounth = formatting + currentMounth;
  const currentYear = new Date().getFullYear();
  const formattedYear = currentYear - 2000 + 6;
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    month: "",
    year: "",
    cvv: "",
  });
  const [side, setSide] = useState("front");
  const [message, setMessage] = useState(
    "Please enter your credit card details"
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Thank you for your custom");
  };
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (
      name === "cardNumber" ||
      name === "month" ||
      name === "year" ||
      name === "cvv"
    )
      value = value.replace(/[^0-9.]/g, "").replace(/(\..*)\..*/g, "$1");
    if (name === "cvv") setSide("back");
    else setSide("front");
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="form-container">
      <CreditCard formData={formData} side={side} />
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>
            Name on Card
            <input
              name="name"
              value={formData.name}
              placeholder="Name"
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Card number
            <input
              placeholder="0000 0000 0000 0000"
              minLength={16}
              maxLength={16}
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="supporting-inputs-container">
          <label>
            Expiry date
            <div>
              <input
                placeholder={formattedCurrentMounth}
                className="dateInput"
                minLength={2}
                maxLength={2}
                name="month"
                value={formData.month}
                onChange={handleChange}
                required
              />
              <span className="slash">/</span>
              <input
                placeholder={formattedYear}
                className="dateInput"
                minLength={2}
                maxLength={2}
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>
          </label>
          <label>
            CVV
            <input
              id="cvv"
              placeholder="123"
              minLength={3}
              maxLength={3}
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="input-container">
          <button type="submit">Submit</button>
        </div>
        <p className="info-message">{message}</p>
      </form>
    </div>
  );
};

export default App;
