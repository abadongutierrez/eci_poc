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
import { getEntity, updateEntity, createEntity, reset } from './key-date.reducer';
import { IKeyDate } from 'app/shared/model/key-date.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IKeyDateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IKeyDateUpdateState {
  isNew: boolean;
  employeeId: string;
}

export class KeyDateUpdate extends React.Component<IKeyDateUpdateProps, IKeyDateUpdateState> {
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
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const { keyDateEntity } = this.props;
      const entity = {
        ...keyDateEntity,
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
    this.props.history.push('/entity/key-date');
  };

  render() {
    const { keyDateEntity, employees, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="eciApp.keyDate.home.createOrEditLabel">
              <Translate contentKey="eciApp.keyDate.home.createOrEditLabel">Create or edit a KeyDate</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : keyDateEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="key-date-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="key-date-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="startDateLabel" for="key-date-startDate">
                    <Translate contentKey="eciApp.keyDate.startDate">Start Date</Translate>
                  </Label>
                  <AvInput
                    id="key-date-startDate"
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.keyDateEntity.startDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="key-date-endDate">
                    <Translate contentKey="eciApp.keyDate.endDate">End Date</Translate>
                  </Label>
                  <AvInput
                    id="key-date-endDate"
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.keyDateEntity.endDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="key-date-type">
                    <Translate contentKey="eciApp.keyDate.type">Type</Translate>
                  </Label>
                  <AvInput
                    id="key-date-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && keyDateEntity.type) || 'ACADEMY'}
                  >
                    <option value="ACADEMY">
                      <Translate contentKey="eciApp.KeyDateType.ACADEMY" />
                    </option>
                    <option value="ACADEMY_PLUS">
                      <Translate contentKey="eciApp.KeyDateType.ACADEMY_PLUS" />
                    </option>
                    <option value="EMPLOYEE">
                      <Translate contentKey="eciApp.KeyDateType.EMPLOYEE" />
                    </option>
                    <option value="TALENT_INCUBATOR">
                      <Translate contentKey="eciApp.KeyDateType.TALENT_INCUBATOR" />
                    </option>
                    <option value="NO_CLIENT_POOL">
                      <Translate contentKey="eciApp.KeyDateType.NO_CLIENT_POOL" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="key-date-employee">
                    <Translate contentKey="eciApp.keyDate.employee">Employee</Translate>
                  </Label>
                  <AvInput id="key-date-employee" type="select" className="form-control" name="employee.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/key-date" replace color="info">
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
  keyDateEntity: storeState.keyDate.entity,
  loading: storeState.keyDate.loading,
  updating: storeState.keyDate.updating,
  updateSuccess: storeState.keyDate.updateSuccess
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
)(KeyDateUpdate);
