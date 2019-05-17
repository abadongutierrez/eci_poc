import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './key-date.reducer';
import { IKeyDate } from 'app/shared/model/key-date.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IKeyDateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class KeyDateDetail extends React.Component<IKeyDateDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { keyDateEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="eciApp.keyDate.detail.title">KeyDate</Translate> [<b>{keyDateEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="startDate">
                <Translate contentKey="eciApp.keyDate.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={keyDateEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">
                <Translate contentKey="eciApp.keyDate.endDate">End Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={keyDateEntity.endDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="type">
                <Translate contentKey="eciApp.keyDate.type">Type</Translate>
              </span>
            </dt>
            <dd>{keyDateEntity.type}</dd>
            <dt>
              <Translate contentKey="eciApp.keyDate.employee">Employee</Translate>
            </dt>
            <dd>{keyDateEntity.employee ? keyDateEntity.employee.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/key-date" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/key-date/${keyDateEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ keyDate }: IRootState) => ({
  keyDateEntity: keyDate.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyDateDetail);
