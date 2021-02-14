import React, { Component } from "react";
import { Nav } from "shards-react";
import Notifications from "./Notifications";
import UserActions from "./UserActions";
import { FormSelect } from "shards-react";
import { connect } from "react-redux";
import { GetAllEnvironment, LoadDashboard, LoadServices } from "../../../../actions";
class NavbarNav extends Component {
  componentDidMount = () => {
    this.props.GetAllEnvironment();
  };
  onEnvironmentChange = (e) => {
    const envId = e.target.value;
    if (envId) {
      this.props.LoadDashboard(envId)
      if (this.props.currentCategory) {
        this.props.LoadServices(envId, this.props.currentCategory);
      }
    }
  }
  render() {
    const { environmentList } = this.props;
    return (
      <Nav navbar className="border-left flex-row">
        <Notifications />
        <div className="ml-3 input-group input-group-seamless margintop7">
          <FormSelect id="feInputState" className="navbar-search form-control" onChange={this.onEnvironmentChange} >
            {environmentList &&  environmentList.map((e, key) => {
              return <option key={key} value={e.id}>{e.name}</option>;
            })}
          </FormSelect>
        </div>
        <UserActions />
      </Nav>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    environmentList: state.environments.environmentList,
    currentCategory: state.environments.currentCategory
  };

};
export default connect(
  mapStateToProps,
  { GetAllEnvironment, LoadDashboard, LoadServices }
)(NavbarNav);
