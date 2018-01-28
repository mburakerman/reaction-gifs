import React, { Component } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

import externalIcon from "./img/external.svg";
import clipboardIcon from "./img/clipboard.svg";
import twitterIcon from "./img/twitter.svg";
import facebookIcon from "./img/facebook.svg";
import preloader from "./img/preloader.svg";

import { connect } from "react-redux";

class Gifs extends Component {
  state = {
    fetched: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.feelings) {
      this.setState({
        fetched: true
      });
    }
  }

  notify() {
    toast("Link copied to clipboard! 🦄", {
      position: toast.POSITION.TOP_CENTER
    });
  }

  render() {
    return (
      <section className="col-md-8 gifs">
        {this.state.fetched ? (
          <div className="card-columns">
            {this.props.feelings.data.map((item, index) => {
              return (
                <div key={item.id} id={item.id} className="gif card">
                  <img
                    className="card-img-top img-fluid lazyload gif-img"
                    src={preloader}
                    data-src={item.images.downsized.url}
                    alt={item.title}
                  />
                  <div className="card-block">
                    <div className="float-left icons">
                      <a
                        href={
                          "https://twitter.com/share?url=" +
                          item.images.original.url
                        }
                        target="_blank"
                        rel="external"
                      >
                        <img
                          className="twitter-icon icon"
                          src={twitterIcon}
                          alt="twitter icon"
                          title="Share on twitter"
                        />
                      </a>

                      <a
                        href={
                          "http://www.facebook.com/sharer/sharer.php?u=" +
                          item.images.original.url
                        }
                        target="_blank"
                        rel="external"
                      >
                        <img
                          className="facebook-icon icon"
                          src={facebookIcon}
                          alt="facebook icon"
                          title="Share on facebook"
                        />
                      </a>
                    </div>

                    <div className="float-right icons">
                      <CopyToClipboard
                        text={item.images.original.url}
                        onCopy={() =>
                          this.setState({ copiedToClipboard: true })
                        }
                      >
                        <img
                          onClick={this.notify.bind(this)}
                          className="copy-the-clipboard icon"
                          src={clipboardIcon}
                          alt="copy the clipboard"
                          title="Copy to clipboard"
                        />
                      </CopyToClipboard>

                      <a
                        href={item.images.original.url}
                        target="_blank"
                        rel="external"
                      >
                        <img
                          className="external-icon icon"
                          src={externalIcon}
                          alt="external link"
                          title="Open gif on new tab"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {" "}
            <span>👀</span> loading... <span>👀</span>{" "}
          </div>
        )}
      </section>
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
export default connect(mapStateToProps)(Gifs);
