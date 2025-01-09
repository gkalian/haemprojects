import React from 'react';
import { styled } from '@mui/material/styles';

const GridContainer = styled('div')({
  gap: '0.5rem',
  flex: 'none',
  position: 'relative',
  width: '200vw',
  height: '200vh',
  display: 'grid',
  gridTemplateRows: 'repeat(8, 1fr)',
  gridTemplateColumns: '100%',
  transform: 'rotate(-15deg) translateY(13%) translateX(10%)',
  transformOrigin: 'center center',
  backgroundColor: '#000000',
  '& > *': {
    backgroundColor: '#000000'
  }
});

const Row = styled('div')({
  display: 'grid',
  gap: '0.5rem',
  gridTemplateColumns: 'repeat(10, 1fr)',
  willChange: 'transform, filter'
});

const GridItem = styled('div')({
  position: 'relative'
});

const GridItemInner = styled('div')({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: '10px'
});

const GridItemImage = styled('div')({
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: '50% 50%',
  position: 'absolute',
  top: 0,
  left: 0
});

const GalleryRow = ({ images, rowIndex }) => (
  <Row key={rowIndex} className="row">
    {images.map((image, imageIndex) => (
      <GridItem key={`${rowIndex}-${imageIndex}`} className="row_item">
        <GridItemInner className="row_item-inner">
          <GridItemImage
            className="row_item-img"
            style={{ backgroundImage: `url(${image})` }}
          />
        </GridItemInner>
      </GridItem>
    ))}
  </Row>
);

const GalleryGrid = ({ galleryData, gridRef }) => {
  const imageRows = Object.values(galleryData.galleryImages).map(item => item.images);

  return (
    <GridContainer ref={gridRef} className="grid">
      {imageRows.map((rowImages, rowIndex) => (
        <GalleryRow key={rowIndex} images={rowImages} rowIndex={rowIndex} />
      ))}
    </GridContainer>
  );
};

export default GalleryGrid;
