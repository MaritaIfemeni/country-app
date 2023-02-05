import React from 'react';
import Button from '@mui/material/Button';

function PageNotFound() {
  return (
    <div>
      <h1>404 Page not found</h1>
      <Button variant="contained" color="primary" href="/homepage">
        Go back to homepage
      </Button>
    </div>
  )
}

export default PageNotFound;