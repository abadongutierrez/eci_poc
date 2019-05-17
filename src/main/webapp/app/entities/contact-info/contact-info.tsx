import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './contact-info.reducer';
import { IContactInfo } from 'app/shared/model/contact-info.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContactInfoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ContactInfo extends React.Component<IContactInfoProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { contactInfoList, match } = this.props;
    return (
      <div>
        <h2 id="contact-info-heading">
          <Translate contentKey="eciApp.contactInfo.home.title">Contact Infos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="eciApp.contactInfo.home.createLabel">Create new Contact Info</Translate>
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
                  <Translate contentKey="eciApp.contactInfo.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.contactInfo.homeNumber">Home Number</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.contactInfo.mobileNumber">Mobile Number</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {contactInfoList.map((contactInfo, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${contactInfo.id}`} color="link" size="sm">
                      {contactInfo.id}
                    </Button>
                  </td>
                  <td>{contactInfo.email}</td>
                  <td>{contactInfo.homeNumber}</td>
                  <td>{contactInfo.mobileNumber}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${contactInfo.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${contactInfo.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${contactInfo.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ contactInfo }: IRootState) => ({
  contactInfoList: contactInfo.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactInfo);
