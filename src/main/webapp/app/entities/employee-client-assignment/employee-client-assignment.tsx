import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-client-assignment.reducer';
import { IEmployeeClientAssignment } from 'app/shared/model/employee-client-assignment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeClientAssignmentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class EmployeeClientAssignment extends React.Component<IEmployeeClientAssignmentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { employeeClientAssignmentList, match } = this.props;
    return (
      <div>
        <h2 id="employee-client-assignment-heading">
          <Translate contentKey="eciApp.employeeClientAssignment.home.title">Employee Client Assignments</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="eciApp.employeeClientAssignment.home.createLabel">Create new Employee Client Assignment</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.employeeClientAssignment.usage">Usage</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.employeeClientAssignment.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.employeeClientAssignment.endDate">End Date</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.employeeClientAssignment.employee">Employee</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.employeeClientAssignment.project">Project</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeClientAssignmentList.map((employeeClientAssignment, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeeClientAssignment.id}`} color="link" size="sm">
                      {employeeClientAssignment.id}
                    </Button>
                  </td>
                  <td>{employeeClientAssignment.usage}</td>
                  <td>
                    <TextFormat type="date" value={employeeClientAssignment.startDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={employeeClientAssignment.endDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    {employeeClientAssignment.employee ? (
                      <Link to={`employee/${employeeClientAssignment.employee.id}`}>{employeeClientAssignment.employee.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeClientAssignment.project ? (
                      <Link to={`client-project/${employeeClientAssignment.project.id}`}>{employeeClientAssignment.project.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeeClientAssignment.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeClientAssignment.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeClientAssignment.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ employeeClientAssignment }: IRootState) => ({
  employeeClientAssignmentList: employeeClientAssignment.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeClientAssignment);
