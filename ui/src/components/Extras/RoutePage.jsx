import React from 'react';
import InternalRouter from '../Utils/InternalRouter';
import { createUseStyles } from 'react-jss';

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
