import React from 'react';

class FenForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        if (this.validateFen(this.state.value))
            this.props.onFenSubmit(this.state.value);
        else
            alert('Fen is not valid');

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    FEN: <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Display chess board" />
            </form>
        );
    }

    validateFen(fen)
    {
        if (/^\s*([rnbqkpRNBQKP1-8]+\/){7}([rnbqkpRNBQKP1-8]+)\s[bw]\s(-|K?Q?k?q?)\s(-|[a-h][36])/.test(fen))
        {
            return true;
        }
    }
}

export default FenForm;