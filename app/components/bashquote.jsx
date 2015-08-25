var BashQuote = React.createClass({

  getInitialState: function() {
    var date = new Date(this.props.quote.date);
    return {
      formattedDate: date.toTimeString().split(' ')[0] + ' ' + functions.padNumber(date.getDate(), 2) + '.' + functions.padNumber(date.getMonth() + 1, 2) + '.' + date.getFullYear()
    };
  },

  render: function() {
    return (
      <div id={"quote_" + this.props.quote._id} className="quote">
        <div className="quote__header">
          <div className="quote__date">{this.state.formattedDate}</div>
          <div className="quote__power">
            <span className="quote__vote quote__vote_good">&#43;</span>&nbsp;
            {this.props.quote.power}
            &nbsp;<span className="quote__vote quote__vote_bad">&minus;</span>
          </div>
        </div>
        <div className="quote__content">
          {this.props.quote.content}
        </div>
      </div>
    );
  }

});
