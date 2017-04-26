import { grey900 } from 'material-ui/styles/colors';
import DisplayIcon from 'material-ui/svg-icons/notification/ondemand-video';
import IconButton from 'material-ui/IconButton';
import PaperLink from '../../common/PaperLink';
import { Link } from 'react-router';
import React, { PropTypes } from 'react';

const DisplayPageLink = ({ className }) => {
    return (
        <div className={`DisplayPageLink ${className}`}>
            <Link to="display" activeClassName="active">
                <PaperLink>
                    <IconButton>
                        <DisplayIcon color={grey900} />
                    </IconButton>
                    <div className="user-select--none">Display Page</div>
                </PaperLink>
            </Link>
        </div>
    );
};

DisplayPageLink.propTypes = {
    className: PropTypes.string.isRequired
};

export default DisplayPageLink;
