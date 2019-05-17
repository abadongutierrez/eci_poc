import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IContactInfo } from 'app/shared/model/contact-info.model';
import { getEntities as getContactInfos } from 'app/entities/contact-info/contact-info.reducer';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEmployeeUpdateState {
  isNew: boolean;
  contactInfoId: string;
  managerId: string;
}

export class EmployeeUpdate extends React.Component<IEmployeeUpdateProps, IEmployeeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      contactInfoId: '0',
      managerId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getContactInfos();
    this.props.getEmployees();
  }

  saveEntity = (event, errors, values) => {
    values.birthday = convertDateTimeToServer(values.birthday);

    if (errors.length === 0) {
      const { employeeEntity } = this.props;
      const entity = {
        ...employeeEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/employee');
  };

  render() {
    const { employeeEntity, contactInfos, employees, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="eciApp.employee.home.createOrEditLabel">
              <Translate contentKey="eciApp.employee.home.createOrEditLabel">Create or edit a Employee</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : employeeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="employee-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="employee-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="firstNameLabel" for="employee-firstName">
                    <Translate contentKey="eciApp.employee.firstName">First Name</Translate>
                  </Label>
                  <AvField
                    id="employee-firstName"
                    type="text"
                    name="firstName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="middleNameLabel" for="employee-middleName">
                    <Translate contentKey="eciApp.employee.middleName">Middle Name</Translate>
                  </Label>
                  <AvField id="employee-middleName" type="text" name="middleName" />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="employee-lastName">
                    <Translate contentKey="eciApp.employee.lastName">Last Name</Translate>
                  </Label>
                  <AvField
                    id="employee-lastName"
                    type="text"
                    name="lastName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="birthdayLabel" for="employee-birthday">
                    <Translate contentKey="eciApp.employee.birthday">Birthday</Translate>
                  </Label>
                  <AvInput
                    id="employee-birthday"
                    type="datetime-local"
                    className="form-control"
                    name="birthday"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.employeeEntity.birthday)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="roleLabel" for="employee-role">
                    <Translate contentKey="eciApp.employee.role">Role</Translate>
                  </Label>
                  <AvField
                    id="employee-role"
                    type="text"
                    name="role"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="locationLabel" for="employee-location">
                    <Translate contentKey="eciApp.employee.location">Location</Translate>
                  </Label>
                  <AvInput
                    id="employee-location"
                    type="select"
                    className="form-control"
                    name="location"
                    value={(!isNew && employeeEntity.location) || 'CDMX'}
                  >
                    <option value="CDMX">
                      <Translate contentKey="eciApp.LocationType.CDMX" />
                    </option>
                    <option value="HMO">
                      <Translate contentKey="eciApp.LocationType.HMO" />
                    </option>
                    <option value="CUU">
                      <Translate contentKey="eciApp.LocationType.CUU" />
                    </option>
                    <option value="SLP">
                      <Translate contentKey="eciApp.LocationType.SLP" />
                    </option>
                    <option value="MERIDA">
                      <Translate contentKey="eciApp.LocationType.MERIDA" />
                    </option>
                    <option value="REMOTE">
                      <Translate contentKey="eciApp.LocationType.REMOTE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="experienceStartYearLabel" for="employee-experienceStartYear">
                    <Translate contentKey="eciApp.employee.experienceStartYear">Experience Start Year</Translate>
                  </Label>
                  <AvField
                    id="employee-experienceStartYear"
                    type="string"
                    className="form-control"
                    name="experienceStartYear"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="activeLabel" check>
                    <AvInput id="employee-active" type="checkbox" className="form-control" name="active" />
                    <Translate contentKey="eciApp.employee.active">Active</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="genderLabel" for="employee-gender">
                    <Translate contentKey="eciApp.employee.gender">Gender</Translate>
                  </Label>
                  <AvInput
                    id="employee-gender"
                    type="select"
                    className="form-control"
                    name="gender"
                    value={(!isNew && employeeEntity.gender) || 'MALE'}
                  >
                    <option value="MALE">
                      <Translate contentKey="eciApp.Gender.MALE" />
                    </option>
                    <option value="FEMALE">
                      <Translate contentKey="eciApp.Gender.FEMALE" />
                    </option>
                    <option value="OTHER">
                      <Translate contentKey="eciApp.Gender.OTHER" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="employee-contactInfo">
                    <Translate contentKey="eciApp.employee.contactInfo">Contact Info</Translate>
                  </Label>
                  <AvInput id="employee-contactInfo" type="select" className="form-control" name="contactInfo.id">
                    <option value="" key="0" />
                    {contactInfos
                      ? contactInfos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="employee-manager">
                    <Translate contentKey="eciApp.employee.manager">Manager</Translate>
                  </Label>
                  <AvInput id="employee-manager" type="select" className="form-control" name="manager.id">
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/employee" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  contactInfos: storeState.contactInfo.entities,
  employees: storeState.employee.entities,
  employeeEntity: storeState.employee.entity,
  loading: storeState.employee.loading,
  updating: storeState.employee.updating,
  updateSuccess: storeState.employee.updateSuccess
});

const mapDispatchToProps = {
  getContactInfos,
  getEmployees,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeUpdate);
