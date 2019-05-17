import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './next-of-kin.reducer';
import { INextOfKin } from 'app/shared/model/next-of-kin.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INextOfKinProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class NextOfKin extends React.Component<INextOfKinProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { nextOfKinList, match } = this.props;
    return (
      <div>
        <h2 id="next-of-kin-heading">
          <Translate contentKey="eciApp.nextOfKin.home.title">Next Of Kins</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="eciApp.nextOfKin.home.createLabel">Create new Next Of Kin</Translate>
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
                  <Translate contentKey="eciApp.nextOfKin.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.nextOfKin.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.nextOfKin.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.nextOfKin.homeNumber">Home Number</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.nextOfKin.mobileNumber">Mobile Number</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.nextOfKin.kinship">Kinship</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.nextOfKin.employee">Employee</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {nextOfKinList.map((nextOfKin, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${nextOfKin.id}`} color="link" size="sm">
                      {nextOfKin.id}
                    </Button>
                  </td>
                  <td>{nextOfKin.firstName}</td>
                  <td>{nextOfKin.lastName}</td>
                  <td>{nextOfKin.email}</td>
                  <td>{nextOfKin.homeNumber}</td>
                  <td>{nextOfKin.mobileNumber}</td>
                  <td>
                    <Translate contentKey={`eciApp.KinshipType.${nextOfKin.kinship}`} />
                  </td>
                  <td>{nextOfKin.employee ? <Link to={`employee/${nextOfKin.employee.id}`}>{nextOfKin.employee.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${nextOfKin.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${nextOfKin.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${nextOfKin.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ nextOfKin }: IRootState) => ({
  nextOfKinList: nextOfKin.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NextOfKin);
