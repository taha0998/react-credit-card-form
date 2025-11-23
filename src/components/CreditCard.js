const CreditCard = ({ formData, side }) => {
  const dateFormat = (number) => {
    if (String(number).length <= 1 && number !== "") return `0${number}`;
    else if (number !== "") return number;
    else return "XX";
  };
  const cvvFormat = (number) => {
    if (String(number).length <= 1 && number !== "") return `00${number}`;
    else if (String(number).length <= 2 && number !== "") return `0${number}`;
    else if (number !== "") return number;
    else return "XXX";
  };
  const nameformat = (name) => {
    if (name !== "") return name;
    else return "XXXX XXXXX";
  };
  const xLoop = (x, number) => {
    let xCount = "";
    let i = 0;
    while (i <= number - 1) {
      xCount += x;
      i++;
    }
    return xCount;
  };
  const cardNumberformat = (cardNumber) => {
    const cardNumberLength = String(cardNumber).length;
    if (cardNumberLength <= 16 && cardNumber !== "" && cardNumber !== undefined)
      return `${cardNumber}${xLoop("X", 16 - cardNumberLength)}`;
    else return xLoop("X", 16);
  };
  const getCardType = () => {
    if (
      formData.cardNumber.slice(0, 2) === "37" ||
      formData.cardNumber.slice(0, 2) === "35"
    )
      return "amex";
    if (formData.cardNumber.slice(0, 1) === "4") return "visa";
    if (
      formData.cardNumber.slice(0, 2) === "510" ||
      formData.cardNumber.slice(0, 2) === "555"
    )
      return "mastercard";
    return "mastercard";
  };
  return (
    <div className="credit-card">
      {side === "front" && (
        <div className={`${getCardType()}-front-side card`}>
          <div className="card-details-container">
            <div className="detail-container">
              <h2>Expiry:</h2>
              <p>
                {dateFormat(formData.month)}/{dateFormat(formData.year)}
              </p>
            </div>
            <div className="detail-container">
              <h2>Cardholder:</h2>
              <p>{nameformat(formData.name)}</p>
            </div>
            <div className="number-display">
              <h3>{cardNumberformat(formData.cardNumber)}</h3>
            </div>
          </div>
        </div>
      )}
      {side === "back" && (
        <div className={`${getCardType()}-back-side card`}>
          <div id="cvv-display">
            <p>{cvvFormat(formData.cvv)}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default CreditCard;
