import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-budget-assignment.reducer';
import { IEmployeeBudgetAssignment } from 'app/shared/model/employee-budget-assignment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeBudgetAssignmentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EmployeeBudgetAssignmentDetail extends React.Component<IEmployeeBudgetAssignmentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { employeeBudgetAssignmentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="eciApp.employeeBudgetAssignment.detail.title">EmployeeBudgetAssignment</Translate> [
            <b>{employeeBudgetAssignmentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="usage">
                <Translate contentKey="eciApp.employeeBudgetAssignment.usage">Usage</Translate>
              </span>
            </dt>
            <dd>{employeeBudgetAssignmentEntity.usage}</dd>
            <dt>
              <span id="startDate">
                <Translate contentKey="eciApp.employeeBudgetAssignment.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={employeeBudgetAssignmentEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">
                <Translate contentKey="eciApp.employeeBudgetAssignment.endDate">End Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={employeeBudgetAssignmentEntity.endDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="eciApp.employeeBudgetAssignment.employee">Employee</Translate>
            </dt>
            <dd>{employeeBudgetAssignmentEntity.employee ? employeeBudgetAssignmentEntity.employee.id : ''}</dd>
            <dt>
              <Translate contentKey="eciApp.employeeBudgetAssignment.budget">Budget</Translate>
            </dt>
            <dd>{employeeBudgetAssignmentEntity.budget ? employeeBudgetAssignmentEntity.budget.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/employee-budget-assignment" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/employee-budget-assignment/${employeeBudgetAssignmentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ employeeBudgetAssignment }: IRootState) => ({
  employeeBudgetAssignmentEntity: employeeBudgetAssignment.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeBudgetAssignmentDetail);
