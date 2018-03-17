import React from 'react';

class Square extends React.Component {
    constructor(props)
    {
        super(props);

        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);

        this.state = {
            isHovered: false,
            moveAllowedFillOnHover: false
        };
    }

    hoverOn(event) {
        if (event.target.innerHTML !== '')
            this.setState({isHovered: true});
        else if (this.props.moveAllowedToThisPosition)
            this.setState({moveAllowedFillOnHover: true})
    }

    hoverOff(event) {
        this.setState({
            isHovered: false,
            moveAllowedFillOnHover: false
        });
    }

    render() {
        let elementClassNames = this.props.filledSquare ? 'square-filled' : 'square-white';  
        elementClassNames += this.state.isHovered || this.props.selectedPosition ? ' square square-hover' : ' square';
        
        if (this.state.moveAllowedFillOnHover)
            elementClassNames += ' square-fill'; 

        return (
            <button className={elementClassNames} onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} onClick={() => this.props.onClick()} dangerouslySetInnerHTML={{__html: this.props.value}}>
            </button>
        );
    }
}
    
class Board extends React.Component {
    handleClick(i) {
        if (this.props.squares[i] !== '')
            this.props.handleSelectedPosition(i);
        else if (this.props.squares[i] === '' && this.props.selectedPosition > -1)
            this.props.handleMove(i, this.props.selectedPosition)
    }

    canMoveToThisPosition(i)
    {
        return (this.props.squares[i] === '' && this.props.selectedPosition > -1);
    }

    renderSquare(i, filledSquare) {
        const selected = this.props.selectedPosition === i;
        const moveAllowedToThisPosition = this.canMoveToThisPosition(i);

        return <Square key={i.toString()} selectedPosition={selected} moveAllowedToThisPosition={moveAllowedToThisPosition} filledSquare={filledSquare} value={this.props.squares[i]} onClick={() => this.handleClick(i)} />;
    }
    
    render() {
        let row = [];
        let boardRow = [];
        let filledSquare = true;

        for (let i = 0; i < 8; i++)
        {
            filledSquare = i % 2 === 0;

            for (let j = 0; j < 8; j++)
            {
                filledSquare = !filledSquare;
                row.push(this.renderSquare((i * 8) + j, filledSquare));
            }
            boardRow.push(<div key={i} className="board-row">{row}</div>);
            row = [];
        }

        return (
            <div>
                {boardRow}
            </div>
        );
    }
}

export default Board;