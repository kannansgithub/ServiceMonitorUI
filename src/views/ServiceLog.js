import React, { Component } from 'react'
import { connect } from 'react-redux';
import { LoadServiceLog } from '../actions';
import { pageSize } from '../constants/constant';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import MUIDataTable from "mui-datatables";

 class ServiceLog extends Component {
    componentDidUpdate() {
        console.log(this.props.currentEnvironmentId)
        if (this.props.currentEnvironmentId && this.props.match.params.serviceId) {
            alert('Data Info');
            const request = {
                serviceId: this.props.match.params.serviceId,
                environmentId: this.props.currentEnvironmentId,
                searchQuery: '',
                currentPage: 1,
                orderBy: '',
                fields: '',
                pageSize: pageSize
            }
            this.props.LoadServiceLog(request);
        } else {
            alert('Invalid Info');
        }
        
    }
     render() {
         const columns = [
             {
                 name: "name",
                 label: "Name",
                 options: {
                     filter: true,
                     sort: true,
                 }
             },
             {
                 name: "company",
                 label: "Company",
                 options: {
                     filter: true,
                     sort: false,
                 }
             },
             {
                 name: "city",
                 label: "City",
                 options: {
                     filter: true,
                     sort: false,
                 }
             },
             {
                 name: "state",
                 label: "State",
                 options: {
                     filter: true,
                     sort: false,
                 }
             },
         ];

         const data = [
             { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
             { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
             { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
             { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
         ];

         const options = {
             filterType: 'checkbox',
         };
        
        return (
            <React.Fragment>
                <MUIDataTable
                    title={"Employee List"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        currentEnvironmentId: state.environments.currentEnvironment
    };

};
export default connect(mapStateToProps, { LoadServiceLog})(ServiceLog);