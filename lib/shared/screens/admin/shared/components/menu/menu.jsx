import cx from 'classnames';
import Component from 'components/component';
import Scrollable from 'components/scrollable';
import Velocity from 'velocity-animate';
import React, {PropTypes} from 'react';

import styles from './menu.less';
import Button from './button';
import ContentTypes from './content-types';
import User from './user';

export default class Menu extends Component {
  static fragments = ContentTypes.fragments;

  static propTypes = {
    active: PropTypes.string,
    opened: PropTypes.bool,
    menuData: PropTypes.array.isRequired,
    schemas: PropTypes.array.isRequired,
    children: PropTypes.node,
    onOpen: PropTypes.func.isRequired
  };

  static defaultProps = {
    opened: false
  };

  getInitState () {
    return {
      opened: this.props.opened
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.opened !== this.props.opened) {
      const config = {
        duration: 800,
        display: null,
        easing: 'easeOutExpo'
      };
      if (nextProps.opened) {
        Velocity(this.refs.menu, {translateX: '-100%'}, config);
        Velocity(this.refs.list, {translateX: '0%'}, config);
      } else {
        Velocity(this.refs.menu, {translateX: '0%'}, config);
        Velocity(this.refs.list, {translateX: '100%'}, config);
      }
    }
  }

  render () {
    const {menuData, schemas} = this.props;
    return (
      <div className={cx(styles.root, this.state.opened && styles.opened)}>
        <div className={styles.menu} ref='menu'>
          <Scrollable className={styles.menuContent}>
            {menuData.map(this.renderEntry, this)}
            <ContentTypes schemas={schemas} key='content-types' />
          </Scrollable>
        </div>
        <div className={styles.list} ref='list'>
          {this.props.children}
        </div>
        <User user={{name: 'Bruno Mota', email: 'bruno12mota@gmail.com'}} />
      </div>
    );
  }

  renderEntry (entry, key) {
    let result;
    if (entry === 'sep') {
      result = <div className={styles.sepperator}/>;
    } else {
      result = (
        <Button {...entry} active={this.props.active === entry.label} key={key} onActiveClick={this.props.onOpen} />
      );
    }
    return result;
  }
}