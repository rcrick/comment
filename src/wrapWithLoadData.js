import React, { Component } from 'react';

export default (WrapWithLoadData, name) => {
  class LocalStorageActions extends Component {
    constructor() {
      super();
      this.state = {
        data: null
      };
    }

    componentWillMount() {
      const data = localStorage.getItem(name);
      try {
        this.setState({ data: JSON.parse(data) });
      } catch (e) {
        this.setState({ data });
      }
    }

    saveData(data) {
      try {
        localStorage.setItem(name, JSON.stringify(data));
      } catch (e) {
        localStorage.setItem(name, `${data}`);
      }
    }

    render() {
      return (
        <WrapWithLoadData
          data={this.state.data}
          saveData={this.saveData.bind(this)}
          {...this.props}
        />
      );
    }
  }
  return LocalStorageActions;
};
