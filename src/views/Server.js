import React from "react";
import { Container, Row} from "shards-react";
import ServiceStatus from "../components/common/ServiceStatus";

import PageTitle from "../components/common/PageTitle";
import { connect } from "react-redux";
import { LoadServices } from './../actions/index';

class Servers extends React.Component {
  LoadServerData = () => {
    this.props.LoadServices(this.props.currentEnvironmentId, 'Server');
  }
  componentDidMount() {
    this.LoadServerData();
  }
  constructor(props) {
    super(props);
    this.state = {
      backgroundImage: require("../images/content-management/server.jpg"),
    };
  }

  render() {
    const { serviceList } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Windows Service Monitor"
            subtitle="Service"
            className="text-sm-left"
          />
        </Row>
        {/* Second Row of Posts */}
        <Row>
          {serviceList.map((service, idx) => (
            <ServiceStatus
              environment={service.environment}
              backgroundImage={this.state.backgroundImage}
              serviceStatus={service.currentStatus}
              categoryTheme={service.currentStatus ? 'success' : 'danger'}
              message={service.description}
              description={`Service is monitored ${service.numberOfTimeMonitored} number of times`}
              date={service.lastMonitored}
              serviceId={service.serviceId}
              serviceName={service.serviceName}
            />
          ))}
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentEnvironmentId: state.environments.currentEnvironment,
    serviceList: state.servicesData.serviceList
  };

};
export default connect(mapStateToProps, { LoadServices })(Servers);
