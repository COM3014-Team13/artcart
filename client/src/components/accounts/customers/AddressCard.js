import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const AddressCard = ({ address }) => {
  const { name, street, postcode, city, country, phone } = address;
  return (
    <Card>
      <CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography>{name}</Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography>{street}</Typography>
              <Typography>{postcode}</Typography>
              <Typography>{city}</Typography>
              <Typography>{country}</Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText>{phone}</ListItemText>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

AddressCard.propTypes = {
  address: PropTypes.object.isRequired
};

export default AddressCard;
