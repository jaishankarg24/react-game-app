import Message from "./Message";
//import ListGroup from "./components/ListGroup/ListGroup";
import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button/Button";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { BsFillCalendarDayFill } from "react-icons/bs";
import Like from "./components/Like";
import produce from "immer";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";
import Form from "./components/Form";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import ProductList from "./components/ProductList";
// import axios, { AxiosError, CanceledError } from "axios";
import apiClient, { CanceledError } from "./services/api-clients";
import create, { User } from "./services/user-service";
//import userService, { User } from "./components/services/user-service";
import useUsers from "./hooks/useUsers";

// interface User {
//   id: number;
//   name: string;
// }

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
    // setBugs(bugs.map((bug) => (bug.id === 1 ? { ...bug, fixed: true } : bug)));

    setBugs(
      produce((draft) => {
        const bug = draft.find((bug) => bug.id === 1);
        if (bug) bug.fixed = true;
      })
    );
  };

  const [cartItems, setCartItems] = useState(["Product1", "Product2"]);

  //Exercise 1
  const [game, setGame] = useState({
    id: 1,
    player: {
      name: "john",
    },
  });

  const handleGameClick = () => {
    setGame({ ...game, player: { ...game.player, name: "jai" } });
  };

  //Exercise 2
  const [pizza, setPizza] = useState({
    name: "Spicy Pepperoni",
    toppings: ["Mushroom"],
  });

  const handlePizzaClick = () => {
    setPizza({ ...pizza, toppings: [...pizza.toppings, "NewToppings"] });
  };

  //Exercise 3
  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: "Product 1", quantity: 1 },
      { id: 2, title: "Product 2", quantity: 1 },
    ],
  });

  const handleCartQuantity = () => {
    setCart({
      ...cart,
      items: cart.items.map((item) =>
        item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  };
  //items: [...cart.items, items.map((item) => {...item, quantity: quantity + 1})],

  const [expenses, setExpenses] = useState([
    { id: 1, description: "abc", amount: 10, category: "Utilities" },
    { id: 2, description: "abc", amount: 10, category: "Utilities" },
    { id: 3, description: "abc", amount: 10, category: "Utilities" },
    { id: 4, description: "abc", amount: 10, category: "Utilities" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  const ref = useRef<HTMLInputElement>(null);

  // afterRender
  useEffect(() => {
    console.log("current");
    //Side Effect
    if (ref.current) ref.current.focus();
  });

  useEffect(() => {
    document.title = "My App";
    console.log("doc");
  });

  const [category, setCategory] = useState("");

  const connect = () => console.log("Connecting");
  const disconnect = () => console.log("Disconnecting");

  useEffect(() => {
    connect();
    return () => disconnect();
  });

  // const [users, setUsers] = useState<User[]>([]);
  // const [error, setError] = useState("");

  // 1
  // useEffect(() => {
  //   axios
  //     .get<User[]>("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => setUsers(res.data))
  //     .catch((err) => setError(err.message));
  // }, []);

  // useEffect(() => {
  // get -> returns (await) promise - resolved ? response object : error object
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await axios.get<User[]>(
  //         "https://jsonplaceholder.typicode.com/users"
  //       );
  //       setUsers(res.data);
  //     } catch (err) {
  //       setError((err as AxiosError).message);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   const abortController = new AbortController();

  //   setLoading(true);
  //   axios
  //     .get<User[]>("https://jsonplaceholder.typicode.com/users", {
  //       signal: abortController.signal,
  //     })
  //     .then((res) => {
  //       setUsers(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // .finally(() => {
  //   setLoading(false);
  // });

  // setLoading(false);
  // }, []);

  // const deleteUser = (user: User) => {
  //   const originalUsers = [...users];
  //   setUsers(users.filter((u) => u.id !== user.id));

  //   axios
  //     .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
  //     .catch((err) => {
  //       setError(err.message);
  //       setUsers(originalUsers);
  //     });
  // };

  // const addUser = () => {
  //   const originalUsers = [...users];
  //   const newUser = { id: 0, name: "Jai" };

  //   setUsers([...users, newUser]);

  //   axios
  //     .post("https://jsonplaceholder.typicode.com/users/", newUser)
  //     .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
  //     .catch((err) => {
  //       setError(err.message);
  //       setUsers(originalUsers);
  //     });

  //.then((res) => setUsers([...users, res.data]));
  // };

  // const updateUser = (user: User) => {
  //   const originalUsers = [...users];
  //   const updatedUser = { ...user, name: user.name + "!" };

  //   setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

  //   axios
  //     .patch(
  //       "https://jsonplaceholder.typicode.com/users/" + user.id,
  //       updatedUser
  //     )
  //     .catch((err) => {
  //       setError(err.message);
  //       setUsers(originalUsers);
  //     });

  // put for single property update
  // patch for multiple properties update
  // };

  // 2
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   const abortController = new AbortController();

  //   setLoading(true);
  //   apiClient
  //     .get<User[]>("/users", {
  //       signal: abortController.signal,
  //     })
  //     .then((res) => {
  //       setUsers(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // .finally(() => {
  //   setLoading(false);
  // });

  // setLoading(false);
  // }, []);

  // const deleteUser = (user: User) => {
  //   const originalUsers = [...users];
  //   setUsers(users.filter((u) => u.id !== user.id));

  //   apiClient.delete("/users/" + user.id).catch((err) => {
  //     setError(err.message);
  //     setUsers(originalUsers);
  //   });
  // };

  // const addUser = () => {
  //   const originalUsers = [...users];
  //   const newUser = { id: 0, name: "Jai" };

  //   setUsers([...users, newUser]);

  //   apiClient
  //     .post("/users/", newUser)
  //     .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
  //     .catch((err) => {
  //       setError(err.message);
  //       setUsers(originalUsers);
  //     });

  //.then((res) => setUsers([...users, res.data]));
  // };

  // const updateUser = (user: User) => {
  //   const originalUsers = [...users];
  //   const updatedUser = { ...user, name: user.name + "!" };

  //   setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

  //   apiClient.patch("/users/" + user.id, updatedUser).catch((err) => {
  //     setError(err.message);
  //     setUsers(originalUsers);
  //   });

  // put for single property update
  // patch for multiple properties update
  // };

  // 3
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //const abortController = new AbortController();

  //   setLoading(true);
  //   const { request, cancel } = create.getAll<User>();
  //   request
  //     .then((res) => {
  //       setUsers(res.data);
  //       // setUsers(res.data as User[]);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;
  //       setError(err.message);
  //       setLoading(false);
  //     });

  //   return () => cancel();
  // .finally(() => {
  //   setLoading(false);
  // });

  // setLoading(false);
  // }, []);

  // const deleteUser = (user: User) => {
  //   const originalUsers = [...users];
  //   setUsers(users.filter((u) => u.id !== user.id));

  //   create.delete(user.id).catch((err) => {
  //     setError(err.message);
  //     setUsers(originalUsers);
  //   });
  // };

  // const addUser = () => {
  //   const originalUsers = [...users];
  //   const newUser = { id: 0, name: "Jai" };

  //   setUsers([...users, newUser]);

  //   create
  //     .create(newUser)
  //     .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
  //     .catch((err) => {
  //       setError(err.message);
  //       setUsers(originalUsers);
  //     });

  //.then((res) => setUsers([...users, res.data]));
  // };

  // const updateUser = (user: User) => {
  //   const originalUsers = [...users];
  //   const updatedUser = { ...user, name: user.name + "!" };

  //   setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

  //   create.update(updatedUser).catch((err) => {
  //     setError(err.message);
  //     setUsers(originalUsers);
  //   });

  // put for single property update
  // patch for multiple properties update
  // };

  // 4. Using Custom Hook - useUsers()

  const { users, error, isLoading, setUsers, setError } = useUsers();

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u.id !== user.id));

    create.delete(user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Jai" };

    setUsers([...users, newUser]);

    create
      .create(newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });

    //.then((res) => setUsers([...users, res.data]));
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };

    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    create.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });

    // put for single property update
    // patch for multiple properties update
  };

  return (
    <div>
      <div>
        {error && <p className="text-danger">{error}</p>}
        {isLoading && <div className="spinner-border"></div>}
        <button className="btn btn-outline-danger" onClick={addUser}>
          Add
        </button>
        <ul className="list-group">
          {users.map((user) => (
            <li
              key={user.id}
              className="list-group-item d-flex justify-content-between"
            >
              {user.name}{" "}
              <div>
                <button
                  className="btn btn-outline-secondary mx-1"
                  onClick={() => updateUser(user)}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteUser(user)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <select
          className="form-select"
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value=""></option>
          <option value="Clothing">Clothing</option>
          <option value="Household">Household</option>
        </select>
        <ProductList category={category} />
      </div>
      <div>
        <input ref={ref} type="text" className="form-control" />
      </div>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(expense) =>
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
      <Form />
      <ExpandableText maxChars={10}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam id
        culpa accusantium odit. Veniam sit animi praesentium cum facere,
        quisquam ex voluptatibus ipsum magni maxime reprehenderit vero suscipit
        mollitia deserunt repudiandae molestiae recusandae soluta obcaecati
        debitis fugiat blanditiis. Deleniti, quam veniam ut deserunt aut
        veritatis sunt rerum in iure cum ipsam, atque exercitationem ducimus
        corrupti praesentium illo dolore omnis numquam libero. Placeat ex
        corrupti sequi nam impedit quia tenetur eum eligendi! Illo, deserunt
        quibusdam dolor incidunt labore distinctio numquam doloribus voluptatem
        temporibus cum sed sit itaque dolore quia veritatis ipsam consequuntur
        ab obcaecati tempore odit molestiae? Ea suscipit laudantium
        consequuntur?
      </ExpandableText>
      {game.player.name}
      <button onClick={handleGameClick}>Click Me</button>
      {pizza.toppings.map((piz) => (
        <p key={piz}>{piz}</p>
      ))}
      <button onClick={handlePizzaClick}>Click Me</button>

      <button onClick={handleCartQuantity}>Click Me</button>

      <NavBar cartItemsCount={cartItems.length} />
      <Cart cartItems={cartItems} onClear={() => setCartItems([])} />
      {drink.price}
      <button onClick={handleClick}>Click Me</button>
      {customer.address.zipCode}
      <button onClick={handleCustomerClick}>Click Me</button>
      {tags}
      <button onClick={handleArrayClick}>Click Me</button>
      {bugs.map((bug) => (
        <p key={bug.id}>
          {" "}
          {bug.title} {bug.fixed ? "Fixed" : "New"}
        </p>
      ))}
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
