import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './client-project.reducer';
import { IClientProject } from 'app/shared/model/client-project.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClientProjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ClientProjectDetail extends React.Component<IClientProjectDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { clientProjectEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="eciApp.clientProject.detail.title">ClientProject</Translate> [<b>{clientProjectEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="eciApp.clientProject.name">Name</Translate>
              </span>
            </dt>
            <dd>{clientProjectEntity.name}</dd>
            <dt>
              <span id="code">
                <Translate contentKey="eciApp.clientProject.code">Code</Translate>
              </span>
            </dt>
            <dd>{clientProjectEntity.code}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="eciApp.clientProject.description">Description</Translate>
              </span>
            </dt>
            <dd>{clientProjectEntity.description}</dd>
            <dt>
              <Translate contentKey="eciApp.clientProject.client">Client</Translate>
            </dt>
            <dd>{clientProjectEntity.client ? clientProjectEntity.client.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/client-project" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/client-project/${clientProjectEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ clientProject }: IRootState) => ({
  clientProjectEntity: clientProject.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientProjectDetail);
