import React, { Component } from "react";
import { connect } from "react-redux";
import TagsGroup from "../components/EditableTagGroup ";
import { cardUpdate } from "../store/actions";
import "../blocks/card.scss";
import { Icon } from "antd";

class Card extends Component {
  openImgInfo(url) {
    return () => {
      window.open(url, "_blank");
    };
  }

  tagEditCallBack = (tags) => {
    this.props.cardUpdate({id: this.props.card.id, tags});
  };

  render() {
    const { imgUrl, pageUrl, likes, comments, tags } = this.props.card;
    return (
      <div className="card_container">
        <img src={imgUrl} alt="pic" onClick={this.openImgInfo(pageUrl)} />
        <TagsGroup tags={tags} callBack={this.tagEditCallBack}/>
        <div>
          <Icon type="like"/>
          <span>{likes}</span>
          <span> </span>
          <span>comments: </span>
          <span>{comments}</span>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {cardUpdate: (payload => dispatch(cardUpdate(payload)))};
}

export default connect(
  null,
  mapDispatchToProps
)(Card);
