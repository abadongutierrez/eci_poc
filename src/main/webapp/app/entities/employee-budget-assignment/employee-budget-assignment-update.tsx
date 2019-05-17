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
import { IBudget } from 'app/shared/model/budget.model';
import { getEntities as getBudgets } from 'app/entities/budget/budget.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee-budget-assignment.reducer';
import { IEmployeeBudgetAssignment } from 'app/shared/model/employee-budget-assignment.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeBudgetAssignmentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEmployeeBudgetAssignmentUpdateState {
  isNew: boolean;
  employeeId: string;
  budgetId: string;
}

export class EmployeeBudgetAssignmentUpdate extends React.Component<
  IEmployeeBudgetAssignmentUpdateProps,
  IEmployeeBudgetAssignmentUpdateState
> {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: '0',
      budgetId: '0',
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
    this.props.getBudgets();
  }

  saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const { employeeBudgetAssignmentEntity } = this.props;
      const entity = {
        ...employeeBudgetAssignmentEntity,
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
    this.props.history.push('/entity/employee-budget-assignment');
  };

  render() {
    const { employeeBudgetAssignmentEntity, employees, budgets, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="eciApp.employeeBudgetAssignment.home.createOrEditLabel">
              <Translate contentKey="eciApp.employeeBudgetAssignment.home.createOrEditLabel">
                Create or edit a EmployeeBudgetAssignment
              </Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : employeeBudgetAssignmentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="employee-budget-assignment-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="employee-budget-assignment-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="usageLabel" for="employee-budget-assignment-usage">
                    <Translate contentKey="eciApp.employeeBudgetAssignment.usage">Usage</Translate>
                  </Label>
                  <AvField
                    id="employee-budget-assignment-usage"
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
                  <Label id="startDateLabel" for="employee-budget-assignment-startDate">
                    <Translate contentKey="eciApp.employeeBudgetAssignment.startDate">Start Date</Translate>
                  </Label>
                  <AvInput
                    id="employee-budget-assignment-startDate"
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.employeeBudgetAssignmentEntity.startDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="employee-budget-assignment-endDate">
                    <Translate contentKey="eciApp.employeeBudgetAssignment.endDate">End Date</Translate>
                  </Label>
                  <AvInput
                    id="employee-budget-assignment-endDate"
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.employeeBudgetAssignmentEntity.endDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="employee-budget-assignment-employee">
                    <Translate contentKey="eciApp.employeeBudgetAssignment.employee">Employee</Translate>
                  </Label>
                  <AvInput id="employee-budget-assignment-employee" type="select" className="form-control" name="employee.id">
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
                  <Label for="employee-budget-assignment-budget">
                    <Translate contentKey="eciApp.employeeBudgetAssignment.budget">Budget</Translate>
                  </Label>
                  <AvInput id="employee-budget-assignment-budget" type="select" className="form-control" name="budget.id">
                    <option value="" key="0" />
                    {budgets
                      ? budgets.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/employee-budget-assignment" replace color="info">
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
  budgets: storeState.budget.entities,
  employeeBudgetAssignmentEntity: storeState.employeeBudgetAssignment.entity,
  loading: storeState.employeeBudgetAssignment.loading,
  updating: storeState.employeeBudgetAssignment.updating,
  updateSuccess: storeState.employeeBudgetAssignment.updateSuccess
});

const mapDispatchToProps = {
  getEmployees,
  getBudgets,
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
)(EmployeeBudgetAssignmentUpdate);
