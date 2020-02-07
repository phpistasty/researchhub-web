import { connect } from "react-redux";
import { StyleSheet, css } from "aphrodite";
import InfiniteScroll from "react-infinite-scroller";
import moment from "moment";
import ReactPlaceholder from "react-placeholder/lib";
import "react-placeholder/lib/reactPlaceholder.css";
import Link from "next/link";
import ReactTooltip from "react-tooltip";
import Ripples from "react-ripples";

// Component
import LiveFeed from "~/components/Hubs/LiveFeed";
import HubsList from "~/components/Hubs/HubsList";

// Config
import API from "~/config/api";
import { Helpers } from "@quantfive/js-web-config";
import colors from "~/config/themes/colors";
import { PaperActions } from "~/redux/paper";
import { UPVOTE_ENUM, DOWNVOTE_ENUM } from "~/config/constants";

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

const scopeOptions = [
  {
    value: "week",
    label: "This Week",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "day",
    label: "Today",
  },
  {
    value: "year",
    label: "This Year",
  },
];

const defaultFilter = filterOptions[0];
const defaultScope = scopeOptions[0];

class LiveFeedPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getLiveFeed();
  }

  getLiveFeed = () => {
    let { hub } = this.props;
    let hubId = 0;
    if (hub) {
      hubId = hub.id;
    }
    return fetch(API.GET_LIVE_FEED({ hubId }), API.GET_CONFIG())
      .then(Helpers.checkStatus)
      .then(Helpers.parseJSON)
      .then((res) => {
        this.setState({
          liveFeed: res.results,
        });
      });
  };

  render() {
    let { auth } = this.props;

    return (
      <div className={css(styles.content)}>
        <div className={css(styles.sidebar, styles.column)}>
          <HubsList exclude={null} />
        </div>
        <div className={css(styles.mainFeed, styles.column)}>
          <LiveFeed currentHub={this.props.hub && this.props.hub} home={true} />
        </div>
      </div>
    );
  }
}

var styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "calc(100vh - 80px)",
    display: "flex",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  sidebar: {
    width: "22%",
    position: "relative",
    position: "sticky",
    top: 80,
    backgroundColor: "#FFF",
    "@media only screen and (max-width: 769px)": {
      display: "none",
    },
  },
  mainFeed: {
    height: "100%",
    width: "85%",
    backgroundColor: "#FCFCFC",
    borderLeft: "1px solid #ededed",
    backgroundColor: "#FFF",
    "@media only screen and (max-width: 768px)": {
      width: "100%",
    },
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LiveFeedPage);