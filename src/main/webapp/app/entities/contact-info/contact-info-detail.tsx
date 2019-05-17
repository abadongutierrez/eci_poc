import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './contact-info.reducer';
import { IContactInfo } from 'app/shared/model/contact-info.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContactInfoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ContactInfoDetail extends React.Component<IContactInfoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { contactInfoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="eciApp.contactInfo.detail.title">ContactInfo</Translate> [<b>{contactInfoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="email">
                <Translate contentKey="eciApp.contactInfo.email">Email</Translate>
              </span>
            </dt>
            <dd>{contactInfoEntity.email}</dd>
            <dt>
              <span id="homeNumber">
                <Translate contentKey="eciApp.contactInfo.homeNumber">Home Number</Translate>
              </span>
            </dt>
            <dd>{contactInfoEntity.homeNumber}</dd>
            <dt>
              <span id="mobileNumber">
                <Translate contentKey="eciApp.contactInfo.mobileNumber">Mobile Number</Translate>
              </span>
            </dt>
            <dd>{contactInfoEntity.mobileNumber}</dd>
          </dl>
          <Button tag={Link} to="/entity/contact-info" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/contact-info/${contactInfoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ contactInfo }: IRootState) => ({
  contactInfoEntity: contactInfo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactInfoDetail);
