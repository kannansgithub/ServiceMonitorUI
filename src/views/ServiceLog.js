import React, { Component } from 'react'
import { connect } from 'react-redux';
import { LoadServiceLog } from '../actions';
import { pageSize } from '../constants/constant';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import MUIDataTable from "mui-datatables";
import { CircularProgress, Typography } from '@material-ui/core';
//https://github.com/gregnb/mui-datatables/tree/master/examples
class ServiceLog extends Component {
    state = {
        page: 1,
        count: 325,
        rowsPerPage: 10,
        sortOrder: {},
        data: [['Loading Data...']],
        columns: [
            {
                name: "category",
                label: "Category",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "serviceName",
                label: "Service",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "environment",
                label: "Environment",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "status",
                label: "Status",
                options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        // Here you can render a more complex display.
                        // You're given access to tableMeta, which has
                        // the rowData (as well as the original object data).
                        // See the console for a detailed look at this object.

                        console.log('customBodyRender');
                        console.dir(tableMeta);
                        return value===true?'Running':'Not Running';
                    },
                }
            },
            {
                name: "message",
                label: "Message",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "description",
                label: "Description",
                options: {
                    filter: true,
                    sort: true,
                }
            }]
    };
    componentDidMount() {
        this.setState({ isLoading: true });
        if (this.props.currentEnvironmentId && this.props.match.params.serviceId) {
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
        }
     }
    changePage = (page, sortOrder) => {
         //TODO: Need to Call API
        //  this.setState({
        //      isLoading: true,
        //  });
        //  this.xhrRequest(`/myApiServer?page=${page}`, page, sortOrder).then(res => {
             this.setState({
                //  page: res.page,
                 sortOrder,
                //  data: res.data,
                //  count: res.total,
             });
        //  });
        if (this.props.currentEnvironmentId && this.props.match.params.serviceId) {
            const request = {
                serviceId: this.props.match.params.serviceId,
                environmentId: this.props.currentEnvironmentId,
                searchQuery: '',
                currentPage: page,
                orderBy: sortOrder,
                fields: '',
                pageSize: pageSize
            }
            this.props.LoadServiceLog(request);
        }
    };
    sort = (page, sortOrder) => {
        if (this.props.currentEnvironmentId && this.props.match.params.serviceId) {
            const request = {
                serviceId: this.props.match.params.serviceId,
                environmentId: this.props.currentEnvironmentId,
                searchQuery: '',
                currentPage: page,
                orderBy: sortOrder,
                fields: '',
                pageSize: pageSize
            }
            this.props.LoadServiceLog(request);
        }
    };
     render() {
         const options = {
             filter: true,
             filterType: 'dropdown',
             responsive: 'vertical',
             fixedHeader: true,
             fixedSelectColumn: true,
             tableBodyHeight: '400px',
             serverSide: true,
             count: 325,
             rowsPerPage: 10,
             rowsPerPageOptions: [],
             sortOrder: this.state.sortOrder,
             onTableChange: (action, tableState) => {
                 console.log(action, tableState);
                 switch (action) {
                     case 'changePage':
                         this.changePage(tableState.page, tableState.sortOrder);
                         break;
                     case 'sort':
                         this.sort(tableState.page, tableState.sortOrder);
                         break;
                     default:
                         console.log('action not handled.');
                 }
             },
         };
         const { data, loading } = this.props;
         const { columns } = this.state;
         return (
             
            <React.Fragment>
                 {
                     data ? (<MUIDataTable
                         title={
                             <Typography Typography variant="h6" >
                                 Service Logs
                              {loading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
                              </Typography>
                         }
                         data={data}
                         columns={columns}
                         options={options}
                     />) : null
                 } 
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        currentEnvironmentId: state.environments.currentEnvironment,
        loading: state.interceptors.isLoading,
        data: state.servicesData.serviceLogs?state.servicesData.serviceLogs.data:[]
    };

};
export default connect(mapStateToProps, { LoadServiceLog})(ServiceLog);