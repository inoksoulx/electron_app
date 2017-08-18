import React from "react";
import ReactDom from "react-dom";
import Home from "./components/Home/Home.js";
import Board from "./components/Boards/Board.js";
import { HashRouter, Route, Link } from "react-router-dom";

import "./styles/global.sass";

const App = () =>
  <HashRouter>
		<div>
			<Route exact path="/" component={Home} />
    	<Route path="/boards/:id" component={Board} />
		</div>
  </HashRouter>;

ReactDom.render(<App />, document.getElementById("react-root"));
