import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "antd";
import { sortChanged, tagFilterChanged } from "../store/actions";
import "../blocks/header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: "desc",
      comments: "desc"
    };
  }

  sortOrderChangeHandler = field => {
    return () => {
      this.props.sortChange(field, this.state[field]);
      this.setState(prevState => {
        return { [field]: prevState[field] === "desc" ? "asc" : "desc" };
      });
    };
  };

  debounce = (callback, wait) => {
    let timeout = null;
    return e => {
      const value = e.target.value;
      const next = () => callback(value);
      clearTimeout(timeout);
      timeout = setTimeout(next, wait);
    };
  };

  tagFilterHandler = this.debounce(value => {
    this.props.tagFilterChanged(value);
  }, 300);

  render() {
    const { likes, comments } = this.state;

    return (
      <div className="header_container">
        <div>
          <span>Filter by tags  </span>
          <input onKeyUp={this.tagFilterHandler} />
        </div>
        <div>
          <span>Sort by likes</span>
          <Icon
            type={likes === "desc" ? "caret-up" : "caret-down"}
            onClick={this.sortOrderChangeHandler("likes")}
          />
        </div>
        <div>
          <span>Sort by comments</span>
          <Icon
            type={comments === "desc" ? "caret-up" : "caret-down"}
            onClick={this.sortOrderChangeHandler("comments")}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sortChange: (field, direction) => dispatch(sortChanged(field, direction)),
    tagFilterChanged: value => dispatch(tagFilterChanged(value))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Header);
