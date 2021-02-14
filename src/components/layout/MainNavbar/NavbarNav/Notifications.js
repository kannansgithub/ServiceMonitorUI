import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Modal, Button, Card } from 'react-bootstrap';
import noDataImg from '../../../../assets/no-data.jpg';
const Notifications = () => {
  const [connection, setConnection] = useState(null);
  const [notification, setNotification] = useState([]);
  const latestNotification = useRef(null);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  latestNotification.current = notification;
  
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:10010/notifications')
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
  }, []);
  const toggleNotifications=()=> {
    setVisible(!visible)
  }
  useEffect(() => {
    if (connection) {
      connection.start()
        .then(result => {
          console.log('Connected!');
          connection.on('GetNotify', message => {
            const updatedNotification = [...latestNotification.current];
            console.log(updatedNotification.indexOf(message));
            if (updatedNotification.indexOf(message) < 0) {
              updatedNotification.push(message);
              setNotification(updatedNotification);
              console.log(notification);
            }
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection]);
  const handleClose = () => setShow(false);
  const handleShow = () => { setShow(true); setVisible(false); }
  return (
    <React.Fragment>
         <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">notification_important</i>
            <Badge pill theme="danger">
            {notification ? notification.length:0}
            </Badge>
          </div>
        </NavLink>
        <Collapse
          open={visible}
          className="dropdown-menu dropdown-menu-small"
        >
        {notification && notification.slice(0, 5).map((notify, key) => {
          return (
            <DropdownItem key={key}>
              <div className="notification__icon-wrapper">
                <div className="notification__icon">
                  <i className="material-icons">
                    {notify.split('|')[0]}
                  </i>
                </div>
              </div>
              <div className="notification__content">
                <span className="notification__category">{notify.split('|')[1]}</span>
                <p>Error on connecting to server/service ( <b>{notify.split('|')[2]}</b> )</p>
              </div>
            </DropdownItem>);
        })}
          {notification && notification.length>0 ? (
            <DropdownItem className="notification__all text-center" onClick={handleShow}>
              View all Notifications
            </DropdownItem>) : (<img style={{height:'250px'}} src={noDataImg} alt="no notifications"/>)}
        </Collapse>
      </NavItem>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>All Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {notification && notification.map((notify, key) => {
              return (<Card text="danger" border="danger" style={{ margin: '0.5rem 0' }}>
                <Card.Header style={{backgroundColor: '#ec8383'}}>{notify.split('|')[1]}</Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>
                      {notify.split('|')[2]}
                    </p>
                    <footer className="blockquote-footer">
                      Logged On <cite title="Source Title">{notify.split('|')[3]}</cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card>
                );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Notifications;