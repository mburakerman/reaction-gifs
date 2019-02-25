import React, { Component } from "react";
import "./app.css";

import Select from "react-select";
import "react-select/dist/react-select.css";

import { ToastContainer } from "react-toastify";
import axios from "axios";
import "lazysizes";
import Sticky from "react-stickynode";

import Gifs from "./gifs";

import { connect } from "react-redux";

const feelings = [
  { value: "amused", label: "amused" },
  { value: "angry", label: "angry" },
  { value: "bored", label: "bored" },
  { value: "confused", label: "confused" },
  { value: "dancey", label: "dancey" },
  { value: "disappointed", label: "disappointed" },
  { value: "disinterested", label: "disinterested" },
  { value: "embarrassed", label: "embarrassed" },
  { value: "excited", label: "excited" },
  { value: "frustrated", label: "frustrated" },
  { value: "happy", label: "happy" },
  { value: "indifferent", label: "indifferent" },
  { value: "interested", label: "interested" },
  { value: "lazy", label: "lazy" },
  { value: "longing", label: "longing" },
  { value: "proud", label: "proud" },
  { value: "sad", label: "sad" },
  { value: "satisfied", label: "satisfied" },
  { value: "scared", label: "scared" },
  { value: "shocked", label: "shocked" },
  { value: "skeptical", label: "skeptical" },
  { value: "sleepy", label: "sleepy" },
  { value: "suprised", label: "suprised" },
  { value: "wild", label: "wild" }
];

const answers = [
  { value: "yes", label: "yes" },
  { value: "hell-yes", label: "hell yes" },
  { value: "undecided", label: "undecided" },
  { value: "no", label: "no" },
  { value: "hell-no", label: "hell no" },
  { value: "wtf", label: "wtf" },
  { value: "lol", label: "lol" },
  { value: "wow", label: "wow" }
];

class App extends Component {
  state = {
    bigScreen: true
  };

  giphy(feeling, gifLimit = 50) {
    var host = "https://api.giphy.com";
    var path = "/v1/gifs/search?";
    var query = "q=" + feeling;
    var api_key = "&api_key=dc6zaTOxFJmzC";
    var limit = "&limit" + gifLimit;

    var url = host + path + query + api_key + limit;

    axios.get(url).then(response => {
      const d = response.data;

      this.props.dispatch({ type: "GIPHY", payload: d });
    });
  }

  handleChange = selectedValue => {
    this.props.dispatch({ type: "MENU", payload: selectedValue || "" });
  };

  checkScreen() {
    if (window.outerWidth < 768) {
      this.setState({
        bigScreen: false
      });
    } else {
      this.setState({
        bigScreen: true
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedOption !== this.props.selectedOption) {
      this.giphy(nextProps.selectedOption.value);
    }
  }

  componentWillMount() {
    this.giphy("happy");

    window.addEventListener("resize", () => {
      this.checkScreen();
    });
    this.checkScreen();
  }

  render() {
    const { selectedOption } = this.props;
    const value = selectedOption && selectedOption.value;

    return (
      <div>
        <div className="container">
          <h1 className="title">
            <a href="/reaction-gifs">
              REACTION GIFS <span>💭</span>
            </a>
          </h1>

          <div className="row d-flex flex-row-reverse">
            <ToastContainer autoClose={3000} />

            <section className="col-md-4 menu">
              <Sticky enabled={this.state.bigScreen} top={0}>
                <div>
                  <h3 className="select-title">
                    <span>🔥</span> I am feeling...
                  </h3>

                  <Select
                    name="feelings"
                    value={value || ""}
                    onChange={this.handleChange}
                    options={feelings}
                  />

                  <h3 className="select-title">
                    <span>👏</span> My answer is...
                  </h3>
                  <Select
                    name="answers"
                    value={value || ""}
                    onChange={this.handleChange}
                    options={answers}
                  />

                  <footer>
                    <p>
                      <span>❤️</span>{" "}
                      <a
                        className="text-muted"
                        href="https://developers.giphy.com/"
                        target="_blank"
                      >
                        Giphy API
                      </a>
                    </p>
                    <p>
                      <span>📁</span>{" "}
                      <a
                        className="text-muted"
                        href="https://github.com/mburakerman/reaction-gifs"
                        target="_blank"
                      >
                        Github
                      </a>
                    </p>
                    <p>
                      <span>©️</span>{" "}
                      <a
                        className="text-muted"
                        href="http://mburakerman.com"
                        target="_blank"
                      >
                        Mehmet Burak Erman
                      </a>
                    </p>
                  </footer>
                </div>
              </Sticky>
            </section>

            <Gifs />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedOption: state.selectedOption,
    feelings: state.feelings,
    copiedToClipboard: state.copiedToClipboard
  };
};
export default connect(mapStateToProps)(App);
