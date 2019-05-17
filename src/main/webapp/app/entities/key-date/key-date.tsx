import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './key-date.reducer';
import { IKeyDate } from 'app/shared/model/key-date.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IKeyDateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class KeyDate extends React.Component<IKeyDateProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { keyDateList, match } = this.props;
    return (
      <div>
        <h2 id="key-date-heading">
          <Translate contentKey="eciApp.keyDate.home.title">Key Dates</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="eciApp.keyDate.home.createLabel">Create new Key Date</Translate>
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
                  <Translate contentKey="eciApp.keyDate.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.keyDate.endDate">End Date</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.keyDate.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.keyDate.employee">Employee</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {keyDateList.map((keyDate, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${keyDate.id}`} color="link" size="sm">
                      {keyDate.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={keyDate.startDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={keyDate.endDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <Translate contentKey={`eciApp.KeyDateType.${keyDate.type}`} />
                  </td>
                  <td>{keyDate.employee ? <Link to={`employee/${keyDate.employee.id}`}>{keyDate.employee.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${keyDate.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${keyDate.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${keyDate.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ keyDate }: IRootState) => ({
  keyDateList: keyDate.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyDate);
