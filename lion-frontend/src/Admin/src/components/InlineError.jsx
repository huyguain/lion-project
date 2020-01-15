import React from 'react';
import PropTypes from 'prop-types';
const InlineError = ({ text }) => (
    <div className="text-error">
        {text}
    </div>
)
InlineError.propType = {
    text: PropTypes.string.isRequired
};
export default InlineError;