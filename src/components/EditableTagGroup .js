import React, { Component } from "react";
import { Tag, Input, Tooltip, Icon } from "antd";
import "../blocks/editableTagGroup.scss";

export default class EditableTagGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: "",
      editMode: false,
    };
  }

  handleClose = removedTag => {
    const tags = this.props.tags.filter(tag => tag !== removedTag);
    this.props.callBack(tags);
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags, callBack } = this.props;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      inputVisible: false,
      inputValue: ""
    });
    callBack(tags);
  };

  handleDoubliClick = () => {
    this.setState((prevState) => ({
      editMode: !prevState.editMode,
    }))

  }

  closeEditHandler = () => {
    this.setState({
      editMode: false,
    });
  }

  saveInputRef = input => (this.input = input);

  render() {
    const { inputVisible, inputValue, editMode } = this.state;
    const { tags } = this.props;
    return (
      <div onDoubleClick={this.handleDoubliClick} >
        <div>
          {tags.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                key={tag}
                closable={editMode}
                onClose={() => this.handleClose(tag)}
                className="tags_tag"
                visible={true}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {inputVisible && editMode && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {!inputVisible && editMode && (
            <Tag
              onClick={this.showInput}
              style={{ background: "#fff", borderStyle: "dashed" }}
            >
              <Icon type="plus" /> New Tag
            </Tag>
          )}
          {
            editMode && (<button onClick={this.closeEditHandler}>close edit</button>)
          }
        </div>
      </div>
    );
  }
}
