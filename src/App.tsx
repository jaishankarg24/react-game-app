import Message from "./Message";
//import ListGroup from "./components/ListGroup/ListGroup";
import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button/Button";
import { useState } from "react";
import "./App.css";
import { BsFillCalendarDayFill, BsTags } from "react-icons/bs";
import Like from "./components/Like";

function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const onClickHandler = () => console.log("Clicked");

  const [alertVisible, setAlertVisibility] = useState(false);

  const onCloseHandler = () => setAlertVisibility(false);

  const [drink, setDrink] = useState({ title: "Americano", price: 5 });

  const handleClick = () => {
    // const newDrink = {
    //   title: drink.title,
    //   price: drink.price + 1,
    // };
    // setDrink(newDrink);

    // const newDrink = {
    //   ...drink,
    //   price: drink.price + 1,
    // };
    // setDrink(newDrink);

    setDrink({ ...drink, price: drink.price + 1 });
  };

  const [customer, setCustomer] = useState({
    name: "john",
    address: {
      city: "London",
      zipCode: 94566,
    },
  });

  const handleCustomerClick = () => {
    setCustomer({
      ...customer,
      address: { ...customer.address, zipCode: 912356 },
    });
  };

  const [tags, setTags] = useState(["happy", "cheerful"]);

  const handleArrayClick = () => {
    // Add
    setTags([...tags, "existing"]);

    // Remove
    setTags(tags.filter((tag) => tag !== "happy"));

    // Update
    setTags(tags.map((tag) => (tag === "cheerful" ? "happiness" : tag)));
  };

  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", fixed: false },
    { id: 2, title: "Bug 2", fixed: false },
  ]);

  const handleBugArrayClick = () => {
    setBugs(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));
  };

  return (
    <div>
      {drink.price}
      <button onClick={handleClick}>Click Me</button>
      {customer.address.zipCode}
      <button onClick={handleCustomerClick}>Click Me</button>
      {tags}
      <button onClick={handleArrayClick}>Click Me</button>
      <button onClick={handleBugArrayClick}>Click Me</button>
      <Like onClick={() => console.log("clicked")} />
      <BsFillCalendarDayFill color="red" size="40" />
      <Message />
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
      {/* <Alert text="Hello world." /> */}
      {/* Passing Children */}
      {alertVisible && (
        <Alert onClose={onCloseHandler}>
          Hello <span>world.</span>
        </Alert>
      )}
      {/* <Button color="danger" onClick={onClickHandler}>
        My Button
      </Button> */}
      {/* <Button color="danger" onClick={() => console.log("clicked")}>
        My Button
      </Button> */}
      <Button color="primary" onClick={() => setAlertVisibility(true)}>
        My Button
      </Button>
    </div>
  );
}

export default App;
