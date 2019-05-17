import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmployee } from 'app/shared/model/employee.model';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { getEntity, updateEntity, createEntity, reset } from './next-of-kin.reducer';
import { INextOfKin } from 'app/shared/model/next-of-kin.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INextOfKinUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INextOfKinUpdateState {
  isNew: boolean;
  employeeId: string;
}

export class NextOfKinUpdate extends React.Component<INextOfKinUpdateProps, INextOfKinUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: '0',
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

    this.props.getEmployees();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { nextOfKinEntity } = this.props;
      const entity = {
        ...nextOfKinEntity,
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
    this.props.history.push('/entity/next-of-kin');
  };

  render() {
    const { nextOfKinEntity, employees, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="eciApp.nextOfKin.home.createOrEditLabel">
              <Translate contentKey="eciApp.nextOfKin.home.createOrEditLabel">Create or edit a NextOfKin</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : nextOfKinEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="next-of-kin-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="next-of-kin-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="firstNameLabel" for="next-of-kin-firstName">
                    <Translate contentKey="eciApp.nextOfKin.firstName">First Name</Translate>
                  </Label>
                  <AvField
                    id="next-of-kin-firstName"
                    type="text"
                    name="firstName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="next-of-kin-lastName">
                    <Translate contentKey="eciApp.nextOfKin.lastName">Last Name</Translate>
                  </Label>
                  <AvField
                    id="next-of-kin-lastName"
                    type="text"
                    name="lastName"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="next-of-kin-email">
                    <Translate contentKey="eciApp.nextOfKin.email">Email</Translate>
                  </Label>
                  <AvField id="next-of-kin-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="homeNumberLabel" for="next-of-kin-homeNumber">
                    <Translate contentKey="eciApp.nextOfKin.homeNumber">Home Number</Translate>
                  </Label>
                  <AvField id="next-of-kin-homeNumber" type="text" name="homeNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="mobileNumberLabel" for="next-of-kin-mobileNumber">
                    <Translate contentKey="eciApp.nextOfKin.mobileNumber">Mobile Number</Translate>
                  </Label>
                  <AvField id="next-of-kin-mobileNumber" type="text" name="mobileNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="kinshipLabel" for="next-of-kin-kinship">
                    <Translate contentKey="eciApp.nextOfKin.kinship">Kinship</Translate>
                  </Label>
                  <AvInput
                    id="next-of-kin-kinship"
                    type="select"
                    className="form-control"
                    name="kinship"
                    value={(!isNew && nextOfKinEntity.kinship) || 'SPOUSE'}
                  >
                    <option value="SPOUSE">
                      <Translate contentKey="eciApp.KinshipType.SPOUSE" />
                    </option>
                    <option value="FATHER">
                      <Translate contentKey="eciApp.KinshipType.FATHER" />
                    </option>
                    <option value="MOTHER">
                      <Translate contentKey="eciApp.KinshipType.MOTHER" />
                    </option>
                    <option value="BROTHER">
                      <Translate contentKey="eciApp.KinshipType.BROTHER" />
                    </option>
                    <option value="SISTER">
                      <Translate contentKey="eciApp.KinshipType.SISTER" />
                    </option>
                    <option value="OTHER">
                      <Translate contentKey="eciApp.KinshipType.OTHER" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="next-of-kin-employee">
                    <Translate contentKey="eciApp.nextOfKin.employee">Employee</Translate>
                  </Label>
                  <AvInput id="next-of-kin-employee" type="select" className="form-control" name="employee.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/next-of-kin" replace color="info">
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
  employees: storeState.employee.entities,
  nextOfKinEntity: storeState.nextOfKin.entity,
  loading: storeState.nextOfKin.loading,
  updating: storeState.nextOfKin.updating,
  updateSuccess: storeState.nextOfKin.updateSuccess
});

const mapDispatchToProps = {
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
)(NextOfKinUpdate);
