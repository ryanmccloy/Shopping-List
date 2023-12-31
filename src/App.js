import { useState } from "react";

export default function App() {
  return (
    <>
      <h1 className="title">Shopping Calculator</h1>

      <div className="calculator calc-flex">
        <ShoppingList />

        <div className="right-flex">
          <BoughtList />

          <ListBalance />
        </div>
      </div>
    </>
  );
}

function ShoppingList() {
  return (
    <div className="list border">
      <h2>What do you need?</h2>

      <div className="items-flex">
        <div>
          <Item />
          <Item />
        </div>

        <div className="form-flex">
          {/* <ItemForm /> */}
          <AddItem />
        </div>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="item">
      <p>Shoes</p>
      <div className="item-content">
        <p className="price">£90</p>
        <Button style={{ backgroundColor: "#3C6E71" }}>Bought</Button>
        <Button style={{ backgroundColor: "#F81616" }}>Remove</Button>
      </div>
    </div>
  );
}

function AddItem() {
  return <button className="add-item">Add Item</button>;
}

function ItemForm() {
  return (
    <div className="item-form">
      <h2>What do you want to add?</h2>

      <form className="form">
        <div className="form-item">
          <label className="label">Item</label>
          <input type="" className="input"></input>
        </div>
        <div className="form-price">
          <label className="label">Price</label>
          <input type="" className="input"></input>
        </div>

        <div className="submit-button">
          <AddItem />
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
