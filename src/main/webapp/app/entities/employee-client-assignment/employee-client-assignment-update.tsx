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
import { IClientProject } from 'app/shared/model/client-project.model';
import { getEntities as getClientProjects } from 'app/entities/client-project/client-project.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-client-assignment.reducer';
import { IEmployeeClientAssignment } from 'app/shared/model/employee-client-assignment.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeClientAssignmentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEmployeeClientAssignmentUpdateState {
  isNew: boolean;
  employeeId: string;
  projectId: string;
}

export class EmployeeClientAssignmentUpdate extends React.Component<
  IEmployeeClientAssignmentUpdateProps,
  IEmployeeClientAssignmentUpdateState
> {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: '0',
      projectId: '0',
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
    this.props.getClientProjects();
  }

  saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const { employeeClientAssignmentEntity } = this.props;
      const entity = {
        ...employeeClientAssignmentEntity,
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
    this.props.history.push('/entity/employee-client-assignment');
  };

  render() {
    const { employeeClientAssignmentEntity, employees, clientProjects, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="eciApp.employeeClientAssignment.home.createOrEditLabel">
              <Translate contentKey="eciApp.employeeClientAssignment.home.createOrEditLabel">
                Create or edit a EmployeeClientAssignment
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : employeeClientAssignmentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="employee-client-assignment-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="employee-client-assignment-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="usageLabel" for="employee-client-assignment-usage">
                    <Translate contentKey="eciApp.employeeClientAssignment.usage">Usage</Translate>
                  </Label>
                  <AvField
                    id="employee-client-assignment-usage"
                    type="string"
                    className="form-control"
                    name="usage"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      min: { value: 0, errorMessage: translate('entity.validation.min', { min: 0 }) },
                      max: { value: 100, errorMessage: translate('entity.validation.max', { max: 100 }) },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="employee-client-assignment-startDate">
                    <Translate contentKey="eciApp.employeeClientAssignment.startDate">Start Date</Translate>
                  </Label>
                  <AvInput
                    id="employee-client-assignment-startDate"
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.employeeClientAssignmentEntity.startDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="employee-client-assignment-endDate">
                    <Translate contentKey="eciApp.employeeClientAssignment.endDate">End Date</Translate>
                  </Label>
                  <AvInput
                    id="employee-client-assignment-endDate"
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.employeeClientAssignmentEntity.endDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="employee-client-assignment-employee">
                    <Translate contentKey="eciApp.employeeClientAssignment.employee">Employee</Translate>
                  </Label>
                  <AvInput id="employee-client-assignment-employee" type="select" className="form-control" name="employee.id">
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
                <AvGroup>
                  <Label for="employee-client-assignment-project">
                    <Translate contentKey="eciApp.employeeClientAssignment.project">Project</Translate>
                  </Label>
                  <AvInput id="employee-client-assignment-project" type="select" className="form-control" name="project.id">
                    <option value="" key="0" />
                    {clientProjects
                      ? clientProjects.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/employee-client-assignment" replace color="info">
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
  clientProjects: storeState.clientProject.entities,
  employeeClientAssignmentEntity: storeState.employeeClientAssignment.entity,
  loading: storeState.employeeClientAssignment.loading,
  updating: storeState.employeeClientAssignment.updating,
  updateSuccess: storeState.employeeClientAssignment.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
  getClientProjects,
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
)(EmployeeClientAssignmentUpdate);
