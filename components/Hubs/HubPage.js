import Link from "next/link";
import Router from "next/router";
import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import InfiniteScroll from "react-infinite-scroller";

// Component
import Button from "~/components/Form/Button";
import HubsList from "~/components/Hubs/HubsList";
import FormSelect from "~/components/Form/FormSelect";
import PaperEntryCard from "~/components/Hubs/PaperEntryCard";
import Loader from "~/components/Loader/Loader";
import GoogleLoginButton from "~/components/GoogleLoginButton";

// Redux
import { ModalActions } from "~/redux/modals";
import { AuthActions } from "~/redux/auth";

// Config
import API from "~/config/api";
import { Helpers } from "@quantfive/js-web-config";
import colors from "~/config/themes/colors";

const filterOptions = [
  {
    value: "top_rated",
    label: "Top Rated",
  },
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "most_discussed",
    label: "Most Discussed",
  },
];

const filterScope = [
  {
    value: "year",
    label: "This Year",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "day",
    label: "Today",
  },
];

class HubPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      count: 0,
      papers: [],
      filterBy: {},
      scope: {},
    };
  }

  componentDidMount() {
    this.fetchPapers(1);
  }

  fetchPapers = (page) => {
    return fetch(API.PAPER({ page }), API.GET_CONFIG())
      .then(Helpers.checkStatus)
      .then(Helpers.parseJSON)
      .then((res) => {
        this.setState({
          count: res.count,
          page: page,
          papers: [...this.state.papers, ...res.results],
          next: res.next,
        });
      });
  };

  render() {
    let { auth, hub } = this.props;

    return (
      <div className={css(styles.content, styles.column)}>
        <div className={css(styles.homeBanner)}>
          <img
            src={"/static/background/homepage.png"}
            className={css(styles.bannerOverlay)}
          />
          <div
            className={css(
              styles.column,
              styles.titleContainer,
              auth.isLoggedIn && styles.centered
            )}
          >
            <div className={css(styles.header, styles.text)}>
              Welcome to {this.props.hub.name}!
            </div>
            <div className={css(styles.subtext, styles.text)}>
              We're a community seeking to prioritization, collaboraten,
              reproducability, and funding of scientic research.{" "}
              <span className={css(styles.readMore)}>Read more</span>
            </div>
            {!auth.isLoggedIn && (
              <GoogleLoginButton
                googleLogin={this.props.googleLogin}
                getUser={this.props.getUser}
              />
            )}
          </div>
        </div>
        <div className={css(styles.row, styles.body)}>
          <div className={css(styles.sidebar, styles.column)}>
            <HubsList exclude={this.props.hub.name} />
          </div>
          <div className={css(styles.mainFeed, styles.column)}>
            <div className={css(styles.topbar, styles.row)}>
              <div className={css(styles.text, styles.feedTitle)}>
                Top Papers on {this.props.hub.name}
              </div>
              <div className={css(styles.row, styles.inputs)}>
                <FormSelect
                  options={filterOptions}
                  value={filterOptions[0]}
                  containerStyle={styles.dropDown}
                  inputStyle={{ height: "100%" }}
                />
                <FormSelect
                  options={filterScope}
                  value={filterScope[0]}
                  containerStyle={styles.dropDown}
                  inputStyle={{ height: "100%" }}
                />
              </div>
            </div>
            <div className={css(styles.infiniteScroll)}>
              <InfiniteScroll
                pageStart={this.state.page}
                loadMore={(count) => {
                  this.fetchPapers(count + 1);
                }}
                hasMore={this.state.count > this.state.papers.length}
                loader={<Loader loading={true} />}
              >
                {this.state.papers.map((paper, i) => (
                  <PaperEntryCard
                    key={`${paper.id}-${i}`}
                    paper={paper}
                    index={i}
                    hubName={this.props.hubName}
                  />
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

var styles = StyleSheet.create({
  content: {
    backgroundColor: "#FFF",
    // paddingBottom: 50
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  text: {
    color: "#FFF",
    fontFamily: "Roboto",
    cursor: "default",
  },
  titleContainer: {
    alignItems: "flex-start",
    marginLeft: "calc(100% * .08)",
    justifyContent: "space-between",
    height: 200,
    zIndex: 3,
  },
  centered: {
    height: 120,
  },
  homeBanner: {
    background: "linear-gradient(#684ef5, #5058f6)",
    width: "100%",
    height: 365,
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: "100%",
    width: "100%",
    minWidth: "100%",
    zIndex: 2,
  },
  readMore: {
    cursor: "pointer",
    textDecoration: "underline",
    ":hover": {
      fontWeight: 400,
    },
  },
  header: {
    fontSize: 50,
    fontWeight: 400,
  },
  body: {
    minHeight: 1348,
    backgroundColor: "#FFF",
    width: "100%",
    alignItems: "flex-start",
  },
  sidebar: {
    width: "20%",
    position: "relative",
    position: "sticky",
    top: 0,
    backgroundColor: "#FFF",
  },
  subtext: {
    whiteSpace: "initial",
    width: 670,
    fontSize: 16,
    fontWeight: 300,
  },
  button: {
    height: 55,
    width: 230,
    marginTop: 10,
    marginBottom: 0,
  },
  iconStyle: {
    height: 33,
    width: 33,
  },
  /**
   * MAIN FEED STYLES
   */
  mainFeed: {
    height: "100%",
    width: "80%",
    backgroundColor: "#FFF",
    borderLeft: "1px solid #ededed",
  },
  feedTitle: {
    color: "#000",
    fontWeight: "400",
    fontSize: 33,
  },
  topbar: {
    paddingTop: 30,
    width: "calc(100% - 140px)",
    position: "sticky",
    backgroundColor: "#FFF",
    paddingLeft: 70,
    paddingRight: 70,
    top: 0,
    zIndex: 2,
    // borderBottom: '1px solid #ededed',
  },
  dropDown: {
    width: 248,
    height: 45,
  },
  inputs: {
    width: 516,
  },
  /**
   * INFINITE SCROLL
   */
  infiniteScroll: {
    width: "calc(100% - 140px)",
    backgroundColor: "#FFF",
    paddingLeft: 70,
    paddingRight: 70,
    marginBottom: 20,
  },
  blur: {
    height: 30,
    marginTop: 10,
    backgroundColor: colors.BLUE(0.2),
    width: "100%",
    "-webkit-filter": "blur(6px)",
    "-moz-filter": "blur(6px)",
    "-ms-filter": "blur(6px)",
    "-o-filter": "blur(6px)",
    filter: "blur(6px)",
  },
  blank: {
    opacity: 0,
    height: 60,
  },
});

const mapStateToProps = (state) => ({
  modals: state.modals,
  auth: state.auth,
});

const mapDispatchToProps = {
  googleLogin: AuthActions.googleLogin,
  getUser: AuthActions.getUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HubPage);