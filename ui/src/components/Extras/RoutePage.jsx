import React from 'react';
import { createUseStyles } from 'react-jss';

import InternalRouter from 'components/Utils/InternalRouter';

const useStyles = createUseStyles({
  pages: {
    width: '90vw',
    marginTop: 25,
    marginLeft: '5vw',
  },
});

export default function RoutePage() {
  const classes = useStyles();

  return (
    <div className={classes.pages}>
      <InternalRouter />
    </div>
  );
}
