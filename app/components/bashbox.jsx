var BashBox = React.createClass({

  getInitialState: function() {
    return {
      quotes : []
    };
  },

  componentDidMount: function() {
    this.loadQuotes();
    setInterval(this.loadQuotes, this.props.pollInterval);
  },

  loadQuotes: function() {

    functions.ajaxGET("/quotes", (function(quotes) {
      this.setState({ quotes: quotes});
      console.log(this.state.quotes);
    }).bind(this), function(status) {
      console.log('[Error getting quotes]: ', status);
    });

  },

  render: function() {
    var quotesList = this.state.quotes.map(function(quote) {
      return (
        <BashQuote quote={quote} />
      );
    });
    return (
      <div className="layout">
        <BashHeader loadQuotes={this.loadQuotes} quotes={this.state.quotes} />
        <BashList quotes={this.state.quotes} />
      </div>
    );
  }

});

var BashList = React.createClass({

  render: function() {
    var quotesList = this.props.quotes.map(function(quote) {
      return (
        <BashQuote quote={quote} />
      );
    });
    return (
      <div className="layout__content">
        {quotesList}
      </div>
    );
  }

});

var BashHeader = React.createClass({

  getInitialState: function() {
    return {
      quotes : this.props.quotes
    };
  },

  formSubmit: function(e) {

    e.preventDefault();

    var content = React.findDOMNode(this.refs.content).value;
    React.findDOMNode(this.refs.content).style.disabled = 'disabled';
    React.findDOMNode(this.refs.submit).style.disabled = 'disabled';
    console.log("ready to send: ", content);

    if (!content) {
      console.log("[Error empty data]");
      return;
    }

    functions.ajaxPOST("/quotes", { content: content }, (function (response) {
      if (response.status == 'OK') {
        console.log("quote was successfully sent!");
        this.props.loadQuotes();
        React.findDOMNode(this.refs.content).value = "";
        React.findDOMNode(this.refs.content).style.disabled = '';
        React.findDOMNode(this.refs.submit).style.disabled = '';
      } else {
        console.log("[Error sending quote for saving]");
        React.findDOMNode(this.refs.content).style.disabled = '';
        React.findDOMNode(this.refs.submit).style.disabled = '';
      }
    }).bind(this), function (status) {
      console.log('[Error sending quote for saving]: ', status);
    });

  },

  render: function() {
    return (
      <div className="layout__header">
        <h1>Bash.org цитатник</h1>
        <form name="quoteForm" onSubmit={this.formSubmit}>
          <textarea ref="content" name="content" className="quoteContent"></textarea>
          <input ref="submit" type="submit" value="Отправить" />
        </form>
      </div>
    );
  }

});