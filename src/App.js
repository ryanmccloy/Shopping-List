import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// APP COMPONENT
export default function App() {
  const [items, setItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  let totalBoughtItems = boughtItems
    .reduce((acc, cur) => {
      return acc + Number(cur.price);
    }, 0)
    .toFixed(2);

  let totalItems = items
    .reduce((acc, cur) => {
      return acc + Number(cur.price);
    }, 0)
    .toFixed(2);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemoveItem(item, price, id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleBoughtItem(item, price, id) {
    // remove bought item from list
    setItems(items.filter((item) => item.id !== id));
    // Add bought item to bought items list
    setBoughtItems((boughtItems) => [...boughtItems, { item, price, id }]);
  }

  function handleClearBoughtItems() {
    setBoughtItems([]);
    // Set Total of bought items to 0
  }

  return (
    <>
      <h1 className="title">Shopping Calculator</h1>

      <div className="calculator calc-flex">
        <ShoppingList
          onAddItem={handleAddItem}
          items={items}
          onRemoveItem={handleRemoveItem}
          onBoughtItem={handleBoughtItem}
        />
        <div className="right-flex">
          <BoughtList
            boughtItems={boughtItems}
            onClearBoughtItems={handleClearBoughtItems}
            totalBoughtItemsPrice={totalBoughtItems}
          />
          <ListBalance totalPrice={totalItems} />
        </div>
      </div>
    </>
  );
}

// COMPONENTS

function ShoppingList({ onAddItem, items, onRemoveItem, onBoughtItem }) {
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
            <Item
              key={item.id}
              id={item.id}
              item={item.item}
              price={item.price}
              onRemoveItem={onRemoveItem}
              onBoughtItem={onBoughtItem}
            />
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

function Item({ item, price, onRemoveItem, id, onBoughtItem }) {
  return (
    <div className="item">
      <p>{item}</p>
      <div className="item-content">
        <p className="price">£{price}</p>
        <Button
          onClick={onBoughtItem}
          id={id}
          item={item}
          price={price}
          style={{ backgroundColor: "#3C6E71" }}
        >
          Bought
        </Button>
        <Button
          onClick={onRemoveItem}
          id={id}
          style={{ backgroundColor: "#F81616" }}
        >
          Remove
        </Button>
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
  const [error, setError] = useState("");

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

    if (isNaN(price) || price.trim() === "") {
      setError("Please enter a valid price.");
      return;
    }

    const formattedPrice = parseFloat(price).toFixed(2);
    onAddItem({ id: uuidv4(), item, price: formattedPrice });
    setItem("");
    setPrice("");
    setError("");
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

        {error && <p className="error">{error}</p>}

        <div className="submit-button">
          <button type="submit" className="add-item">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

function BoughtList({
  boughtItems,
  onClearBoughtItems,
  totalBoughtItemsPrice,
}) {
  return (
    <div className="border bought-list">
      <h2>So far you have bought:</h2>

      <div className="bought-flex">
        <div className="bought-items">
          {boughtItems.map((item) => (
            <BoughtItem boughtItem={item.item} key={item.id} />
          ))}
        </div>
        <div className="bottom-bought">
          <Button
            onClick={onClearBoughtItems}
            style={{ backgroundColor: "#F81616" }}
          >
            Clear
          </Button>
          <p>Total spent so far: £{totalBoughtItemsPrice}</p>
        </div>
      </div>
    </div>
  );
}

function BoughtItem({ boughtItem }) {
  return <div className="bought-item">{boughtItem}</div>;
}

function ListBalance({ totalPrice }) {
  return (
    <div className="border list-balance">
      <h2>Balance of current list:</h2>
      <p className="total">£{totalPrice}</p>
    </div>
  );
}

function Button({ children, style, onClick, id, item, price }) {
  return (
    <div
      className="button"
      style={style}
      onClick={() => onClick(item, price, id)}
    >
      {children}
    </div>
  );
}
