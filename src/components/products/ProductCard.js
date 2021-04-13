import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core';

const ProductCard = ({ product }) => {
  const { title, price, image_url, desc } = product;

  return (
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
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            £{price.value}
            <br />
            {desc.info}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
