import React from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
import UsersOverview from "../components/charts/UsersOverview";
import UsersByDevice from "../components/charts/UsersByDevice";
import { connect } from "react-redux";
import { getDashboardData, GetChartData, getOverviewData } from '../constants/dashboardData';

const Dashboard = ({ dashboardDataList }) => (
  <React.Fragment>
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="Service Monitoring Info" subtitle="Dashboard" className="text-sm-left mb-3" />
    </Row>

    {/* Small Stats Blocks */}
    <Row>
        {dashboardDataList && dashboardDataList.dashValues && dashboardDataList.dashValues.map((stats, idx) => (
        <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
              chartData={getDashboardData(idx, stats.serviceType).datasets}
              chartLabels={getDashboardData(idx, stats.serviceType).chartLabels}
              label={stats.serviceType}
              value={stats.count}
          />
        </Col>
      ))}
    </Row>

    <Row>
      {/* Users Overview */}
        <Col lg="8" md="12" sm="12" className="mb-4">
          {dashboardDataList && dashboardDataList.dashOverviewServiceValues ? (<UsersOverview chartData={getOverviewData(dashboardDataList.dashOverviewServiceValues )} />) : (null)}
      </Col>

      {/* Users by Device */}
        <Col lg="4" md="6" sm="12" className="mb-4">
          {dashboardDataList && dashboardDataList.dashMonitoredServiceValues? (<UsersByDevice chartData={GetChartData(dashboardDataList.dashMonitoredServiceValues)} />):(null)}
      </Col>
    </Row>
  </Container>
  </React.Fragment>);
const mapStateToProps = (state) => {
  return {
    dashboardDataList: state.dashboardData.dashboardDataList,
  };

};
export default connect(mapStateToProps,null)(Dashboard);
