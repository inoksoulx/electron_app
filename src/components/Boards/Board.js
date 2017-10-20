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
          <input
            type="text"
            name="title"
            ref="title"
            placeholder="Type name of your list."
          />
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
    this.state = {
      visible: false
    };

    this.showArea = this.showArea.bind(this);
    this.changeItem = this.changeItem.bind(this);
  }
  componentWillMount() {
    this.setState({
      item: this.props.item
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      item: nextProps.item
    })
  }
  componentWillUnmount() {
    this.showArea();
  }
  changeItem() {
    let self = this;

    $.ajax({
      url: `http://localhost:3000/api/board/list/sub/${self.props.id}`,
      type: "PUT",
      data: {
        newVal: self.refs.item_value.value
      },
      success: response => {
        this.setState(prevState => ({
          visible: !prevState.visible,
          item: response
        }));
      }
    });
  }
  showArea() {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
    this.refs.item_value.value = this.state.item;
    console.log('pull')
  }
  render() {
    return (
      <li className="collection-item">
        <div className="item_wrapper">
          {this.state.item}
          <a className="secondary-content" onClick={this.showArea}>
            <i className="material-icons">more_vert</i>
          </a>
          <div
            className={this.state.visible ? "back_lay active" : "back_lay"}
          />
          <div
            className={
              this.state.visible ? "task_service active" : "task_service"
            }
          >
            <div>
              <textarea className="materialize-textarea" ref="item_value" />
              <a
                className="waves-effect waves-light btn"
                onClick={this.changeItem}
              >
                Save
              </a>
              <a
                className="waves-effect waves-light btn"
                onClick={this.showArea}
              >
                Close
              </a>
            </div>
            <div className="service_container">
              <a
                className="waves-effect waves-light btn"
                onClick={() =>
                  this.props.remove(this.props.id) }
              >
                Delete
              </a>
            </div>
          </div>
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
      subtasks: []
    };

    this.showArea = this.showArea.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }
  showArea() {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  }
  componentWillMount() {
    this.setState((prevState, props) => ({
      subtasks: (prevState.subtasks = props.subtasks)
    }));
  }
  addItem() {
    let self = this;
    let itemsList = this.state.subtasks;
    let itemValue = this.refs.item_value.value;

    let newSub = {
      content: itemValue
    };

    itemsList.push(newSub);

    $.ajax({
      url: `http://localhost:3000/api/board/list/${self.props.name}`,
      type: "PUT",
      data: {
        board_id: self.props.board_id,
        list_id: self.props.list_id,
        subtasks: itemsList
      },
      success: response => {
        self.setState({
          subtasks: response
        });
      }
    });
  }
  removeItem(val) {
    let self = this;
    let itemsList = this.state.subtasks;

    let filteredList = itemsList.filter(item => {
      return item._id != val;
    });

    $.ajax({
      url: `http://localhost:3000/api/board/list/${self.props.name}`,
      type: "PUT",
      data: {
        board_id: self.props.board_id,
        list_id: self.props.list_id,
        subtasks: filteredList
      },
      success: response => {
        self.setState({
          subtasks: response
        });
      }
    });
  }
  render() {
    return (
      <div className="item_content">
        <ul className="collection with-header">
          <li className="collection-header">
            <span>
              {this.props.name}
            </span>
          </li>

          {this.state.subtasks.map((item, index) => {
            return (
              <ListItem
                key={`item-${index}`}
                item={item.content}
                id={item._id}
                remove={this.removeItem}
              />
            );
          })}
        </ul>

        <div
          className={this.state.visible ? "input-field active" : "input-field"}
        >
          <textarea className="materialize-textarea" ref="item_value" />
        </div>
        <a
          className={
            this.state.visible
              ? "waves-effect waves-light btn no_active"
              : "waves-effect waves-light btn"
          }
          onClick={this.showArea}
        >
          <i className="material-icons right">note_add</i>
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
      board: {
        lists: []
      }
    };
  }
  componentWillMount() {
    let self = this;
    $.get(
      `http://localhost:3000/api/board/${this.props.match.params.id}`,
      res => {
        const board = res[0];
        self.setState({
          board
        });
      }
    );
  }
  addList(val) {
    let self = this;
    let boardNow = this.state.board;
    let newItem = {
      name: val
    };

    boardNow.lists.push(newItem);

    $.ajax({
      url: `http://localhost:3000/api/board/${this.props.match.params.id}`,
      type: "PUT",
      data: {
        board_id: self.state.board._id,
        list: self.state.board.lists
      },
      success: response => {
        self.setState({
          board: response
        });
      }
    });
  }
  render() {
    return (
      <div className="add_list">
        {this.state.board.lists.map((item, index) => {
          return (
            <List
              name={item.name}
              key={`item-${index}`}
              list_id={item._id}
              board_id={this.state.board._id}
              subtasks={item.subtusks}
            />
          );
        })}
        <AddButton add={this.addList.bind(this)} />
      </div>
    );
  }
}

export default Board;
