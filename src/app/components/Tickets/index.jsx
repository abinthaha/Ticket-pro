import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import PaginationComponent from '../../common/Pagination';

import { getTickets } from "./data/action";

import "./styles/styles.scss";

class TicketsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketData: [],
      filterData: [],
      paginationIndex: 1,
      filters: {
        ticketId: "",
        type: "0",
        status: "0"
      }
    };
    this.onPaginationChange = this.onPaginationChange.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/login");
    }
    this.props.getTickets();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.ticketData &&
      nextProps.ticketData !== this.props.ticketData
    ) {
      this.setState(
        {
          ...this.state,
          ticketData: nextProps.ticketData
        },
        () => {
          this.filterTable();
        }
      );
    }
  }

  onChange(type, ev) {
    this.setState(
      {
        ...this.state,
        filters: {
          ...this.state.filters,
          [type]: ev.target.value
        }
      },
      () => {
        this.filterTable();
      }
    );
  }

  filterTable() {
    const { filters, ticketData } = this.state;
    const filterData = ticketData.filter(item => {
      return (
        item.ticket_id.indexOf(filters.ticketId) > -1 &&
        (filters.type === "0" || item.type === parseInt(filters.type)) &&
        (filters.status === "0" || item.status === parseInt(filters.status))
      );
    });
    this.setState({
      ...this.state,
      filterData
    });
  }

  editTicket(ticketId) {
    this.props.history.push("/create-ticket?ticket_id=" + ticketId);
  }

  onPaginationChange(index) {
    this.setState({
      ...this.state,
      paginationIndex: index
    })
  }

  render() {
    const tableData =
      this.state.filterData &&
      this.state.filterData.slice((this.state.paginationIndex - 1) * 10, this.state.paginationIndex * 10).map(ticket => {
        return (
          <tr key={ticket.ticket_id} className="ticket-item">
            <td className="edit-icon-cell">
              <span
                onClick={ev => this.editTicket(ticket.ticket_id)}
                className="edit-icon"
              />
            </td>
            <td>{ticket.ticket_id}</td>
            <td>{ticket.title}</td>
            <td>{ticket.description}</td>
            <td>{ticket.assigned_to}</td>
            {
              this.props.userData && this.props.userData.role_id === 1 && <td>{ticket.created_by}</td>
            }            
            <td>{new Date(ticket.created_date).toLocaleDateString()}</td>
            <td>{ticket.type === 1 ? "Service" : "Bug"}</td>
            <td>
              {ticket.status === 1
                ? "Not Started"
                : ticket.status === 2
                ? "In Progress"
                : "Closed"}
            </td>
          </tr>
        );
      });

    return (
      <section className="tickets-wrapper container">
        {
          this.state.ticketData.length  > 0 ? (
            <div>
              <table className="ticket-table">
                <thead>
                  <tr className="filter-row">
                    <th />
                    <th>
                      <input
                        type="text"
                        onChange={ev => this.onChange("ticketId", ev)}
                        placeholder="search"
                      />
                    </th>
                    <th />
                    <th />
                    <th />
                    <th />
                    {
                      this.props.userData && this.props.userData.role_id === 1 && <th />
                    }
                    <th>
                      <select
                        name=""
                        id=""
                        value={this.state.filters.type}
                        onChange={ev => this.onChange("type", ev)}
                      >
                        <option value="0">All</option>
                        <option value="1">Service</option>
                        <option value="2">Bug</option>
                      </select>
                    </th>
                    <th>
                      <select
                        name=""
                        id=""
                        value={this.state.filters.status}
                        onChange={ev => this.onChange("status", ev)}
                      >
                        <option value="0">All</option>
                        <option value="1">Not Started</option>
                        <option value="2">In Progress</option>
                        <option value="3">Closed</option>
                      </select>
                    </th>
                  </tr>
                  <tr className="table-header">
                    <th>Action</th>
                    <th>Ticket ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Assigned to</th>
                    {
                      this.props.userData && this.props.userData.role_id === 1 && <th>Created By</th>
                    }
                    <th>Created Date</th>
                    <th>Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>{tableData}</tbody>
              </table>
              <PaginationComponent count={this.state.filterData.length} onPaginationChange={this.onPaginationChange} />
            </div>
          ) : (
            <div className='no-ticket-error'>Sorry, there are no tickets</div>
          )
        }
      </section>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    userData: state.userReducer.userData,
    ticketData: state.ticketReducer.ticketData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({ getTickets }, dispatch)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TicketsComponent)
);
