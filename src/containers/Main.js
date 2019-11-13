import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import * as selectors from "../store/selectors";
import Card from "./Card";
import Header from "./Header";
import "../blocks/main.scss";

class Main extends Component {
  componentDidMount() {
    this.props.fetch();
  }

  rerenderCards = () => {
    return this.props.cards.map(card => <Card key={card.id} card={card} />);
  };

  render() {
    console.log("render main");
    return (
      <div className="main_container">
        <Header></Header>
        <div className="main_grid">{this.rerenderCards()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cards: selectors.getFilteredCardSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: () => dispatch(actions.fetch())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
