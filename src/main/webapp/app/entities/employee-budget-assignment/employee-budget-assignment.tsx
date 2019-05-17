import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-budget-assignment.reducer';
import { IEmployeeBudgetAssignment } from 'app/shared/model/employee-budget-assignment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeBudgetAssignmentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class EmployeeBudgetAssignment extends React.Component<IEmployeeBudgetAssignmentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { employeeBudgetAssignmentList, match } = this.props;
    return (
      <div>
        <h2 id="employee-budget-assignment-heading">
          <Translate contentKey="eciApp.employeeBudgetAssignment.home.title">Employee Budget Assignments</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="eciApp.employeeBudgetAssignment.home.createLabel">Create new Employee Budget Assignment</Translate>
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
                  <Translate contentKey="eciApp.employeeBudgetAssignment.usage">Usage</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.employeeBudgetAssignment.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.employeeBudgetAssignment.endDate">End Date</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.employeeBudgetAssignment.employee">Employee</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.employeeBudgetAssignment.budget">Budget</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeBudgetAssignmentList.map((employeeBudgetAssignment, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeeBudgetAssignment.id}`} color="link" size="sm">
                      {employeeBudgetAssignment.id}
                    </Button>
                  </td>
                  <td>{employeeBudgetAssignment.usage}</td>
                  <td>
                    <TextFormat type="date" value={employeeBudgetAssignment.startDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={employeeBudgetAssignment.endDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    {employeeBudgetAssignment.employee ? (
                      <Link to={`employee/${employeeBudgetAssignment.employee.id}`}>{employeeBudgetAssignment.employee.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employeeBudgetAssignment.budget ? (
                      <Link to={`budget/${employeeBudgetAssignment.budget.id}`}>{employeeBudgetAssignment.budget.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeeBudgetAssignment.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeBudgetAssignment.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeBudgetAssignment.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ employeeBudgetAssignment }: IRootState) => ({
  employeeBudgetAssignmentList: employeeBudgetAssignment.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeBudgetAssignment);
