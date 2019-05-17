import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './client-project.reducer';
import { IClientProject } from 'app/shared/model/client-project.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClientProjectProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ClientProject extends React.Component<IClientProjectProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { clientProjectList, match } = this.props;
    return (
      <div>
        <h2 id="client-project-heading">
          <Translate contentKey="eciApp.clientProject.home.title">Client Projects</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="eciApp.clientProject.home.createLabel">Create new Client Project</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.clientProject.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.clientProject.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.clientProject.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.clientProject.client">Client</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clientProjectList.map((clientProject, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${clientProject.id}`} color="link" size="sm">
                      {clientProject.id}
                    </Button>
                  </td>
                  <td>{clientProject.name}</td>
                  <td>{clientProject.code}</td>
                  <td>{clientProject.description}</td>
                  <td>{clientProject.client ? <Link to={`client/${clientProject.client.id}`}>{clientProject.client.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${clientProject.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${clientProject.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${clientProject.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ clientProject }: IRootState) => ({
  clientProjectList: clientProject.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientProject);
