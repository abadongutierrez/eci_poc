import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EmployeeDetail extends React.Component<IEmployeeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { employeeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="eciApp.employee.detail.title">Employee</Translate> [<b>{employeeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="firstName">
                <Translate contentKey="eciApp.employee.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.firstName}</dd>
            <dt>
              <span id="middleName">
                <Translate contentKey="eciApp.employee.middleName">Middle Name</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.middleName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="eciApp.employee.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.lastName}</dd>
            <dt>
              <span id="birthday">
                <Translate contentKey="eciApp.employee.birthday">Birthday</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={employeeEntity.birthday} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="role">
                <Translate contentKey="eciApp.employee.role">Role</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.role}</dd>
            <dt>
              <span id="location">
                <Translate contentKey="eciApp.employee.location">Location</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.location}</dd>
            <dt>
              <span id="experienceStartYear">
                <Translate contentKey="eciApp.employee.experienceStartYear">Experience Start Year</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.experienceStartYear}</dd>
            <dt>
              <span id="active">
                <Translate contentKey="eciApp.employee.active">Active</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.active ? 'true' : 'false'}</dd>
            <dt>
              <span id="gender">
                <Translate contentKey="eciApp.employee.gender">Gender</Translate>
              </span>
            </dt>
            <dd>{employeeEntity.gender}</dd>
            <dt>
              <Translate contentKey="eciApp.employee.contactInfo">Contact Info</Translate>
            </dt>
            <dd>{employeeEntity.contactInfo ? employeeEntity.contactInfo.id : ''}</dd>
            <dt>
              <Translate contentKey="eciApp.employee.manager">Manager</Translate>
            </dt>
            <dd>{employeeEntity.manager ? employeeEntity.manager.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/employee" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/employee/${employeeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ employee }: IRootState) => ({
  employeeEntity: employee.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDetail);
