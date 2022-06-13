import { Fragment, useState, useMemo } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from './logo.svg';
import './App.css';
import schema from './schema.json';
import uischema from './uischema.json';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto !important',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
});

const initialData = {
  "movies": [
    {
      "id": 1,
      "name": "Intro",
      "sourcefile": "/movies/intro.mpg",
      "questionPop": 60,
      "questions": [
        {
          "question": "Check the Arm",
          "gotoID": 2
        },
        {
          "question": "Check the Leg",
          "gotoID": 3
        }
      ]
    },
    {
      "id": 2,
      "name": "Check Arm",
      "sourcefile": "/movies/arm.mpg",
      "questionPop": 30,
      "questions": [
        {
          "question": "Finish examination",
          "gotoID": 4
        }
      ]
    },
    {
      "id": 3,
      "name": "Check Leg",
      "sourcefile": "/movies/leg.mpg",
      "questionPop": 45,
      "questions": [
        {
          "question": "Leg is fine, check arm",
          "gotoID": 2
        },
        {
          "question": "Finish examination",
          "gotoID": 5
        }
      ]
    },
    {
      "id": 4,
      "name": "End 1",
      "sourcefile": "/movies/end1.mpg"
    },
    {
      "id": 5,
      "name": "End 2",
      "sourcefile": "/movies/end2.mpg"
    }
  ]
};

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
];

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState<any>(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const clearData = () => {
    setData({});
  };
  return (
    <Fragment>
      <div className='App'>
        <header className='App-header'>
          {/* <img src={logo} className='App-logo' alt='logo' /> */}
          <h1 className='App-title'>Sim VR Configuration tool</h1>
        </header>
      </div>

      <Grid
        container
        justifyContent={'center'}
        spacing={1}
        className={classes.container}
      >
        <Grid item sm={4}>
          <Typography variant={'h4'} className={classes.title}>
            Bound data
          </Typography>
          <div className={classes.dataContent}>
            <pre id='boundData'>{stringifiedData}</pre>
          </div>
          <Button
            className={classes.resetButton}
            onClick={clearData}
            color='primary'
            variant='contained'
          >
            Clear data
          </Button>
        </Grid>
        <Grid item sm={8}>
          <Typography variant={'h4'} className={classes.title}>
            Rendered form
          </Typography>
          <div className={classes.demoform}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={renderers}
              cells={materialCells}
              onChange={({ errors, data }) => setData(data)}
            />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
