import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core';

const ProductCard = ({ product }) => {
  const { id, title, price, image_url, desc } = product;

  const link = 'products/' + id;

  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <Card>
        <CardActionArea>
          <CardMedia
            component='img'
            alt={title}
            height='140'
            image={image_url}
            title={title}
          />
          <CardContent>
            <Typography variant='h5' component='h2'>
              {title}
            </Typography>
            <Typography gutterBottom component='h2'>
              {desc.artist}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              £{price.value}
              <br />
              {desc.info}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ProductCard;
