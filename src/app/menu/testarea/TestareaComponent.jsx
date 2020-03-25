import React, { Component } from "react";
import { connect } from "react-redux";
import {
  incrementCounter,
  decrementCounter
} from "../../actions/testarea/testareaAction";

const mapState = state => ({
  data: state.test.data
});

const actions = {
  incrementCounter,
  decrementCounter
};

class TestareaComponent extends Component {
  render() {
    const { data, incrementCounter, decrementCounter } = this.props;
    return (
      <div>
        <h3> Test Area Component: {data}</h3>

        <button
          name="increment"
          onClick={incrementCounter}
        //   onClick={e => incrementAsync(e.currentTarget.name)}
          className={
            // buttonName === "increment" && loading === true
            //   ? "button is-link is-small is-rounded is-outlined is-loading"
            //   :
            "button is-link is-small is-rounded is-outlined"
          }
          style={{ marginRight: 5 }}
          //   disabled={buttonName === "increment" && loading}
        >
          <i className="icon fas fa-plus" />
        </button>

        <button
          name="decrement"
          onClick={decrementCounter}
        //   onClick={e => incrementAsync(e.currentTarget.name)}
          className={
            // buttonName === "increment" && loading === true
            //   ? "button is-link is-small is-rounded is-outlined is-loading"
            //   :
            "button is-link is-small is-rounded is-outlined"
          }
          style={{ marginRight: 5 }}
          //   disabled={buttonName === "increment" && loading}
        >
          <i className="icon fas fa-minus" />
        </button>
      </div>
    );
  }
}

export default connect(mapState, actions)(TestareaComponent);
