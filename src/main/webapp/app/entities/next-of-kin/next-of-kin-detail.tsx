import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './next-of-kin.reducer';
import { INextOfKin } from 'app/shared/model/next-of-kin.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INextOfKinDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NextOfKinDetail extends React.Component<INextOfKinDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { nextOfKinEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="eciApp.nextOfKin.detail.title">NextOfKin</Translate> [<b>{nextOfKinEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="firstName">
                <Translate contentKey="eciApp.nextOfKin.firstName">First Name</Translate>
              </span>
            </dt>
            <dd>{nextOfKinEntity.firstName}</dd>
            <dt>
              <span id="lastName">
                <Translate contentKey="eciApp.nextOfKin.lastName">Last Name</Translate>
              </span>
            </dt>
            <dd>{nextOfKinEntity.lastName}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="eciApp.nextOfKin.email">Email</Translate>
              </span>
            </dt>
            <dd>{nextOfKinEntity.email}</dd>
            <dt>
              <span id="homeNumber">
                <Translate contentKey="eciApp.nextOfKin.homeNumber">Home Number</Translate>
              </span>
            </dt>
            <dd>{nextOfKinEntity.homeNumber}</dd>
            <dt>
              <span id="mobileNumber">
                <Translate contentKey="eciApp.nextOfKin.mobileNumber">Mobile Number</Translate>
              </span>
            </dt>
            <dd>{nextOfKinEntity.mobileNumber}</dd>
            <dt>
              <span id="kinship">
                <Translate contentKey="eciApp.nextOfKin.kinship">Kinship</Translate>
              </span>
            </dt>
            <dd>{nextOfKinEntity.kinship}</dd>
            <dt>
              <Translate contentKey="eciApp.nextOfKin.employee">Employee</Translate>
            </dt>
            <dd>{nextOfKinEntity.employee ? nextOfKinEntity.employee.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/next-of-kin" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/next-of-kin/${nextOfKinEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ nextOfKin }: IRootState) => ({
  nextOfKinEntity: nextOfKin.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NextOfKinDetail);
