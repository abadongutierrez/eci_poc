import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './employee-skill.reducer';
import { IEmployeeSkill } from 'app/shared/model/employee-skill.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeSkillProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class EmployeeSkill extends React.Component<IEmployeeSkillProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { employeeSkillList, match } = this.props;
    return (
      <div>
        <h2 id="employee-skill-heading">
          <Translate contentKey="eciApp.employeeSkill.home.title">Employee Skills</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="eciApp.employeeSkill.home.createLabel">Create new Employee Skill</Translate>
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
                  <Translate contentKey="eciApp.employeeSkill.years">Years</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.employeeSkill.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.employeeSkill.skill">Skill</Translate>
                </th>
                <th>
                  <Translate contentKey="eciApp.employeeSkill.employee">Employee</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employeeSkillList.map((employeeSkill, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employeeSkill.id}`} color="link" size="sm">
                      {employeeSkill.id}
                    </Button>
                  </td>
                  <td>{employeeSkill.years}</td>
                  <td>
                    <TextFormat type="date" value={employeeSkill.startDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{employeeSkill.skill ? <Link to={`skill/${employeeSkill.skill.id}`}>{employeeSkill.skill.name}</Link> : ''}</td>
                  <td>
                    {employeeSkill.employee ? <Link to={`employee/${employeeSkill.employee.id}`}>{employeeSkill.employee.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employeeSkill.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeSkill.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employeeSkill.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ employeeSkill }: IRootState) => ({
  employeeSkillList: employeeSkill.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeSkill);
