import './NewBookForm/NewBookForm.scss';
import Button from '../../../common/Button';
import Checkbox from '../../../common/Checkbox';
import TextField from '../../../common/TextField';
import React, { PropTypes } from 'react';

const defaultState = {
    authorName: '',
    isAuthorValid: false,
    isKindle: false,
    isLengthValid: false,
    isTitleValid: false,
    length: '',
    title: ''
};

class NewBookForm extends React.Component {
    /**
     * Instantiates the component.
     * @param {Object}  props   The initial values of instance properties
     */
    constructor(props) {
        super(props);

        this.state = defaultState;

        /* Contextually binds the DOM event callbacks to the component */
        this._onAuthorChange = this._onAuthorChange.bind(this);
        this._onKindleCheck = this._onKindleCheck.bind(this);
        this._onLengthChange = this._onLengthChange.bind(this);
        this._onSaveButtonClick = this._onSaveButtonClick.bind(this);
        this._onTitleChange = this._onTitleChange.bind(this);
    }

    /**
     * Updates the author's name of the new book.
     * @param   {Object}    evt The event object
     * @param   {String}    val The value of the input field
     * @private
     */
    _onAuthorChange(evt, val) {
        this.setState({
            authorName: val,
            isAuthorValid: val.length > 0
        });
    }

    /**
     * Updates the format of the new book.
     * @param   {Object}    evt         The event object
     * @param   {Boolean}   isChecked   The value of the checkbox
     * @private
     */
    _onKindleCheck(evt, isChecked) {
        this.setState({
            isKindle: isChecked
        });
    }

    /**
     * Updates the length of the new book.
     * @param   {Object}    evt The event object
     * @param   {String}    val The value of the input field
     * @private
     */
    _onLengthChange(evt, val) {
        const num = +val;
        if (!Number.isInteger(num)) {
            return;
        }

        this.setState({
            isLengthValid: num > 0,
            length: '' + val
        });
    }

    /**
     * Saves the new book and resets the state of the component.
     * @private
     */
    _onSaveButtonClick() {
        const { authorName, isKindle, length, title } = this.state;

        this.props.saveBook({ authorName, isKindle, length, title });

        this.setState(defaultState);
    }

    /**
     * Updates the title of the new book.
     * @param   {Object}    evt The event object
     * @param   {String}    val The value of the input field
     * @private
     */
    _onTitleChange(evt, val) {
        this.setState({
            isTitleValid: val.length > 0,
            title: val
        });
    }

    /**
     * Generates the HTML representation of the component.
     * @return {Element}
     */
    render() {
        const { authorName, isAuthorValid, isKindle, isLengthValid, isTitleValid, length, title } = this.state;

        return (
            <div className="NewBookForm">
                <h2 className="NewBookForm__header user-select--none">Add New Book</h2>
                <div className="NewBookForm__form-container">
                    <TextField
                        label="Title"
                        name="NewBook__Title"
                        onChange={this._onTitleChange}
                        value={title}
                        />
                    <TextField
                        label="Author"
                        name="NewBook__Author"
                        onChange={this._onAuthorChange}
                        value={authorName}
                        />
                    <TextField
                        label="Length"
                        name="NewBook__Length"
                        onChange={this._onLengthChange}
                        value={length}
                        />
                    <Checkbox
                        isChecked={isKindle}
                        label="On Kindle"
                        onCheck={this._onKindleCheck}
                        />
                    <Button
                        isDisabled={!(isAuthorValid && isLengthValid && isTitleValid)}
                        label="Save"
                        onClick={this._onSaveButtonClick}
                        />
                </div>
            </div>
        );
    }
}

NewBookForm.propTypes = {
    saveBook: PropTypes.func.isRequired
};

export default NewBookForm;
