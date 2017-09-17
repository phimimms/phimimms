import Paper from 'material-ui/Paper';
import React, { PropTypes } from 'react';

const style = {
    cursor: 'pointer',
    display: 'inline-block',
    height: '7em',
    textAlign: 'center',
    width: '7em'
};

const PaperLink = ({ children, onClick }) => {
    return (
        <Paper
            circle={true}
            onClick={onClick}
            style={style}
            zDepth={4}
            >
            {children}
        </Paper>
    );
};

PaperLink.propTypes = {
    children: PropTypes.array.isRequired,
    onClick: PropTypes.func
};

export default PaperLink;
