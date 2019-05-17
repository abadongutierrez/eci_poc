import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee-skill.reducer';
import { IEmployeeSkill } from 'app/shared/model/employee-skill.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeSkillDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EmployeeSkillDetail extends React.Component<IEmployeeSkillDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { employeeSkillEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="eciApp.employeeSkill.detail.title">EmployeeSkill</Translate> [<b>{employeeSkillEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="years">
                <Translate contentKey="eciApp.employeeSkill.years">Years</Translate>
              </span>
            </dt>
            <dd>{employeeSkillEntity.years}</dd>
            <dt>
              <span id="startDate">
                <Translate contentKey="eciApp.employeeSkill.startDate">Start Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={employeeSkillEntity.startDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="eciApp.employeeSkill.skill">Skill</Translate>
            </dt>
            <dd>{employeeSkillEntity.skill ? employeeSkillEntity.skill.name : ''}</dd>
            <dt>
              <Translate contentKey="eciApp.employeeSkill.employee">Employee</Translate>
            </dt>
            <dd>{employeeSkillEntity.employee ? employeeSkillEntity.employee.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/employee-skill" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/employee-skill/${employeeSkillEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ employeeSkill }: IRootState) => ({
  employeeSkillEntity: employeeSkill.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeSkillDetail);
