import React, { useContext, useState } from 'react';
import ProductContext from '../../../context/product/productContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core';

const EditProductForm = () => {
  const productContext = useContext(ProductContext);
  const { formProduct } = productContext;

  const [product, setProduct] = useState({
    title: formProduct.title,
    image_url: formProduct.image_url,
    artist: formProduct.desc.artist,
    type: formProduct.desc.type,
    info: formProduct.desc.info,
    date: formProduct.desc.date,
    price: formProduct.price.value
  });

  const { title, image_url, artist, type, info, date, price } = product;

  const onChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(product);
  };
  return (
    <Box className='form-box' margin='auto' marginTop='10%'>
      <Card raised>
        <CardContent>
          <Typography variant='h4' align='center'>
            Edit Product Listing
          </Typography>
          <br />
          <form onSubmit={onSubmit} style={{ textAlign: 'center' }}>
            <TextField
              label='Title'
              type='text'
              name='title'
              value={title}
              onChange={onChange}
              required
            />
            <br />
            <br />
            <TextField
              label='Artist'
              type='text'
              name='artist'
              value={artist}
              onChange={onChange}
              required
            />
            <br />
            <br />
            <TextField
              label='Thumbnail'
              type='text'
              name='image_url'
              value={image_url}
              onChange={onChange}
              helperText='Paste painting image link.'
              required
            />
            <br />
            <br />
            <TextField
              label='Painting Type'
              type='text'
              name='type'
              value={type}
              onChange={onChange}
              required
            />
            <br />
            <br />
            <TextField
              label='Description'
              type='text'
              name='info'
              value={info}
              onChange={onChange}
              required
            />
            <br />
            <br />
            <TextField
              style={{ width: '199px' }}
              label='Creation Date'
              name='date'
              type='date'
              value={date}
              InputLabelProps={{
                shrink: true
              }}
              onChange={onChange}
              required
            />
            <br />
            <br />
            <TextField
              label='Price'
              style={{ width: '199px' }}
              type='number'
              name='price'
              value={price}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>£</InputAdornment>
                )
              }}
              required
            />
            <br />
            <br />
            <Button type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProductForm;
