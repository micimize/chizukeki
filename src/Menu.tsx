import * as React from "react";
import { Text, View, Platform, Dimensions, Image } from "react-native";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Link } from "./routing/router";

import { Button, connectStyle, variables, Right, Icon } from "native-base";
import Header from "./generics/header";

let tabStyles = {
  link: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "rgb(0, 0, 0)"
  },
  linkText: {
    color: variables.btnInfoColor,
    textDecorationLine: "none"
  },
  linkTextSelected: {
    color: "rgb(0, 0, 0)",
    textDecorationLine: "none"
  },
  selected: {
    backgroundColor: "rgb(253,184, 34)"
  }
};

let navStyles = {
  ...tabStyles,
  container: {
    backgroundColor: "black" // variables.btnInfoBg
  }
};

@connectStyle("PeerKeeper.Nav.Tab", tabStyles)
class Tab extends React.Component<{
  name: string;
  link?: string;
  selected: string;
  style?: any;
}> {
  render() {
    let {
      name,
      link = `/${this.props.name.toLowerCase()}`,
      style,
      selected
    } = this.props;
    let linkStyle = Object.assign(
      {},
      style.link,
      selected === link ? style.selected : {}
    );
    let linkText = selected === link ? style.linkTextSelected : style.linkText;
    return (
      <Link to={link} style={linkStyle}>
        <Text style={linkText}>{name}</Text>
      </Link>
    );
  }
}

class Logo extends React.Component<{}, { width: number; height: number }> {
  constructor(props) {
    super(props);
    this.state = Dimensions.get("window");
  }
  resize = () => this.setState(Dimensions.get("window"));
  componentDidMount() {
    Dimensions.addEventListener("change", this.resize);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.resize);
  }
  render() {
    return Dimensions.get("window").width > 600 ? (
      <Image
        source={require("./branding/yellow-header@6x.png")}
        style={{
          marginLeft: 15,
          marginRight: 15,
          width: 130,
          resizeMode: "contain" // Image.resizeMode.contain
        }}
      />
    ) : (
      <Image
        source={require("./branding/logo-contained@6x.png")}
        style={{
          marginLeft: 15,
          marginRight: 15,
          width: 30,
          resizeMode: "contain" // Image.resizeMode.contain
        }}
      />
    );
  }
}

// removed style connection because of withRouter rerendering issues
class Nav extends React.Component<{
  location: { pathname: string };
  logout: () => any;
}> {
  constructor(props) {
    super(props);
  }
  render() {
    let { location, logout } = this.props;
    return (
      <Header style={navStyles.container}>
        <Logo />
        <Tab name="Wallet" selected={location.pathname} />
        <Tab name="Assets" selected={location.pathname} />
        <Right>
          <Link onPress={logout} to="/login" style={navStyles.link}>
            <Icon name="sign-out" style={{ color: "white" }} />
          </Link>
        </Right>
      </Header>
    );
  }
}

export default withRouter(connect(
  () => ({}),
  dispatch => ({ logout: () => dispatch({ type: "HARD_LOGOUT" }) })
)(Nav) as any);
