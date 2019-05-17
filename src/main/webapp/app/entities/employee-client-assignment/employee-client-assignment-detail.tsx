import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-client-assignment.reducer';
import { IEmployeeClientAssignment } from 'app/shared/model/employee-client-assignment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeClientAssignmentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EmployeeClientAssignmentDetail extends React.Component<IEmployeeClientAssignmentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { employeeClientAssignmentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="eciApp.employeeClientAssignment.detail.title">EmployeeClientAssignment</Translate> [
            <b>{employeeClientAssignmentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="usage">
                <Translate contentKey="eciApp.employeeClientAssignment.usage">Usage</Translate>
              </span>
            </dt>
            <dd>{employeeClientAssignmentEntity.usage}</dd>
            <dt>
              <span id="startDate">
                <Translate contentKey="eciApp.employeeClientAssignment.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={employeeClientAssignmentEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">
                <Translate contentKey="eciApp.employeeClientAssignment.endDate">End Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={employeeClientAssignmentEntity.endDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="eciApp.employeeClientAssignment.employee">Employee</Translate>
            </dt>
            <dd>{employeeClientAssignmentEntity.employee ? employeeClientAssignmentEntity.employee.id : ''}</dd>
            <dt>
              <Translate contentKey="eciApp.employeeClientAssignment.project">Project</Translate>
            </dt>
            <dd>{employeeClientAssignmentEntity.project ? employeeClientAssignmentEntity.project.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/employee-client-assignment" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/employee-client-assignment/${employeeClientAssignmentEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ employeeClientAssignment }: IRootState) => ({
  employeeClientAssignmentEntity: employeeClientAssignment.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeClientAssignmentDetail);
