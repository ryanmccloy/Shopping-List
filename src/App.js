import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
    console.log(items);
  }

  return (
    <>
      <h1 className="title">Shopping Calculator</h1>

      <div className="calculator calc-flex">
        <ShoppingList onAddItem={handleAddItem} items={items} />
        <div className="right-flex">
          <BoughtList />
          <ListBalance />
        </div>
      </div>
    </>
  );
}

// Components

function ShoppingList({ onAddItem, items }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleFormOpen() {
    setIsFormOpen((isFormOpen) => !isFormOpen);
  }

  return (
    <div className="list border">
      <h2>What do you need?</h2>

      <div className="items-flex">
        <div className="items-container">
          {items.map((item) => (
            <Item key={item.id} item={item.item} price={item.price} />
          ))}
        </div>

        <div className="form-flex">
          {isFormOpen ? (
            <ItemForm onFormOpen={handleFormOpen} onAddItem={onAddItem} />
          ) : (
            <AddItem onFormOpen={handleFormOpen} />
          )}
        </div>
      </div>
    </div>
  );
}

function Item({ item, price }) {
  return (
    <div className="item">
      <p>{item}</p>
      <div className="item-content">
        <p className="price">£{price}</p>
        <Button style={{ backgroundColor: "#3C6E71" }}>Bought</Button>
        <Button style={{ backgroundColor: "#F81616" }}>Remove</Button>
      </div>
    </div>
  );
}

function AddItem({ onFormOpen }) {
  return (
    <button className="add-item" onClick={onFormOpen}>
      Add Item
    </button>
  );
}

function ItemForm({ onFormOpen, onAddItem }) {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");

  function handleItem(e) {
    e.preventDefault();
    setItem(toUpperCase(e.target.value));
  }

  function toUpperCase(string) {
    let convertedString = "";
    for (let i = 0; i < string.length; i++) {
      if (i === 0) {
        convertedString += string[i].toUpperCase();
      } else {
        convertedString += string[i].toLowerCase();
      }
    }
    return convertedString;
  }

  function handlePrice(e) {
    e.preventDefault();
    setPrice(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formattedPrice = parseFloat(price).toFixed(2);
    onAddItem({ id: uuidv4(), item, price: formattedPrice });
    setItem("");
    setPrice("");
    onFormOpen();
  }

  return (
    <div className="item-form">
      <h2>What do you want to add?</h2>
      <button className="button close-button" onClick={onFormOpen}>
        x
      </button>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-item">
          <label className="label">Item</label>
          <input
            type="text"
            className="input"
            value={item}
            onChange={(e) => handleItem(e)}
          ></input>
        </div>
        <div className="form-price">
          <label className="label">Price (£)</label>
          <input
            type="text"
            className="input"
            value={price}
            onChange={(e) => handlePrice(e)}
            steps="0.01"
          ></input>
        </div>

        <div className="submit-button">
          <button type="submit" className="add-item">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

function BoughtList() {
  return (
    <div className="border bought-list">
      <h2>So far you have bought:</h2>

      <div className="bought-flex">
        <div className="bought-items">
          <BoughtItem>Socks</BoughtItem>
          <BoughtItem>Gloves</BoughtItem>
          <BoughtItem>Hat</BoughtItem>
          <BoughtItem>Wallet</BoughtItem>
          <BoughtItem>Sun-cream</BoughtItem>
        </div>
        <div className="bottom-bought">
          <Button style={{ backgroundColor: "#F81616" }}>Clear</Button>
          <p>Total spent so far: £245</p>
        </div>
      </div>
    </div>
  );
}

function BoughtItem({ children }) {
  return <div className="bought-item">{children}</div>;
}

function ListBalance() {
  return (
    <div className="border list-balance">
      <h2>Balance of current list:</h2>
      <p className="total">£120</p>
    </div>
  );
}

function Button({ children, style }) {
  return (
    <div className="button" style={style}>
      {children}
    </div>
  );
}
