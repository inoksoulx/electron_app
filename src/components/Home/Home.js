import "./Home.sass";
import React, { PropTypes, Component } from "react";
import { Link } from "react-router-dom";

class BoardList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col s12 home_margin">
        <Link
          to={`/boards/${this.props.name}`}
          className="waves-effect waves-light btn-large home_link"
        >
          {this.props.name}
        </Link>
      </div>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      boards: []
    };

    this.showForm = this.showForm.bind(this);
    this.addBoard = this.addBoard.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    let self = this;
    $.get("http://localhost:3000/api/board/", res => {
      const boards = res;
      self.setState({
        boards
      });
    });
  }
  showForm() {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  addBoard() {
    let board = {
      url: this.state.value,
      name: this.state.value
    };

    $.post("http://localhost:3000/api/board/", board);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.boards.map((item, index) => {
            return <BoardList key={`item-${index}`} name={item.name} />;
          })}
        </div>
        <div className="col s12 home_margin">
          <a className="waves-effect waves-light btn" onClick={this.showForm}>
            Add
          </a>
          <div
            className={
              this.state.visible
                ? "input-field add_board_form active"
                : "input-field add_board_form"
            }
          >
            <input
              type="text"
              name="title"
              className="validate"
              onChange={this.handleChange}
            />
            <label htmlFor="title">Type name of your board.</label>
            <Link
              to={`/boards/${this.state.value}`}
              className="btn-floating btn-large waves-effect waves-light"
              onClick={this.addBoard}
            >
              <i className="material-icons">add</i>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
