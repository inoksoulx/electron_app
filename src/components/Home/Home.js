import "./Home.sass";
import React, { PropTypes, Component } from "react";
import { Link } from "react-router-dom";

class BoardList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Link to={`/boards/${this.props.name}`} className="waves-effect waves-light btn-large">
        {this.props.name}
      </Link>
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
  showForm() {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  addBoard() {
    let boardsList = this.state.boards;

    boardsList.push(this.state.value);

    this.setState({
      boards: boardsList
    });

    console.log(this.state.boards);
  }
  render() {
    return (
      <div className="container">
        {this.state.boards.map((item, index) => {
          return <BoardList key={`item-${index}`} name={item} />;
        })}
        <div className="add_board">
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
