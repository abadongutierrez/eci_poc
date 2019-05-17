import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/employee">
      <Translate contentKey="global.menu.entities.employee" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/contact-info">
      <Translate contentKey="global.menu.entities.contactInfo" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/next-of-kin">
      <Translate contentKey="global.menu.entities.nextOfKin" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/client">
      <Translate contentKey="global.menu.entities.client" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/client-project">
      <Translate contentKey="global.menu.entities.clientProject" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/employee-client-assignment">
      <Translate contentKey="global.menu.entities.employeeClientAssignment" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/budget">
      <Translate contentKey="global.menu.entities.budget" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/employee-budget-assignment">
      <Translate contentKey="global.menu.entities.employeeBudgetAssignment" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/key-date">
      <Translate contentKey="global.menu.entities.keyDate" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/skill">
      <Translate contentKey="global.menu.entities.skill" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/employee-skill">
      <Translate contentKey="global.menu.entities.employeeSkill" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
