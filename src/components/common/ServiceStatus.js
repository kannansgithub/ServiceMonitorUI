import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col, Badge } from "shards-react";

class ServiceStatus extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }
  render() {
    const {
      environment,
      serviceName,
      message,
      description,
      serviceStatus,
      backgroundImage,
      categoryTheme,
      date,
      serviceId
    } = this.props;
    const successImageUrl = require("../../images/content-management/success.png");
    const errorImageUrl = require("../../images/content-management/error.png");
    return (
      <Col lg="6" sm="12" className="mb-4" key={serviceId}>
        <Card small className="card-post card-post--aside card-post--1">
          <div
            className="card-post__image"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          >
            <Badge pill className={`card-post__category bg-${categoryTheme}`}>
              {environment}
            </Badge>
            <div className="card-post__author d-flex">
              <a
                href={`/${serviceId}/service-log`}
                className="card-post__author-avatar card-post__author-avatar--small"
                style={{
                  backgroundImage: `url('${
                    serviceStatus ? successImageUrl : errorImageUrl
                  }')`
                }}
              >
                {" "}
                Kannan
              </a>
            </div>
          </div>
          <CardBody>
            <h6 className="header">{serviceName}</h6>
            <h5 className="card-title">
              <a className="text-fiord-blue" href={`/${serviceId}/service-log`}>
                {message}
              </a>
            </h5>
            <p className="card-text d-inline-block mb-3">{description}</p>
            <br />
            <span className="text-muted">Last Monitored on {date}</span>
            {/* <hr />
                <Button
                  size="sm"
                  className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
                >
                  View Full Report &rarr;
            </Button> */}
          </CardBody>
        </Card>
      </Col>
    );
  }
}

ServiceStatus.propTypes = {
  environment: PropTypes.string,
  serviceName: PropTypes.string,
  message: PropTypes.string,
  description: PropTypes.string,
  serviceStatus: PropTypes.bool,
  serviceId: PropTypes.string,
  backgroundImage: PropTypes.string,
  date: PropTypes.string
};

ServiceStatus.defaultProps = {
  environment: "",
  serviceName: "",
  message: "",
  description: "",
  serviceStatus: false,
  serviceId: "",
  backgroundImage: "",
  date: ""
};

export default ServiceStatus;
