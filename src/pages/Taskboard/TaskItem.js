import { infoColor, warningColor } from '../../styleVariables';

import React from 'react';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  taskboard: {
    overflowX: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 56px)'
    },
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 64px)'
    }
  },
  wrapper: {
    width: '280px',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1) / 2,
    paddingLeft: theme.spacing(1) / 2,
    boxSizing: 'border-box',
    display: 'inline-block',
    verticalAlign: 'top',
    height: '100%'
  },
  list: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    whiteSpace: 'normal',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: theme.shape.borderRadius
  },
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    letterSpacing: '0.02rem',
    padding: theme.spacing(1),
    margin: 0,
    fontWeight: 500,
    textTransform: 'uppercase',
    fontSize: '12px'
  },
  task: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[1],
    color: theme.palette.text.primary,
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0
    },
    '&:hover': {
      cursor: 'grab'
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      border: '4px solid transparent',
      top: 0,
      borderTopWidth: '12px',
      borderBottomColor: 'transparent',
      right: '6px'
    }
  },
  success: {
    '&::after': {
      borderTopColor: theme.palette.secondary.main,
      borderRightColor: theme.palette.secondary.main,
      borderLeftColor: theme.palette.secondary.main
    }
  },
  info: {
    '&::after': {
      borderTopColor: infoColor,
      borderRightColor: infoColor,
      borderLeftColor: infoColor
    }
  },
  warning: {
    '&::after': {
      borderTopColor: warningColor,
      borderRightColor: warningColor,
      borderLeftColor: warningColor
    }
  },
  danger: {
    '&::after': {
      borderTopColor: theme.palette.secondary.main,
      borderRightColor: theme.palette.secondary.main,
      borderLeftColor: theme.palette.secondary.main
    }
  },
  cards: {
    position: 'relative',
    padding: `0 ${theme.spacing(1)}px ${theme.spacing(1)}px`,
    boxSizing: 'border-box',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto'
  }
}));

const TaskItem = ({ task, isDragging, provided }) => {
  const classes = useStyles();
  return (
    <div
      className={classNames(
        classes.task,
        task.color ? classes[task.color] : ''
      )}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Typography variant="body1" gutterBottom>
        {task.taskName}
      </Typography>
      <Typography variant="caption">{task.taskDescription}</Typography>
    </div>
  );
};

export default TaskItem;
