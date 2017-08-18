import React, { PropTypes, Component } from "react";
import { Link } from "react-router-dom";
import "./Board.sass";

class AddButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };

    this.showList = this.showList.bind(this);
  }
  showList() {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  }
  render() {
    return (
      <div className="add_list_container">
        <a
          className="add_list_btn waves-effect waves-light btn"
          onClick={this.showList}
        >
          Add list.
        </a>
        <div
          className={
            this.state.visible ? "add_list_content active" : "add_list_content"
          }
        >
          <input type="text" name="title" ref="title" placeholder="Type name of your list." />
          <a
            className="waves-effect waves-light btn"
            onClick={() => this.props.add(this.refs.title.value)}
          >
            Add
          </a>
        </div>
      </div>
    );
  }
}

class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className="collection-item">
        <div>
          {this.props.item}
          <a href="#!" className="secondary-content">
            <i className="material-icons">create</i>
          </a>
        </div>
      </li>
    );
  }
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      items: []
    };

    this.showArea = this.showArea.bind(this);
    this.addItem = this.addItem.bind(this);
  }
  showArea() {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  }
  addItem() {
    let itemsList = this.state.items;
    let itemValue = this.refs.item_value.value;

    itemsList.push(itemValue);

    this.setState({
      items: itemsList
    });
  }
  render() {
    return (
      <div className="item_content">
        <ul className="collection with-header">
          <li className="collection-header">
            <span>
              {this.props.header}
            </span>
          </li>
          {this.state.items.map((item, index) => {
            return <ListItem key={`item-${index}`} item={item} />;
          })}
        </ul>

        <div className={this.state.visible ? "input-field active" : "input-field"}>
          <textarea className="materialize-textarea" ref="item_value"/>
        </div>
        <a
          className={
            this.state.visible ? "waves-effect waves-light btn no_active" : "waves-effect waves-light btn"
          }
          onClick={this.showArea}
        ><i className="material-icons right">note_add</i>
          Add a card.
        </a>
        <div
          className={
            this.state.visible ? "btn_container active" : "btn_container"
          }
        >
          <a className="waves-effect waves-light btn" onClick={this.addItem}>
            <i className="material-icons">add</i>
          </a>
          <a className="waves-effect waves-light btn" onClick={this.showArea}>
            <i className="material-icons">close</i>
          </a>
        </div>
      </div>
    );
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  addList(val) {
    let listNow = this.state.list;
    let newItem = {
      header: val
    };

    listNow.push(newItem);

    this.setState({
      list: listNow
    });

    console.log(this.state.list);
  }
  render() {
    return (
      <div className="add_list">
        {this.state.list.map((item, index) => {
          return <List header={item.header} key={`item-${index}`} />;
        })}
        <AddButton add={this.addList.bind(this)} />
      </div>
    );
  }
}

export default Board;
